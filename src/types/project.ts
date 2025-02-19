export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  details: string;
}

export const projects: Project[] = [
  {
    id: 'ww',
    title: 'workout works',
    image: '/img/thumbnail/ww.png',
    description: 'workout works is a community-driven app that helps you get fit.',
    details: 'https://workout-works-app.vercel.app To request an access, email me at me@han-park.info'
  },
  {
    id: 'oxford',
    title: 'The Oxford 5000',
    image: '/img/thumbnail/the-oxford-5000.png',
    description: 'the oxford 5000 is a custom word quiz app empowered by GPT.',
    details: 'https://the-oxford-5000.vercel.app To request an access, email me at me@han-park.info'
  }
]; 