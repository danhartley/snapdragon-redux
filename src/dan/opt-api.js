import { constants } from 'dan/opt-constants';

let sections = [
  {
    type: constants.TOOLS,
    header: 'Early testing',
    tools: [
        { name: 'Lighthouse', link: 'https://developers.google.com/web/tools/lighthouse/', about: 'Automated tool for testing performance, etc.', checklist: [
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
  }
];

let toollist = sections.find(section => section.type === constants.TOOLS);
let checklist = sections.find(section => section.type === constants.CHECKS);

toollist.tools.forEach(sk => {
  sk.link = sk.link || '';
  sk.about = sk.about || '';
  sk.title = sk.title || '';
});

export const api = {
  sections,
  toollist,
  checklist
}