'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface YouTubeVideo {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export default function YoutubeSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    // Set up cleanup function to prevent state updates after unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchYoutubePlaylist = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/youtube-playlist');
        
        if (!isMounted.current) return;
        
        if (!response.ok) {
          if (retryCount < 2) {
            // Retry up to 2 times with a delay
            setRetryCount(prev => prev + 1);
            setTimeout(() => {
              if (isMounted.current) {
                fetchYoutubePlaylist();
              }
            }, 1000); // Wait 1 second before retrying
            return;
          }
          throw new Error(`Failed to fetch YouTube data: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!isMounted.current) return;
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (!data.videos || data.videos.length === 0) {
          throw new Error('No videos returned from the API');
        }
        
        setVideos(data.videos);
        setError(null);
      } catch (error) {
        if (!isMounted.current) return;
        console.error('Error fetching YouTube playlist:', error);
        setError(error instanceof Error ? error.message : 'Failed to load YouTube videos');
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    fetchYoutubePlaylist();
  }, [retryCount]);

  return (
    <div className="mb-16">
        <h2 className="text-xl font-semibold tracking-tight text-[#0000FF]">Building in Public</h2>
        <p className="text-sm text-[#0000FF] tracking-tight mb-3">Video Documenting Project</p>
        {/* <Link href="https://youtube.com/playlist?list=PLPsouz49twq3Y08sfFgIYBAtIc0MiyB0V" target="_blank">
          <p className="text-sm text-black/60 underline">
            (see all videos)
          </p>
        </Link> */}
      <div className="">
        {isLoading && (
          <p className="text-sm text-black/60">Loading YouTube Videos...</p>
        )}
        
        {error && !isLoading && (
          <div>
            <p className="text-sm text-red-500 mb-2">Error: {error}</p>
            {retryCount < 3 && (
              <button 
                onClick={() => setRetryCount(prev => prev + 1)}
                className="text-sm text-blue-500 underline"
              >
                Retry
              </button>
            )}
          </div>
        )}
        
        {!isLoading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {videos.map((video, index) => (
              <Link 
                href={video.videoUrl} 
                key={`youtube-section-${video.videoUrl}-${index}`} 
                target="_blank" 
                className="block hover:opacity-90 transition-opacity"
              >
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video mb-2">
                    {video.thumbnailUrl && (
                      <Image 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        fill
                        className="object-cover"
                        unoptimized // YouTube thumbnails are already optimized
                      />
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-[#0000FF]">{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 