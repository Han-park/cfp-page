'use client';
import { useEffect, useState } from 'react';

interface GitHubEvent {
  type: string;
  created_at: string;
  payload: {
    commits: Array<{
      message: string;
    }>;
  };
  repo: {
    name: string;
  };
}

interface GitHubCommit {
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  repository: {
    name: string;
  };
}

export default function GitHubActivity() {
  const [latestCommit, setLatestCommit] = useState<GitHubCommit | null>(null);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Han-park/events/public');
        const data: GitHubEvent[] = await response.json();
        const pushEvent = data.find((event) => event.type === 'PushEvent');
        if (pushEvent) {
          setLatestCommit({
            commit: {
              message: pushEvent.payload.commits[0].message,
              author: {
                date: pushEvent.created_at
              }
            },
            repository: {
              name: pushEvent.repo.name.split('/')[1]
            }
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub activity:', error);
      }
    };

    fetchLatestCommit();
  }, []);

  if (!latestCommit) return null;

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="mb-16">
      <h2 className="text-[#0000FF] font-normal mb-4">recent activity</h2>
      <div className="border border-black/50 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            <span className="text-black/60">committed</span> {latestCommit.commit.message}
          </p>
          <p className="text-sm">
            <span className="text-black/60">to</span> {latestCommit.repository.name}
          </p>
          <p className="text-sm text-black/60">
            {getTimeAgo(latestCommit.commit.author.date)}
          </p>
        </div>
      </div>
    </div>
  );
} 