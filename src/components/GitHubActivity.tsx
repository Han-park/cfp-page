'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  html_url: string;
}

interface RepoCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
}

interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export default function GitHubActivity() {
  const [recentCommits, setRecentCommits] = useState<GitHubCommit[]>([]);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);

  useEffect(() => {
    const repos = [
      'the-oxford-500',
      'cfp-page',
      'workout_works',
      '00runners',
      '0-gang',
      'tie-app-0',
      'collector'
    ];

    const fetchRateLimit = async () => {
      try {
        const response = await fetch('https://api.github.com/rate_limit');
        if (response.ok) {
          const data = await response.json();
          setRateLimit(data.resources.core);
        }
      } catch (error) {
        console.error('Error fetching rate limit:', error);
      }
    };

    const fetchCommits = async () => {
      try {
        const allCommits = await Promise.all(
          repos.map(async (repo) => {
            const response = await fetch(`https://api.github.com/repos/Han-park/${repo}/commits`);
            if (!response.ok) return [];
            const commits: RepoCommit[] = await response.json();
            return commits.map(commit => ({
              commit: {
                message: commit.commit.message,
                author: {
                  date: commit.commit.author.date
                }
              },
              repository: {
                name: repo
              },
              html_url: commit.html_url
            }));
          })
        );

        // Flatten and sort all commits by date
        const flattenedCommits = allCommits
          .flat()
          .sort((a, b) => 
            new Date(b.commit.author.date).getTime() - 
            new Date(a.commit.author.date).getTime()
          )
          .slice(0, 5); // Get only the 5 most recent commits

        setRecentCommits(flattenedCommits);
      } catch (error) {
        console.error('Error fetching GitHub commits:', error);
      }
    };

    fetchRateLimit();
    fetchCommits();
  }, []);

  if (recentCommits.length === 0) return null;

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatResetTime = (resetTimestamp: number) => {
    const resetDate = new Date(resetTimestamp * 1000);
    return resetDate.toLocaleTimeString();
  };

  return (
    <div className="mb-16">
      <div className='flex justify-between'>
        <h2 className="text-[#0000FF] font-normal mb-4">recent activity</h2>
        <Link href="https://github.com/Han-park" target="_blank">
          <p className="text-sm text-black/60 underline">
            (latest commits on github)
          </p>
        </Link>
      </div>
      {rateLimit && (
        <div className="mb-4 p-2 border border-black/50 bg-gray-50">
          <p className="text-xs font-mono">
            GitHub API Rate Limit: {rateLimit.remaining} / {rateLimit.limit} remaining
            (resets at {formatResetTime(rateLimit.reset)})
          </p>
        </div>
      )}
      <div className="border border-black/50 p-4">
        <div className="flex flex-col gap-3">
          {recentCommits.map((commit, index) => (
            <p key={index} className="text-sm">
              <span className="text-black/60">committed </span>
              {commit.commit.message}
              <span className="text-black/60"> to </span>
              {commit.repository.name}
              <span className="text-black/60"> {getTimeAgo(commit.commit.author.date)}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 