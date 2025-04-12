'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Vlog {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  viewCount: string;
  uploadDate: string;
}

export default function YouTubeVlogs() {
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVlogs() {
      try {
        setLoading(true);
        const response = await fetch('/api/youtube-playlist');
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setVlogs(data.videos || []);
      } catch (err: unknown) {
        console.error("Failed to fetch vlogs:", err);
        const message = err instanceof Error ? err.message : 'Failed to load vlogs.';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchVlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading vlogs...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  if (vlogs.length === 0) {
    return <div className="text-center py-8">No vlogs found.</div>;
  }

  return (
    <div className="mb-16">
      <h2 className="text-[#0000FF] font-normal mb-4">Latest Vlogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {vlogs.map((vlog, index) => (
          <Link href={vlog.videoUrl} key={index} target="_blank" rel="noopener noreferrer">
            <div className="border border-black/30 hover:border-black/60 transition-colors duration-200 group">
              <div className="aspect-video relative bg-gray-200">
                {vlog.thumbnailUrl && vlog.thumbnailUrl !== 'N/A' ? (
                  <Image
                    src={vlog.thumbnailUrl}
                    alt={vlog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No Thumbnail</div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 group-hover:text-[#0000FF]">
                  {vlog.title}
                </h3>
                <p className="text-xs text-black/60 mt-1 line-clamp-1">
                  {vlog.viewCount} • {vlog.uploadDate}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 