'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n.config';

export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const currentPath = pathname.split('/').slice(2).join('/') || '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-8">
      <div className="flex items-top justify-between">
        <Link href={`/${lang}`}>
          <div className="mb-12 flex gap-1">
            <h1 className="text-[#0000FF] text-4xl font-semibold tracking-tighter">
              <span className="hidden lg:block">Community First Projects</span>
              <span className="lg:hidden block">CFP</span>
            </h1>
            <p className='text-[#0000FF] lg:text-base text-sm font-bold'>3.0</p>
          </div>
        </Link>
        <div className="flex gap-1">
          <Link 
            href={`/${lang}`}
            className={`lg:text-base text-sm font-semibold tracking-tight ${currentPath === '/' ? 'text-[#0000FF]' : 'text-black/60'}`}
          >
            {lang === 'ko' ? '프로젝트' : 'Projects'}
          </Link>
          <Link 
            href={`/${lang}/about`}
            className={`lg:text-base text-sm font-semibold tracking-tight ${currentPath === 'about' ? 'text-[#0000FF]' : 'text-black/60'}`}
          >
            {lang === 'ko' ? '소개' : 'About'}
          </Link>
        </div>
        <div className="flex gap-1">
          <Link 
            href={`/ko${currentPath === '/' ? '' : '/' + currentPath}`}
            className={`lg:text-base text-sm font-bold tracking-tight ${lang === 'ko' ? 'text-[#0000FF]' : 'text-black/60'}`}
          >
            한국어
          </Link>
          <Link 
            href={`/en${currentPath === '/' ? '' : '/' + currentPath}`}
            className={`lg:text-base text-sm font-semibold tracking-tight ${lang === 'en' ? 'text-[#0000FF]' : 'text-black/60'}`}
          >
            English
          </Link>
        </div>
      </div>
    </header>
  );
} 