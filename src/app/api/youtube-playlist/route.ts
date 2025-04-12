import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// Hardcoded playlist URL
const PLAYLIST_URL = 'https://youtube.com/playlist?list=PLPsouz49twq3Y08sfFgIYBAtIc0MiyB0V&si=4eC2gVYsoQChZd8S';

// Define a type for the video data we extract
interface YouTubeVideo {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  viewCount: string;
  uploadDate: string;
}

// We don't need the request parameter since we use a hardcoded URL
export async function GET() {
  // Removed query parameter handling
  // const searchParams = request.nextUrl.searchParams;
  // const playlistUrl = searchParams.get('playlistUrl');
  
  // if (!playlistUrl) {
  //   return NextResponse.json({ error: 'playlistUrl query parameter is required' }, { status: 400 });
  // }

  try {
    // Validate the hardcoded URL format (basic check)
    const url = new URL(PLAYLIST_URL);
    if (url.hostname !== 'www.youtube.com' && url.hostname !== 'youtube.com') {
      // This check might be redundant now but kept for safety
      throw new Error('Invalid hardcoded YouTube URL'); 
    }

    const response = await fetch(PLAYLIST_URL, {
      headers: {
        // Pretend to be a browser to avoid potential blocks
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch playlist: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Use the defined type for the videos array
    const videos: YouTubeVideo[] = [];

    // Selector might need adjustment if YouTube changes its structure
    // This targets the playlist video renderer elements
    $('ytd-playlist-video-renderer').each((index, element) => {
      if (index >= 5) return false; // Stop after 5 videos

      const titleElement = $(element).find('#video-title');
      const title = titleElement.text().trim();
      const videoUrl = 'https://www.youtube.com' + titleElement.attr('href');

      // Thumbnail URL parsing (might need refinement)
      // YouTube uses complex srcsets, getting a reliable high-res thumbnail is tricky
      const thumbnailElement = $(element).find('#img');
      let thumbnailUrl = thumbnailElement.attr('src') || ''; // Fallback to src

      // Attempt to get a higher quality thumbnail if available via srcset
      const srcset = thumbnailElement.attr('srcset');
      if (srcset) {
        const sources = srcset.split(',').map(s => s.trim().split(' '));
        if (sources.length > 0) {
          thumbnailUrl = sources[sources.length - 1][0]; // Often the last one is highest res
        }
      }

      // Metadata line often contains views and upload date
      const metadataLine = $(element).find('#metadata-line span').map((i, el) => $(el).text().trim()).get();
      let viewCount = 'N/A';
      let uploadDate = 'N/A';

      // Simple parsing - this is fragile and depends on YouTube's format
      metadataLine.forEach(item => {
        if (item.toLowerCase().includes('view')) {
          viewCount = item;
        }
        if (item.toLowerCase().includes('ago')) { // Assuming relative date format
          uploadDate = item;
        }
      });

      videos.push({
        title,
        thumbnailUrl,
        videoUrl,
        viewCount,
        uploadDate,
      });
    });

    if (videos.length === 0) {
        // If the main selector didn't work, try checking if it's due to initial data loading
        // YouTube sometimes embeds initial data in script tags
        let initialData = null;
        $('script').each((i, el) => {
            const scriptContent = $(el).html();
            if (scriptContent?.includes('var ytInitialData')) {
                try {
                    const scriptText = scriptContent.substring(scriptContent.indexOf('=') + 1).trim().slice(0, -1);
                    initialData = JSON.parse(scriptText);
                    return false; // Stop searching
                } catch (e) {
                    console.error("Failed to parse ytInitialData", e);
                }
            }
        });

        if (initialData) {
            // Attempt to parse videos from ytInitialData (structure specific)
            try {
                // Cast initialData to any: Necessary trade-off for unpredictable scraped data structure.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const dataAsAny = initialData as any;
                const contents = dataAsAny?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.playlistVideoListRenderer?.contents;
                if (contents && Array.isArray(contents)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    contents.slice(0, 5).forEach((item: any) => { // item type is complex/unknown
                        const videoRenderer = item?.playlistVideoRenderer;
                        if (videoRenderer) {
                            const title = videoRenderer?.title?.runs?.[0]?.text || 'N/A';
                            const videoId = videoRenderer?.videoId;
                            const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : 'N/A';
                            const thumbnailUrl = videoRenderer?.thumbnail?.thumbnails?.[videoRenderer.thumbnail.thumbnails.length - 1]?.url || 'N/A'; // Highest res
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const viewCountRun = videoRenderer?.videoInfo?.runs?.find((run: any) => run.text.toLowerCase().includes('view'));
                            const viewCountText = viewCountRun?.text || 'N/A';
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const uploadDateRun = videoRenderer?.videoInfo?.runs?.find((run: any) => run.text.toLowerCase().includes('ago'));
                            const uploadDateText = uploadDateRun?.text || 'N/A';

                            videos.push({
                                title,
                                thumbnailUrl,
                                videoUrl,
                                viewCount: viewCountText,
                                uploadDate: uploadDateText,
                            });
                        }
                    });
                }
            } catch (e) {
                // Type catch error as unknown
                console.error("Error parsing ytInitialData structure:", e instanceof Error ? e.message : e);
            }
        }
    }

    if (videos.length === 0) {
        return NextResponse.json({ error: 'Could not parse video information. YouTube structure might have changed.' }, { status: 500 });
    }

    return NextResponse.json({ videos });

  } catch (error: unknown) { // Type catch error as unknown
    console.error('Error fetching/parsing playlist:', error instanceof Error ? error.message : error);
    const message = error instanceof Error ? error.message : 'Failed to process playlist';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 