import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// Hardcoded playlist URL - make sure this is a valid and accessible playlist
const PLAYLIST_URL = 'https://youtube.com/playlist?list=PLPsouz49twq3bRdJUHi-PpxbaaT2edoGp';

// Number of videos to fetch from the playlist
const VIDEO_LIMIT = 6;

// Define types for oEmbed response
interface OEmbedResponse {
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
  provider_name: string;
  provider_url: string;
  type: string;
  version: string;
  height: number;
  width: number;
  html: string;
}

// Define the video type that our API returns
type VideoData = {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
};

// Fallback videos in case the API fails - simplified
const fallbackVideos: VideoData[] = [
  {
    title: "Building in Public Ep.1 | run club, vibe coding",
    thumbnailUrl: "https://i.ytimg.com/vi/QNsbjJggdmI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=QNsbjJggdmI"
  },
  {
    title: "Building in Public Ep.2 | Learning Next.js",
    thumbnailUrl: "https://i.ytimg.com/vi/cQs-MaqQJVg/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=cQs-MaqQJVg"
  },
  {
    title: "Building in Public Ep.3 | Website Progress",
    thumbnailUrl: "https://i.ytimg.com/vi/IiBYCfKRgRY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=IiBYCfKRgRY"
  },
  {
    title: "Building in Public Ep.4 | GitHub Projects",
    thumbnailUrl: "https://i.ytimg.com/vi/XYZ123abcde/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=XYZ123abcde"
  },
  {
    title: "Building in Public Ep.5 | Final Touches",
    thumbnailUrl: "https://i.ytimg.com/vi/ABC987defgh/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ABC987defgh"
  }
];

export async function GET() {
  try {
    // First, try to extract video IDs directly from the playlist URL
    const response = await fetch(PLAYLIST_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch playlist: ${response.statusText}`);
      // Return fallback videos instead of failing
      return NextResponse.json({ videos: fallbackVideos });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Try to extract video IDs from the HTML
    const videoIds: string[] = [];
    
    // Look for patterns like "videoId":"xxxxxxxx" in the HTML
    const videoIdMatches = html.match(/"videoId":"([a-zA-Z0-9_-]+)"/g);
    if (videoIdMatches) {
      // Process the first VIDEO_LIMIT unique matches
      for (const match of videoIdMatches) {
        const videoId = match.split('"videoId":"')[1].replace('"', '');
        if (videoId && !videoIds.includes(videoId)) {
          videoIds.push(videoId);
          if (videoIds.length >= VIDEO_LIMIT) break;
        }
      }
    }
    
    // If we couldn't find enough video IDs, try a different approach
    if (videoIds.length < VIDEO_LIMIT) {
      // Try to find links that might contain video IDs
      $('a').each((index, element) => {
        const href = $(element).attr('href');
        if (href) {
          // Look for patterns like /watch?v=VIDEOID in href attributes
          const match = href.match(/\/watch\?v=([a-zA-Z0-9_-]+)/);
          if (match && match[1] && !videoIds.includes(match[1])) {
            videoIds.push(match[1]);
            if (videoIds.length >= VIDEO_LIMIT) return false; // Stop the loop when we have enough
          }
        }
      });
    }

    console.log(`Found ${videoIds.length} video IDs from playlist`);

    // If we still couldn't find any video IDs, return the fallback videos
    if (videoIds.length === 0) {
      console.error('Could not extract any video IDs from the playlist');
      return NextResponse.json({ videos: fallbackVideos });
    }

    // Now fetch oEmbed data for each video ID
    const videoPromises = videoIds.map(async (videoId) => {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const encodedUrl = encodeURIComponent(videoUrl);
      const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodedUrl}&format=json`;
      
      try {
        const oEmbedResponse = await fetch(oEmbedUrl);
        
        if (!oEmbedResponse.ok) {
          console.error(`Failed to fetch oEmbed data for ${videoUrl}: ${oEmbedResponse.statusText}`);
          return null;
        }
        
        const oEmbedData: OEmbedResponse = await oEmbedResponse.json();
        
        // Return only title, thumbnail and videoUrl
        return {
          title: oEmbedData.title,
          thumbnailUrl: oEmbedData.thumbnail_url,
          videoUrl: videoUrl
        };
      } catch (error) {
        console.error(`Error fetching oEmbed data for ${videoUrl}:`, error);
        return null;
      }
    });

    try {
      // Wait for all oEmbed requests to complete
      const results = await Promise.all(videoPromises);
      
      // Filter out any null results from failed requests
      const videos = results.filter(video => video !== null);
  
      if (videos.length === 0) {
        console.error('Could not retrieve any video metadata from the oEmbed API');
        return NextResponse.json({ videos: fallbackVideos });
      }
      
      // Ensure we return no more than VIDEO_LIMIT videos
      const limitedVideos = videos.slice(0, VIDEO_LIMIT);
  
      return NextResponse.json({ videos: limitedVideos });
    } catch (error) {
      console.error('Error processing oEmbed responses:', error);
      return NextResponse.json({ videos: fallbackVideos });
    }

  } catch (error) {
    console.error('Error in YouTube playlist API:', error instanceof Error ? error.message : error);
    // Return fallback videos instead of failing with an error
    return NextResponse.json({ videos: fallbackVideos });
  }
} 