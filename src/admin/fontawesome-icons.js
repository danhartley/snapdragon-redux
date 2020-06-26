import { library, dom } from '@fortawesome/fontawesome-svg-core'

import { faBookOpen, faLanguage, faEnvelope, faUserSlash, faUserCheck, faCog, faChevronDown, faGlasses, faDove, faFrog, faPaw, faBug, faLeaf, faBarcode, faSun, faRegistered, faChevronUp, faChalkboard, faTimes, faTimesCircle, faCheck, faExternalLinkAlt, faExclamation, faClone, faCopyright, faSlidersH, faUndo } from '@fortawesome/free-solid-svg-icons'; // fas
import { faPlus, faEdit, faUser, faTrash } from '@fortawesome/free-solid-svg-icons'; // fas
import { faArrowAltCircleLeft, faArrowAltCircleRight, faRegistered as faRegisteredFar } from '@fortawesome/free-regular-svg-icons'; // far
import { faYoutube } from '@fortawesome/free-brands-svg-icons'; // fab

// https://fontawesome.com/v5.9.0/how-to-use/with-the-api/setup/library/

library.add(
  // faBookOpen, faLanguage, faEnvelope, faUserSlash, faUserCheck, faCog, faChevronDown, faGlasses, faDove, faFrog, faPaw, faBug, faLeaf, faRegistered, faBarcode, faSun, faChevronUp, faChalkboard, faTimes, faTimesCircle, faCheck, faExternalLinkAlt, faExclamation, faClone, faCopyright, faSlidersH, faUndo,
  // faArrowAltCircleLeft, faArrowAltCircleRight, faRegisteredFar,
  // faYoutube,

  faPlus, faEdit, faUser, faTrash
)

dom.watch();

export const imports = () => {};