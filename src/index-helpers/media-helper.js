import { renderTemplate } from 'ui/helpers/templating';

import modalsTemplate from 'index-helpers/modals.html';

import { library, dom } from '@fortawesome/fontawesome-svg-core'

import { faBookOpen, faLanguage, faEnvelope, faUserSlash, faUserCheck, faCog, faChevronDown, faGlasses, faDove, faFrog, faPaw, faBug, faLeaf, faBarcode, faSun, faRegistered, faChevronUp, faChalkboard, faTimes, faTimesCircle, faCheck, faExternalLinkAlt, faExclamation, faClone, faCopyright, faSlidersH, faUndo, faHome, faBars, faAlignLeft, faStopwatch } from '@fortawesome/free-solid-svg-icons'; // fas
import { faArrowAltCircleLeft, faArrowAltCircleRight, faRegistered as faRegisteredFar } from '@fortawesome/free-regular-svg-icons'; // far
import { faYoutube } from '@fortawesome/free-brands-svg-icons'; // fab

// https://fontawesome.com/v5.9.0/how-to-use/with-the-api/setup/library/

library.add(
  faBookOpen, faLanguage, faEnvelope, faUserSlash, faUserCheck, faCog, faChevronDown, faGlasses, faDove, faFrog, faPaw, faBug, faLeaf, faRegistered, faBarcode, faSun, faChevronUp, faChalkboard, faTimes, faTimesCircle, faCheck, faExternalLinkAlt, faExclamation, faClone, faCopyright, faSlidersH, faUndo, faHome, faBars, faAlignLeft, faStopwatch,
  faArrowAltCircleLeft, faArrowAltCircleRight, faRegisteredFar,
  faYoutube
)

dom.watch();

export const handleWindowResize = () => {

  const setWindowHeight = () => {

      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; 
      const iw = (iOS) ? screen.width : window.innerWidth; 
      const ih = (iOS) ? screen.height : window.innerHeight;

      const verticalHeight = window.innerHeight * 0.01;                

      document.documentElement.style.setProperty('--vh', verticalHeight + 'px');
      document.documentElement.style.setProperty('--vhGrid', verticalHeight * 100  + 'px');
      document.documentElement.style.setProperty('--vhRunningBlock', (verticalHeight * 7.5) + 'px');
      document.documentElement.style.setProperty('--vhRunningBlocks', (verticalHeight * 15) + 'px');
      document.documentElement.style.setProperty('--vhStandardBlock', (verticalHeight * 10) + 'px');
      document.documentElement.style.setProperty('--vhHalfStandardBlock', (verticalHeight * 5) + 'px');
      document.documentElement.style.setProperty('--vhQuarterStandardBlock', (verticalHeight * 2.5) + 'px');
      document.documentElement.style.setProperty('--vhOneAndHalfStandardBlock', (verticalHeight * 15) + 'px');
      document.documentElement.style.setProperty('--vhDoubleStandardBlock', (verticalHeight * 20) + 'px');
      document.documentElement.style.setProperty('--vhCarousel', (verticalHeight * 30) + 'px');
      document.documentElement.style.setProperty('--vhButtonBlock', (verticalHeight * 9) + 'px');
      document.documentElement.style.setProperty('--vhRow', (verticalHeight * 11) + 'px');
      document.documentElement.style.setProperty('--vhFixtures', (verticalHeight * 15) + 5 + 'px');
      document.documentElement.style.setProperty('--vhCalendar', (verticalHeight * 11) + 'px');                

      const fixtures = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vhFixtures').replace('px', ''));
      const largeImage = ((verticalHeight * 100) - fixtures) / 3;

      document.documentElement.style.setProperty('--vhLargeImage', largeImage + 'px');
      document.documentElement.style.setProperty('--vhSmallImageCarousel', verticalHeight * 36 + 'px');           
      document.documentElement.style.setProperty('--vhExtraSmallImageCarousel', verticalHeight * 36    + 'px');           

      const horizontalWidth = window.innerWidth * 0.01;

      document.documentElement.style.setProperty('--vw', horizontalWidth + 'px');

      document.documentElement.style.setProperty('--vwGrid', horizontalWidth * 100  + 'px');
      document.documentElement.style.setProperty('--vwGridNegative', (horizontalWidth * -100) + 52  + 'px');
      document.documentElement.style.setProperty('--vhScrollingTop', (horizontalWidth * 56.25) + (verticalHeight * 10) + 'px');
  };

  setWindowHeight();

  window.addEventListener('resize', () => {
      setWindowHeight();
  });
};

export const loadModalHTML = () => {

  const template = document.createElement('template');
        template.innerHTML = modalsTemplate;

  const parent = document.querySelector('body');

  renderTemplate({}, template.content, parent);
};