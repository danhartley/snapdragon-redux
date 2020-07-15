import { constants } from 'checklist/opt-constants';

let sections = [
  {
    type: constants.TOOLS,
    header: 'Tools',
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
      , { name: 'loadCSS', link: 'https://github.com/filamentgroup/loadCSS/blob/master/README.md', about: 'Load CSS asynchronosuly' }
      , { name: 'Workspaces', link: 'https://developers.google.com/web/tools/chrome-devtools/workspaces/?utm_source=devtools', about: 'Save DevTool changes to file' }
      , { name: 'Local Overrides', link: 'https://developers.google.com/web/updates/2018/01/devtools#overrides', about: 'Have DevTool changes persist across page loads' }      
    ]
  },
  {
    type: constants.CHECKS,
    header: 'Checklist',
    checks: [
      {
        term: 'Media queries',
        descriptions: ['Design the content to fit on a small screen size first, then expand the screen until a breakpoint becomes necessary.']
      }
      ,{
        term: 'Page size',
        descriptions: ['Chrome DevTools: Select Network, disable cache, reload, and check bytes transferred at the bottom of the screen.']
      }
      ,{
        term: 'Google fonts',
        descriptions: ['Customise your request by family and variants e.g. \'Open Sans\'.',
            'Default variants includes only \'regular 400\'. Combine fonts into a single request.',
            'Append \'display=swap\' to request, or \'font-display: swap;\', this will allow text to load with fallback font until the Google Font is available.',
            'Use DNS prefetching.',
            'Use preconnect.']
      }
      ,{
        term: 'JavaScript',
        descriptions: [
          'Remove unused code', 
          'Add the \'defer\' attribute to script tag where possible.'
        ] 
      }
      ,{
        term: 'Accessibility',
        descriptions: [
          'Add skip link.', 'Check for landmark elements.'
        ] 
      }
      ,{
        term: 'CSS',
        descriptions: [
          'Remove unused styles.', 'Copy CSS files and use loadCSS pattern to affect non-blocking request.'
        ] 
      }
      ,{
        term: 'JavaScript: PRPL',
        descriptions: [
          'Push (preload), Render, Pre-cache, Lazy-load'
        ] 
      }
    ]
  },
  {
    type: constants.CONCEPTS,
    header: 'Concepts',
    concepts: [
      {
        term: 'CRP performance',
        descriptions: ['Critical Rendering Path.']
      }
      , {
        term: 'Real user monitoring',
        descriptions: ['A passive monitoring technology that records all user interaction with a website or client interacting with a server or cloud-based application. The Navigation Timing API can be used to measure real-world CRP performance. AKA Field Data.'],
        link: 'https://developers.google.com/web/fundamentals/performance/critical-rendering-path'
      }
      , {
        term: 'Critical CSS',
        descriptions: ['A technique that extracts the CSS for above-the-fold content in order to render content to the user as fast as possible.'],
        link: 'https://web.dev/extract-critical-css/'
      }
      , {
        term: 'Bundle splitting and code splitting',
        descriptions: ['Def…'],
        link: 'https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758'
      }
      , {
        term: 'Tree shaking',
        descriptions: ['A form of dead code elimination.'],
        link: 'https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking'
      }
      , {
        term: 'Time to Interactive',
        descriptions: ['How long it takes a page to become fully interactive.'],
        link: 'https://web.dev/interactive'
      }
      , {
        term: 'RAIL',
        descriptions: ['A user-centric performance model that breaks down the user\'s experience into key actions: Response, Animation , Idle, Load'],
        more: [
          {
            link: 'https://developers.google.com/web/fundamentals/performance/rail#ux',
            title: 'RAIL performance'
          },
          {
            link: 'https://www.udacity.com/course/website-performance-optimization--ud884',
            title: 'Udemy: Performance optimisation course'
          },
      ]
      }
      , { term: 'Performance', link: 'https://developer.mozilla.org/en-US/docs/Web/API/Performance', descriptions: ['The Performance interface provides access to performance-related information for the current page.'] }
      , { term: 'Critical CSS', link: 'https://web.dev/extract-critical-css/', descriptions: ['The CSS required for above-the-fold content.'] }
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