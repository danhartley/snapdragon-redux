import { renderTemplate } from 'ui/helpers/templating';

import aboutTemplate from 'dan/about-template.html';

export const about = () => {

  const template = document.createElement('template');
        template.innerHTML = aboutTemplate;

  parent = document.querySelector('body');

  let development = [
    {
      header: 'Early testing',
      tools: [
          { name: 'Lighthouse', link: 'https://developers.google.com/web/tools/lighthouse/', about: 'Automated tool for testing performance, etc.' }
        , { name: 'Google\'s Impact Calculator', link: 'https://www.thinkwithgoogle.com/feature/testmysite/', about: 'Enter your domain to test your mobile speed' }
      ]
    }
  ];

  development.forEach(se => se.tools.map(sk => {
    sk.link = sk.link || '';
    sk.about = sk.about || '';
  }));

  let sections = [
    ...development
  ];

  renderTemplate({
    sections,    
  }, template.content, parent);

};


  // let development = [
  //   {
  //     header: 'Front end fundamentals',
  //     skills: [
  //       { name: 'HTML5', class: 'love' }, { name: 'Modern JS', class: 'love', link: 'More on this…' }, { name: 'CSS3' }, { name: 'SASS' }
  //     ]
  //   },
  //   {
  //     header: 'DevOps',
  //     skills: [
  //       { name: 'Webpack' }, { name: 'Babel' }, { name: 'Git' }, { name: 'GitHub' }, { name: 'Freedcamp' }
  //     ]
  //   },
  //   {
  //     header: 'Back end',
  //     skills: [
  //       { name: 'Firestore' }, { name: 'Babel' }, { name: 'Git' }, { name: 'GitHub' }, { name: 'Freedcamp' }
  //     ]
  //   }
  // ];