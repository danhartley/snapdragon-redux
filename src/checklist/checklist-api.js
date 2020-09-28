import { constants } from 'checklist/checklist-constants';

let sections = [
  // {
  //   type: constants.PROCESS,
  //   header: 'Iteration checklist',
  //   steps: [
  //     {
  //       term: 'A working wireframe that covers major features and use cases',
  //       descriptions: [`Create the simplest version of the site using few or no colours,  with intended layouts, standard padding, margins, grids, etc.
  //       Treat Text as a User Interface.
  //       Include all media breakpoints.        
  //       Include all dependencies that will be needed whether or not they are immediately required e.g. firebase authentication.
  //       The site should be semantically correct. If possible have someone familiar with using screen readers use the site.`]
  //     },
  //     {
  //       term: 'Testing and metrics',
  //       descriptions: [`Set up a Lighthouse budget and testing framework preferably on a dedicated machine.
  //       Create a Lighthouse dashboard accessible to and understood by everyone.
  //       Use realistic data that has been agreed by everyone. Avoid lorem ipsum.
  //       Share responsibility for performance.`]
  //     },
  //     {
  //       term: 'Design',
  //       descriptions: [`Create live style guides accessible to everyone.
  //       Pair programmers and designers. Use brower tools to test and demonstrate.`]
  //     }
  //   ]    
  // },
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
    header: 'Project checklist',
    checks: [
      {
        term: 'A working wireframe that covers major features and use cases',
        descriptions: [`Create the simplest version of the site using few or no colours,  with intended layouts, standard padding, margins, grids, etc.
        Treat Text as a User Interface.
        Include all media breakpoints.        
        Include all dependencies that will be needed whether or not they are immediately required e.g. firebase authentication.
        The site should be semantically correct. If possible have someone familiar with using screen readers use the site.`]
      },
      {
        term: 'Testing and metrics',
        descriptions: [`Set up a Lighthouse budget and testing framework preferably on a dedicated machine.
        Create a Lighthouse dashboard accessible to and understood by everyone.
        Use realistic data that has been agreed by everyone. Avoid lorem ipsum.
        Share responsibility for performance.`]
      },
      {
        term: 'Design',
        descriptions: [`Create live style guides accessible to everyone.
        Pair programmers and designers. Use brower tools to test and demonstrate.`]
      },
      {
        term: 'Intention',
        descriptions: [``]
      },
      {
        term: 'Media queries',
        descriptions: [`Design the content to fit on a small screen size first, then expand the screen until a breakpoint becomes necessary.`]
      },
      {
        term: 'Set up tooling and testing',
        descriptions: [`Make full use of browser tooling such as Chrome DevTools.
        Have sufficient screen space to show development tool dashboards and graphics.
        Use a variety of web browsers.
        Test against a range of real devices.
        Have a staging environment that replicates the live site.
        Test in adverse, but common, scenarios such as on a slow network, low memory, and offline.`]
      }
      ,{
        term: 'Google fonts',
        descriptions: ['Customise your request by family and variants e.g. \'Open Sans\'.',
            'Default variants includes only \'regular 400\'. Combine fonts into a single request.',
            'Append \'display=swap\' to request, or \'font-display: swap;\', this will allow text to load with fallback font until the Google Font is available.',
            'Use DNS prefetching.',
            'Use preconnect.']
      },
      {
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
        ], 
        link: 'https://web.dev/apply-instant-loading-with-prpl/'
      }
    ]
  },
  {
    type: constants.CHECKS,
    header: 'Feature checklist',
    checks: [
      {
        term: 'Set up local environment so that the new feature can be created and tested in isolation',
        descriptions: ['e.g. webpack and package configurations, index.html page, etc.']
      },
      {
        term: 'Create README.md file',
        descriptions: [`List files used only during initial development and testing, and to support stand-alone deployment.
        Include instructions on how to run the feature in isolation.
        Mandatory sections for HTML, JavaScript and CSS naming conventions and preprocessors e.g. Sass & BME.`]
      },
      {
        term: 'Create tests',
        descriptions: [`Test pure functions.
        Functions that do not (yet) have tests should be pure.
        Create local data that can be used before live data is available, and for tests.`]
      },
      {
        term: 'Minimise moving parts',
        descriptions: [`Keep to a miniumum places where there is logic that is likely to change.
        List active files (moving parts) in the READ.md.
        Use a config file for parameters controlled outside of the feature.
        List files that interact with the DOM, but in a local and temporary way. This code may need to be refactored.`]
      }
    ]
  },
  {
    type: constants.TERMS,
    header: 'Terms',
    terms: [
      {
        term: 'CRP performance',
        descriptions: ['Critical Rendering Path.']
      }
      , {
        term: 'RUM Real user monitoring',
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
        term: 'Landmarks',
        descriptions: ['8 roles each of which represents a block of content that occurs commonly on web pages.'],
        link: 'https://www.washington.edu/accessibility/web/landmarks/'
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
      , { term: 'JAMstack', link: 'https://jamstack.org/', descriptions: ['Web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.'] }
      , { term: 'JAMstack', link: 'https://jamstack.wtf/', descriptions: ['Web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.'] }
      , { term: 'SSR Server side rendering', link: '', descriptions: [''] }
      , { term: 'ISSR Isomorphic server side rendering', link: '', descriptions: [''] }
      , { term: 'Topography', link: 'https://ia.net/topics/the-web-is-all-about-typography-period', descriptions: ['95% of web design is topography'] }
      , { term: 'Ornament and Crime', link: 'https://en.wikipedia.org/wiki/Ornament_and_Crime', descriptions: ['A criticism of ornament in useful objects.'] }
  ]
  }
];

let toollist = sections.find(section => section.type === constants.TOOLS);
let projectChecklist = sections.find(section => section.type === constants.CHECKS && section.header === 'Project checklist');
let featureChecklist = sections.find(section => section.type === constants.CHECKS && section.header === 'Feature checklist');
let termList = sections.find(section => section.type === constants.TERMS);
// let processList = sections.find(section => section.type === constants.PROCESS);

toollist.tools.forEach(sk => {
  sk.link = sk.link || '';
  sk.about = sk.about || '';
  sk.title = sk.title || '';
});

export const api = {
  sections,
  toollist,
  projectChecklist,
  featureChecklist,
  // processList
}