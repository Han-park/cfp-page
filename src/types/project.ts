export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  details: string;
  url: string;
  buttonText: string;
}

export const projects: Project[] = [
  {
    id: 'ww',
    title: 'workout works',
    image: '/img/thumbnail/ww.png',
    description: 'workout works is a community-driven app that helps you get fit.',
    details: 'To request an access, email me at me@han-park.info',
    url: 'https://workout-works-app.vercel.app',
    buttonText: 'Visit the app'
  },
  {
    id: 'oxford',
    title: 'The Oxford 5000',
    image: '/img/thumbnail/the-oxford-5000.png',
    description: 'the oxford 5000 is a custom word quiz app empowered by GPT.',
    details: 'To request an access, email me at me@han-park.info',
    url: 'https://the-oxford-5000.vercel.app',
    buttonText: 'Visit the app'
  },
  {
    id: 'gang',
    title: 'Daejangang House',
    image: '/img/thumbnail/daejangang.png',
    description: 'Daejangang House is a platform for early stage entreprenuers. Located in Gwangjin-gu, Seoul.',
    details: 'To request a visit, email me at me@han-park.info',
    url: 'https://daejangang.xyz',
    buttonText: 'Visit the website'
  }
]; 