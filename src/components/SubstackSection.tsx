'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Script from 'next/script';

// Add type definition for the Substack widget
declare global {
  interface Window {
    SubstackFeedWidget?: {
      substackUrl: string;
      posts: number;
      layout: string;
      hidden: string[];
      colors: {
        primary: string;
        secondary: string;
        background: string;
      }
    }
  }
}

export default function SubstackSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const loadTimer = useRef<NodeJS.Timeout | null>(null);
  const checkLoadTimer = useRef<NodeJS.Timeout | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Function to add custom styles to Substack feed
  const addCustomStyles = useCallback(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Make Substack feed text smaller */
      #substack-feed-embed .sfw-title {
        font-size: 0.875rem !important; /* text-sm equivalent (14px) */
        line-height: 1.25rem !important;
        font-weight: 600 !important;
      }
      #substack-feed-embed .sfw-post-date {
        font-size: 0.75rem !important; /* text-xs (12px) */
      }
      a {
          padding-left: 0px !important;
          padding-right: 0px !important;
          padding-top: 0px !important;
      }
      .w-20 {
          border-radius: 0px !important;
          border: 1px solid rgb(125, 125, 125) !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Configure Substack widget
  const configureWidget = useCallback(() => {
    window.SubstackFeedWidget = {
      substackUrl: "jonghan.substack.com",
      posts: 5,
      layout: "right",
      hidden: ["author", "subtitle", "reactions", "comments"],
      colors: {
        primary: "#0000FF",
        secondary: "#0000FF",
        background: "#FFFFFF",
      }
    };
    setTimeout(addCustomStyles, 1000);
  }, [addCustomStyles]);

  // Check if posts were actually loaded
  const checkPostsLoaded = useCallback(() => {
    const feedElement = document.getElementById('substack-feed-embed');
    // Check if feed element exists and has actual post content
    const hasPosts = feedElement && 
      (feedElement.querySelectorAll('.sfw-post').length > 0 || 
       feedElement.querySelectorAll('.sfw-title').length > 0);
    
    if (hasPosts) {
      setIsLoaded(true);
      setHasError(false);
      setIsRetrying(false);
    } else if (!isRetrying) {
      // Only set error if we're not already retrying
      setHasError(true);
    }
    
    return hasPosts;
  }, [isRetrying]);

  // Load the widget and check if it loaded successfully
  const loadSubstackWidget = useCallback(() => {
    configureWidget();
    
    // Clear any existing check timer
    if (checkLoadTimer.current) {
      clearTimeout(checkLoadTimer.current);
    }
    
    // Check if the widget loaded successfully - attempt multiple checks
    const checkLoad = () => {
      if (checkPostsLoaded()) return;
      
      // If posts not loaded yet, check again after a delay
      checkLoadTimer.current = setTimeout(() => {
        if (checkPostsLoaded()) return;
        
        // One more check after a longer delay
        checkLoadTimer.current = setTimeout(() => {
          if (!checkPostsLoaded()) {
            setHasError(true);
          }
        }, 3000);
      }, 3000);
    };
    
    // Initial check after 3 seconds
    loadTimer.current = setTimeout(checkLoad, 3000);
  }, [configureWidget, checkPostsLoaded]);

  // Reload the widget
  const reloadWidget = useCallback(() => {
    setIsRetrying(true);
    setHasError(false);
    
    // Increment retry counter
    setRetryCount(prev => prev + 1);
    
    // Clear existing content
    const feedElement = document.getElementById('substack-feed-embed');
    if (feedElement) {
      feedElement.innerHTML = '';
    }
    
    // Remove existing script if any
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
    }
    
    // Create and add a new script
    const script = document.createElement('script');
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    document.body.appendChild(script);
    scriptRef.current = script;
    
    // Configure widget again
    loadSubstackWidget();
    
    // Reset retry status after a delay if still not loaded
    setTimeout(() => {
      if (!isLoaded) {
        setIsRetrying(false);
      }
    }, 5000);
  }, [loadSubstackWidget, isLoaded]);

  // Automatic retry when error is detected
  useEffect(() => {
    if (hasError && retryCount < 3 && !isRetrying) {
      reloadWidget();
    }
  }, [hasError, retryCount, isRetrying, reloadWidget]);

  // Initial load
  useEffect(() => {
    configureWidget();
    
    return () => {
      // Clean up timers on unmount
      if (loadTimer.current) {
        clearTimeout(loadTimer.current);
      }
      if (checkLoadTimer.current) {
        clearTimeout(checkLoadTimer.current);
      }
    };
  }, [configureWidget]);

  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold tracking-tight text-[#0000FF]">New Aesthetica by Jonghan</h2>
      <p className="text-sm text-[#0000FF] tracking-tight mb-3">Essays on Substack</p>
      
      <div id="substack-feed-embed">
        {!isLoaded && !hasError && !isRetrying && (
          <div className="text-sm text-black/60 mt-2">
            <p>Loading Substack Posts...</p>
          </div>
        )}
        {isRetrying && (
          <div className="text-sm text-black/60 mt-2">
            <p>Retrying to load posts...</p>
          </div>
        )}
        {hasError && !isRetrying && (
          <div className="text-sm text-black/70 mt-2 p-4 border border-gray-200 rounded">
            <p>Could not load Substack feed.</p>
            <button 
              onClick={reloadWidget}
              className="text-[#0000FF] underline mt-2 font-medium"
            >
              Try again
            </button>
          </div>
        )}
      </div>
      
      <Script 
        src="https://substackapi.com/embeds/feed.js" 
        strategy="afterInteractive" 
        onLoad={() => {
          loadSubstackWidget();
        }}
        onError={() => {
          // Script failed to load
          setHasError(true);
          setIsRetrying(false);
        }}
      />
    </div>
  );
} 