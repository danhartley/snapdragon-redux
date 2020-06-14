import { constants } from 'dan/opt-constants';

let sections = [
  {
    type: constants.TOOLS,
    header: 'Early testing',
    tools: [
        {
          name: 'Google\`s PageSpeed Insights',
          link: 'https://developers.google.com/speed/pagespeed/insights/?hl=en-GB',
          about: 'Lighthouse + Field Data.', title: 'page speed'
        }
        , { name: 'Lighthouse', link: 'https://developers.google.com/web/tools/lighthouse/', about: 'Automated tool for testing performance, etc.', checklist: [
          { name: 'Viewport', links: [
            { title: 'Responsive web design basics', link: 'https://web.dev/responsive-web-design-basics/#use-css-media-queries-for-responsiveness', tags: ['viewport', 'media queries', 'accessibility'] }
          ] }
        ] }
      , { name: 'Google\'s Impact Calculator'
        , link: 'https://www.thinkwithgoogle.com/feature/testmysite/'
        , title: 'calculator'
        , about: 'Enter your domain to test your mobile speed' 
      }
      , { name: 'Chrome DevTools', link: 'https://www.google.com/chrome/', about: '' }
    ]
  },
  {
    type: constants.CHECKS,
    header: 'Checklist',
    checks: [
      {
        name: 'media queries',
        value: 'Design the content to fit on a small screen size first, then expand the screen until a breakpoint becomes necessary.'
      }
      ,{
        name: 'page size',
        value: 'Chrome DevTools: Select Network, disable cache, reload, and check bytes transferred at the bottom of the screen.'  
      }
    ]
  },
  {
    type: constants.CONCEPTS,
    header: 'Concepts',
    concepts: [
      {
        name: 'CRP performance',
        value: 'Critical Rendering Path.'
      }
      , {
      name: 'Real user monitoring',
      value: 'A passive monitoring technology that records all user interaction with a website or client interacting with a server or cloud-based application. The Navigation Timing API can be used to measure real-world CRP performance. AKA Field Data.'
      }
  ]
  }
];

let toollist = sections.find(section => section.type === constants.TOOLS);
let checklist = sections.find(section => section.type === constants.CHECKS);
let conceptList = sections.find(section => section.type === constants.CONCEPTS);

toollist.tools.forEach(sk => {
  sk.link = sk.link || '';
  sk.about = sk.about || '';
  sk.title = sk.title || '';
});

export const api = {
  sections,
  toollist,
  checklist,
  conceptList
}