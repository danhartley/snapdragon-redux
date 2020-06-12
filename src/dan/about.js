import { renderTemplate } from 'ui/helpers/templating';

import aboutTemplate from 'dan/about-template.html';

export const about = () => {

  const template = document.createElement('template');
        template.innerHTML = aboutTemplate;

  parent = document.querySelector('body');

  let sections = [
    {
      header: 'Front end fundamentals',
      skills: [
        { name: 'HTML5', class: 'love' }, { name: 'Modern JS', class: 'love', link: 'More on this…' }, { name: 'CSS3' }, { name: 'SASS' }
      ]
    },
    {
      header: 'DevOps',
      skills: [
        { name: 'Webpack' }, { name: 'Babel' }, { name: 'Git' }, { name: 'GitHub' }, { name: 'Freedcamp' }
      ]
    },
    {
      header: 'Back end',
      skills: [
        { name: 'Firestore' }, { name: 'Babel' }, { name: 'Git' }, { name: 'GitHub' }, { name: 'Freedcamp' }
      ]
    }
  ];

  sections.forEach(se => se.skills.map(sk => {
    sk.class = sk.class || '';
    sk.link = sk.link || '';
  }));

  renderTemplate({
    sections
  }, template.content, parent);

};