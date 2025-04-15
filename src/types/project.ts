export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  details: string;
  url?: string;
  buttonText?: string;
  images: [string, number][]; // [imageUrl, widthRatio]
  category?: string;
  year?: string;
  scope?: string;
  collaborator?: string;
  position?: string;
  projectSeasonId?: string | number; // To classify projects into different sections
  localizedContent?: {
    en?: {
      title?: string;
      description?: string;
      details?: string;
      buttonText?: string;
      category?: string;
      year?: string;
      scope?: string;
      collaborator?: string;
      position?: string;
    };
    ko?: {
      title?: string;
      description?: string;
      details?: string;
      buttonText?: string;
      category?: string;
      year?: string;
      scope?: string;
      collaborator?: string;
      position?: string;
    };
  };
}

export const projects: Project[] = [
  {
    id: 'ww',
    title: 'Workout Works',
    thumbnail: '/img/project/ww/thumb.png',
    description: '단백질 섭취 목표를 달성을 돕고, 헬스장에서의 운동과 신체 변화를 기록할 수 있는 앱',
    details: '25년 2월에 친구 상민이와 함께 운동하다가 여름에 바디프로필을 찍기로 하면서 체계적으로 몸을 키우기 위해 만든 앱이에요.\n 근육량 증가를 위해서는 운동도 중요하지만 몸무게의 2배 가까이 되는 그램수의 단백질을 섭취해줘야 해요(몸무게가 80kg 이면 160g). 3년 전에 첫 바디프로필을 준비했을 때 식단의 중요성을 느꼈어요. \n 식단 기록을 위해 만들었다가, 운동 기록 기능도 추가했어요. 운동을 추천해주는 다른 앱들보다는 메모장에 그날 한 운동을 기록하곤 했는데, 반복 횟수와 무게를 입력하기 위해 버튼을 여러 번 누르는게 귀찮았거든요. 그래서 GPT를 이용해 같은 경험으로 기록하되 운동별 볼륨이 계산되게 했어요. \n 저는 이 앱을 매일 쓰고 있어요. 원하시는 분들은 아래 버튼을 눌러 사용해보실 수 있어요. 문의사항은 me@han-park.info (박종한) 으로 부탁드립니다!',
    url: 'https://workout-works-app.vercel.app/graph',
    buttonText: '앱 써보기',
    category: '라이프스타일 유틸리티 앱',
    year: '2025',
    scope: '바이브 코딩',
    position: 'CFP 오퍼레이터',
    collaborator: '김상민',
    projectSeasonId: 2,
    images: [
      ['/img/project/ww/ww-1.png', 100],
      ['/img/project/ww/ww-2.png', 100],
      ['/img/project/ww/ww-3.png', 40],
    ],
    localizedContent: {
      en: {
        title: 'Workout Works',
        description: 'Workout Works is a community-driven app that helps you get fit.',
        details: 'Workout Works is a fitness app designed to build a supportive community around your fitness journey. Join workout groups, track progress, and stay motivated together. To request access, email me at me@han-park.info',
        buttonText: 'Visit the app',
        category: 'Lifestyle Utility App',
        year: '2025',
        scope: 'Vibe Coding',
        position: 'CFP Operator',
        collaborator: 'Kim Sangmin'
      }
    }
  },
  {
    id: 'oxford',
    title: 'Oxford 5000',
    thumbnail: '/img/project/oxford/thumb.png',
    description: 'Oxford 5000 단어 세트를 기반으로, 직접 단어장에 단어를 추가할 수 있는 영단어 퀴즈 앱',
    details: '말해보카에 월 2만원씩 쓰기 아까워서 직접 만들었습니다. 영국 옥스포드 대학교에서 만든 단어 세트인 oxford 5000에서 중급 이상의 단어만 뽑았어요. 단어에 대해 영어로 쓰여진 뜻과 예문을 보고 빈칸을 채워봐요. \n 정답/오답 여부에 따라 복습 주기가 조정되는 알고리즘이 적용되어 있으며, 힌트도 볼 수 있어요. 저는 하루 10개의 정답을 맞추는 것을 목표로 사용하고 있습니다. \n 아래 링크에서 회원가입하면 사용해볼 수 있어요. 궁금한 점이 있다면 me@han-park.info (박종한) 로 이메일을 보내주세요.',
    url: 'https://the-oxford-5000.vercel.app',
    buttonText: '앱 방문하기',
    category: '라이프스타일 유틸리티 앱',
    year: '2025',
    scope: '바이브 코딩',
    position: 'CFP 오퍼레이터',
    projectSeasonId: 2,
    images: [
      ['/img/project/oxford/oxford-1.png', 100],
      ['/img/project/oxford/oxford-2.png', 50],
    ],
    localizedContent: {
      en: {
        title: 'Oxford 5000',
        description: 'The Oxford 5000 is a custom word quiz app empowered by GPT.',
        details: 'To request an access, email me at me@han-park.info',
        buttonText: 'Visit the app',
        category: 'Lifestyle Utility App',
        year: '2025',
        scope: 'Vibe Coding',
        position: 'CFP Operator'
      }
    }
  },
  {
    id: 'collector',
    title: 'Collector',
    thumbnail: '/img/project/collector/thumb.png',
    description: '링크만 붙여넣으면 GPT가 요약하고 분류해주는 북마크 앱. 내 북마크 생성 추이도 그래프로 볼 수 있어요.',
    details: '원래 Notion Database에 북마크를 모으고 있었는데, 어느 순간 귀찮아서 링크만 붙여넣게 되고, 다시 봤을 때 알아보기 어려워졌어요. 그래서 북마크 앱을 만들었어요. \n 한편 제가 지속적으로 모니터링하는 일상 지표가 있는데 그건 주간 읽고 있는 아티클의 개수에요. 글을 덜 읽으면 삶이 정신없어지고 생각의 명료함이 떨어져요. 그걸 확인하고 관리하기 위해 주간 북마크 생성 추이 그래프를 프로필 페이지에 추가했어요. \n 현재 웹 앱으로 배포되어 있으며 소셜 기능을 보완하여 다시 출시할 예정이에요. 지금 버전은 아래 버튼을 눌러 사용해볼 수 있어요. 궁금한 점이 있다면 me@han-park.info (박종한) 로 메일 주세요!',
    url: 'https://collector-cfp.vercel.app/u/han',
    buttonText: '앱 써보기',
    category: '라이프스타일 유틸리티 앱',
    year: '2025',
    scope: '바이브 코딩',
    position: 'CFP 오퍼레이터',
    collaborator: '정영학',
    projectSeasonId: 2,
    images: [
      ['/img/project/collector/collector-1.png', 100]
    ],
    localizedContent: {
      en: {
        title: 'Collector',
        description: 'Collector is a bookmark app aided by GPT.',
        details: 'Full version will be released soon. To request an access, email me at me@han-park.info',
        buttonText: 'Visit the app',
        category: 'Lifestyle Utility App',
        year: '2025',
        scope: 'Vibe Coding',
        position: 'CFP Operator',
        collaborator: 'Jung Younghak'
      }
    }
  },
  {
    id: 'gang-web',
    title: '대장간 웹사이트',
    thumbnail: '/img/project/gang-web/thumb.png',
    description: 'IT 창업가들의 코리빙 하우스인 대장간의 웹사이트',
    details: '2023년 2월 만들어진 대장간 하우스에 시작부터 거주한 멤버로서 소개 웹사이트를 개발했습니다. 원래는 노션 페이지를 쓰고 있었는데, 석범이가 너무 짜친다고 해서요. \n 대장간 2025 달력 촬영때 찍은 사진을 적용하고, 대장간 브랜드 컬러인 검은색과 레몬색을 활용해 디자인했습니다. 또한, 앞으로 대장간을 글로벌 해커하우스로 발전시키기 위해 사이트 전반에 다국어 옵션을 적용하였습니다. \n 25년 5월, 대장간 커뮤니티 멤버십을 출시할 때 기능을 확장하고 메신저와 통합하여 플랫폼으로 활용할 계획입니다.',
    url: 'https://www.daejangang.xyz/ko',
    buttonText: '웹사이트 방문하기',
    category: '커뮤니티 웹사이트',
    year: '2025',
    scope: '웹디자인, 사진 촬영',
    position: '대장간 거주 멤버',
    collaborator: '홍석범',
    projectSeasonId: 2,
    images: [
      ['/img/project/gang-web/gang-web-1.png', 90],
      ['/img/project/gang-web/gang-web-2.png', 75],
      ['/img/project/gang-web/gang-web-3.png', 90],
    ],
    localizedContent: {
      en: {
        title: 'Daejangang Website',
        description: 'Daejangang House is a platform for early stage entreprenuers mostly in tech industry. Located in Gwangjin-gu, Seoul.',
        details: 'Han Park, Co-founder of Daejangang House is now working on the design of the website, editing newsletter, and building extended community. To request a visit, email me at me@han-park.info',
        buttonText: 'Visit the website',
        category: 'Community Website',
        year: '2025',
        scope: 'Web Design, Photography',
        position: 'Daejangang Resident Member'
      }
    }
  },
  {
    id: 'ccb-reels',
    title: '크라이치즈버거 릴스',
    thumbnail: '/img/project/ccb-reels/thumb.png',
    description: '크라이치즈버거의 단골 고객으로서 숏폼 비디오 몇 편을 친구와 함께 만들었습니다.',
    details: '크라이치즈버거 팀과 인연이 되어 숏폼 비디오 몇 편을 기획하고, 출연하고, 제작했습니다. 정말 재밌는 작업이었어요. 크라이치즈버거 인스타그램에서 릴스 콘텐츠를 확인해보세요!!',
    url: 'https://www.instagram.com/crycheeseburger.official',
    buttonText: '인스타그램 방문하기',
    category: '숏폼 비디오 콘텐츠',
    year: '2024',
    scope: '기획, 출연, 제작',
    position: '크라이치즈버거 단골 고객',
    collaborator: '이채윤, 대장간 하우스 멤버들, 크라이치즈버거 팀',
    projectSeasonId: 1,
    images: [
      ['/img/project/ccb-reels/ccb-reels-1.png', 90],
      ['/img/project/ccb-reels/ccb-reels-2.png', 50],
      ['/img/project/ccb-reels/ccb-reels-3.png', 100]
    ],
    localizedContent: {
      en: {
        title: 'Crycheeseburger Reels',
        description: 'Crycheeseburger Reels are short-form video content for Instagram.',
        details: 'Social media content produced for Crycheeseburger, showcasing the brand through short videos. For inquiries, please email me at me@han-park.info',
        buttonText: 'Visit Instagram',
        category: 'Short-form Video Content',
        year: '2024',
        scope: 'Casting, Planning, Production',
        position: 'Crycheeseburger Regular Customer',
        collaborator: 'Crycheeseburger Team, Lee Chaeyoon'
      }
    }
  },
  {
    id: 'musa',
    title: '무사 피트니스 챌린지',
    thumbnail: '/img/project/musa/thumb.png',
    description: '무사 피트니스 챌린지의 2024 시즌 브랜딩 및 아트 크리에이티브',
    details: '무사 피트니스 챌린지는 저와 대장간에 함께 살던 가인이가 만들고 운영하는 프로젝트입니다. 2023년 이 프로젝트가 시작되었을 때 로고를 만들어줬던 것을 시작으로, 2024 시즌에 새로운 로고도 만들고 티셔츠도 만들었어요. 틈틈이 사진 촬영도 하고 풀 파티에서는 디제이로도 참여했습니다. \n 로고에는 피트니스 브랜드에 걸맞는 동적인 무드를 표현했고, 티셔츠를 만들 땐 팀별로 다르면서 한국인인 멤버들이 평소 헬스장 갈 때 편하게 입을만큼 튀지 않도록 무채색 안에서 배경 색상을 채택했어요.',
    category: '크리에이티브',
    year: '2024',
    scope: '브랜딩, 아트, 사진 촬영, 디제잉',
    position: 'CFP 오퍼레이터',
    collaborator: '신가인',
    projectSeasonId: 1,
    images: [
      ['/img/project/musa/musa-1.png', 80],
      ['/img/project/musa/musa-2.png', 90],
      ['/img/project/musa/musa-3.png', 100],
    ],
    localizedContent: {
      en: {
        title: 'Musa Fitness Challenge',
        description: 'Musa Fitness Challenge is a creative project helping participants form healthy habits.',
        details: 'A community-based challenge for achieving fitness goals, where participants receive motivation together and develop healthy lifestyle habits. For more information, please contact me@han-park.info',
        buttonText: 'CFP Instagram',
        category: 'Creative',
        year: '2024',
        scope: 'Branding, Art, Photography',
        position: 'CFP Operator'
      }
    }
  },
  {
    id: 'sweaterhouse',
    title: '스웨터하우스',
    thumbnail: '/img/project/sweaterhouse/thumb.png',
    description: '스웨터하우스 초기 캠페인 기획 및 사진 촬영',
    details: '스웨터하우스는 홀가먼트 기반의 니트웨어 브랜드입니다. 동네 이웃으로 시작한 인연이 팀원을 소개해주게 되고, 5편의 캠페인 촬영에서 사진 촬영 또는 기획, 로케이션을 맡았습니다.',
    category: '크리에이티브',
    year: '2024',
    scope: '기획, 로케이션, 사진 촬영',
    position: '스웨터하우스 Growth Advisor',
    collaborator: '김상민, 김혜림 외',
    projectSeasonId: 1,
    images: [
      ['/img/project/sweaterhouse/sweaterhouse-1.png', 80],
      ['/img/project/sweaterhouse/sweaterhouse-2.png', 60],
      ['/img/project/sweaterhouse/sweaterhouse-3.png', 100],
    ],
    localizedContent: {
      en: {
        title: 'Sweaterhouse',
        description: 'Sweaterhouse is an independent knitwear brand in Korea.',
        details: 'An independent Korean knitwear brand showcasing distinctive products with high-quality materials and design. I supported brand growth strategy and content production. For more information, please contact me@han-park.info',
        buttonText: 'Visit Instagram',
        category: 'Creative',
        year: '2024',
        scope: 'Photography',
        position: 'Sweaterhouse Growth Advisor',
        collaborator: 'Kim Sangmin, Kim Hyerim'
      }
    }
  },
  {
    id: 'Gang-calendar',
    title: '대장간 달력 화보',
    thumbnail: '/img/project/gang-calendar/thumb.png',
    description: '2025 대장간 달력을 위한 화보 촬영',
    details: '무한도전 달력 화보 촬영 에피소드에서 영감을 받아, 대장간 멤버들과 하루 날을 잡고 사무실 공간과 인천 앞바다를 돌며 화보 촬영을 진행했어요.',
    category: '크리에이티브',
    year: '2024',
    scope: '기획, 사진 촬영, 제작',
    position: '대장간 거주 멤버',
    collaborator: '홍석범',
    projectSeasonId: 1,
    images: [
      ['/img/project/gang-calendar/gang-calendar-1.png', 70],
      ['/img/project/gang-calendar/gang-calendar-2.png', 70],
      ['/img/project/gang-calendar/gang-calendar-3.png', 50],
      ['/img/project/gang-calendar/gang-calendar-4.png', 90],
      ['/img/project/gang-calendar/gang-calendar-5.png', 70],
    ],
    localizedContent: {
      en: {
        title: 'Daejangang Photo Calendar',
        description: 'Daejangang Photo Calendar is a creative project featuring community members.',
        details: 'A photo calendar featuring the daily lives and personalities of Daejangang community members, enhancing community cohesion and introducing members in a creative way. For more information, please contact me@han-park.info',
        buttonText: 'Visit Instagram',
        category: 'Creative',
        year: '2024',
        scope: 'Planning, Photography, Production',
        position: 'Daejangang Resident Member',
        collaborator: 'Hong Seokbeom'
      }
    }
  },
  {
    id: 'connect-and-chill',
    title: 'Connect & Chill',
    thumbnail: '/img/project/connect-and-chill/thumb.png',
    description: 'Lobby D와 대장간 하우스가 공동 개최한 네트워킹 파티',
    details: '원하는 사람을 찾는 걸 도와주는 P2P 플랫폼인 Lobby D를 운영하는 형으로부터 제안을 받아 행사를 공동으로 개최했어요. 북촌의 갤러리 공간을 대관하여 이벤트를 진행했고, 150명이 방문했어요.',
    category: '이벤트 플래닝 및 운영',
    year: '2024',
    scope: '브랜딩, 행사 운영, 사진 촬영, 디제잉',
    position: 'CFP 오퍼레이터',
    collaborator: 'Lobby D',
    projectSeasonId: 1,
    images: [
      ['/img/project/connect-and-chill/connect-and-chill-1.jpg', 80],
      ['/img/project/connect-and-chill/connect-and-chill-2.jpg', 100],
      ['/img/project/connect-and-chill/connect-and-chill-3.jpg', 70],
      ['/img/project/connect-and-chill/connect-and-chill-4.jpg', 90],
    ],
    localizedContent: {
      en: {
        title: 'Connect & Chill',
        description: 'Connect & Chill is a social event where people from various fields gather to network.',
        details: 'A social event where creative talents from various fields gather to exchange ideas and discover collaboration opportunities. It takes place in a relaxed atmosphere and includes DJ sessions. For participation inquiries, please contact me@han-park.info',
        buttonText: 'CFP Instagram',
        category: 'Event Planning and Operation',
        year: '2024',
        scope: 'Branding, Event Operation, Photography, DJing',
        position: 'CFP Operator',
        collaborator: 'Lobby D'
      }
    }
  },
  {
    id: 'pool-run',
    title: 'Pool Run',
    thumbnail: '/img/project/pool-run/thumb.jpg',
    description: '상탈 러닝 후 한강 수영장에 입수하는 이벤트',
    details: '승덕, 재용과 친구들을 모아서 할만한 신선하고 칠(chill)한 러닝 이벤트 없을까? 하다가 마침 한강공원 수영장 이 오픈중이여서 연 이벤트. 2회차에 걸쳐 각각 10명이 참여했어요. \n 한강 수영장 입장료 5000원밖에 안 하니 여름에 꼭 가시길...',
    category: '이벤트 플래닝 및 운영',
    year: '2024',
    scope: '브랜딩, 행사 운영, 사진 촬영',
    position: 'CFP 오퍼레이터',
    collaborator: '박승덕, 서재용',
    projectSeasonId: 1,
    images: [
      ['/img/project/pool-run/pool-run-1.jpg', 60],
      ['/img/project/pool-run/pool-run-2.jpg', 90],
      ['/img/project/pool-run/pool-run-3.jpg', 50],
      ['/img/project/pool-run/pool-run-4.jpg', 90],
      ['/img/project/pool-run/pool-run-5.jpg', 80],
      ['/img/project/pool-run/pool-run-6.jpg', 50],
    ],
    localizedContent: {
      en: {
        title: 'Pool Run',
        description: 'Pool Run is a unique event combining swimming and running.',
        details: 'A new type of sports event combining swimming and running, pursuing both healthy lifestyle habits and fun. For registration and more information, please contact me@han-park.info',
        buttonText: 'CFP Instagram',
        category: 'Event Planning and Operation',
        year: '2024',
        scope: 'Branding, Event Operation, Photography',
        position: 'CFP Operator',
        collaborator: 'Park Seungdeok'
      }
    }
  },
  {
    id: '00runners-web',
    title: '00runners 웹앱 (2023)',
    thumbnail: '/img/project/00runners-web/thumb.jpg',
    description: '러닝크루 00runners 위한 전용 커뮤니티 웹앱. 출석 체크와 순위 조회, 회칙 열람 가능',
    details: '테크 스타트업 업계에 있는 사람으로서, 당시 제가 회장으로 있던 러닝크루 00runners에도 커뮤니티의 성공과 실패를 구분하는 지표가 필요하다고 생각했어요. 그래서 출석 체크 시스템을 만들고, 시즌 출석 체크 횟수를 순위로 바꿔 리더보드에 넣었어요. \n 이 시스템을 시행한 이후 매일 나와 1위를 지키는 크루 회원도 생겼어요.',
    url: 'https://jonghan.substack.com/p/045',
    buttonText: '제작 에세이 보러가기',
    category: '전용 커뮤니티 앱',
    year: '2023',
    scope: '기획, 디자인/개발, 운영',
    position: '00runners 회장',
    projectSeasonId: 'a',
    images: [
      ['/img/project/00runners-web/00runners-web-1.jpg', 70],
      ['/img/project/00runners-web/00runners-web-2.webp', 100],
      ['/img/project/00runners-web/00runners-web-3.webp', 100],
      ['/img/project/00runners-web/00runners-web-4.png', 60],
    ],
    localizedContent: {
      en: {
        title: '00runners Web App (2023)',
        description: '00runners Web App is a dedicated community app for a running club.',
        details: 'A web app developed for the 00runners running club, providing various functions such as member activity management, event sharing, and communication. For more information, please contact me@han-park.info',
        buttonText: 'Visit Website',
        category: 'Dedicated Community App',
        year: '2023',
        scope: 'Planning, Design/Development, Operation',
        position: '00runners President'
      }
    }
  },
  {
    id: 'runpotify',
    title: 'Runpotify (2021)',
    thumbnail: '/img/project/runpotify/thumb.png',
    description: 'Runpotify는 달리기와 음악을 결합한 라이프스타일 소셜 앱 데모입니다.',
    details: '달리기 속도와 거리에 맞춰 음악을 추천해주는 앱 데모로, 사용자의 런닝 경험을 향상시킵니다. 이 프로젝트는 개념 증명 단계에서 개발되었습니다. 더 알아보려면 me@han-park.info로 연락주세요.',
    url: 'https://runpotify.github.io/preview/',
    buttonText: '데모 링크',
    category: '라이프스타일 소셜 앱 (데모)',
    year: '2021',
    scope: '데모 제작',
    collaborator: '조연우',
    projectSeasonId: 'a',
    images: [
      ['/img/project/runpotify/thumb.png', 100]
    ],
    localizedContent: {
      en: {
        title: 'Runpotify (2021)',
        description: 'Runpotify is a lifestyle social app demo combining running and music.',
        details: 'An app demo that recommends music based on running speed and distance, enhancing the user\'s running experience. This project was developed at the proof of concept stage. To learn more, please contact me@han-park.info',
        buttonText: 'GitHub Repository',
        category: 'Lifestyle Social App (Demo)',
        year: '2021',
        scope: 'Demo Production',
        collaborator: 'Jo Yeonwoo'
      }
    }
  },
  {
    id: 'he',
    title: 'Higher Efficiency (2021)',
    thumbnail: '/img/project/he/thumb.png',
    description: '줌터디를 위한 유틸리티 소셜 웹앱',
    details: '일상 생산성을 높이기 위한 습관 관리와 목표 달성 기능을 제공하는 소셜 앱입니다. 사용자들은 서로의 진행 상황을 공유하고 동기부여를 받을 수 있습니다. 자세한 정보는 me@han-park.info로 문의해주세요.',
    url: 'https://www.notion.so/han-park/Copy-of-HE-Web-fe5d3106ad5e4cc78e05157a5469d9e7',
    buttonText: '노션 후기',
    category: '라이프스타일 소셜 앱',
    year: '2021',
    scope: '기획, 디자인/개발',
    position: 'HD 멤버',
    collaborator: '최동혁 외 HD 멤버들',
    projectSeasonId: 'a',
    images: [
      ['/img/thumbnail/higher-efficiency.png', 100]
    ],
    localizedContent: {
      en: {
        title: 'Higher Efficiency (2021)',
        description: 'Higher Efficiency is a lifestyle social app for improving daily productivity.',
        details: 'A social app providing habit management and goal achievement features to enhance daily productivity. Users can share their progress with each other and receive motivation. For more information, please contact me@han-park.info',
        buttonText: 'GitHub Repository',
        category: 'Lifestyle Social App',
        year: '2021',
        scope: 'Planning, Design/Development',
        position: 'HD Member',
        collaborator: 'Choi Donghyuk and other HD members'
      }
    }
  },
  {
    id: 'Chaoreum-web',
    title: '차오름웹 (2017)',
    thumbnail: '/img/thumbnail/chaoreum-web.png',
    description: '차오름웹은 고등학생들을 위한 커뮤니티 플랫폼 데모입니다.',
    details: '분당지역 고등학교 학생들을 위한 커뮤니티 플랫폼 데모로, 학교 간 교류와 정보 공유를 촉진합니다. 이 프로젝트는 BLU 활동의 일환으로 기획되었습니다. 더 알아보려면 me@han-park.info로 연락주세요.',
    url: 'https://github.com/hanpark/chaoreum',
    buttonText: 'GitHub 저장소',
    category: '커뮤니티 플랫폼 데모',
    year: '2021',
    scope: '기획 및 데모 제작',
    position: '분당지역고등학교학생회연합(BLU) 의장',
    projectSeasonId: 'a',
    images: [
      ['/img/thumbnail/chaoreum-web.png', 100]
    ],
    localizedContent: {
      en: {
        title: 'Chaoreum Web (2017)',
        description: 'Chaoreum Web is a community platform demo for high school students.',
        details: 'A community platform demo for high school students in the Bundang area, promoting inter-school exchange and information sharing. This project was planned as part of BLU activities. To learn more, please contact me@han-park.info',
        buttonText: 'GitHub Repository',
        category: 'Community Platform Demo',
        year: '2021',
        scope: 'Planning and Demo Production',
        position: 'Chairman of Bundang Local High School Student Council Union (BLU)'
      }
    }
  }
]; 