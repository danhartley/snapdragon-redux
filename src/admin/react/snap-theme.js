import { createMuiTheme } from '@material-ui/core/styles';

const snapdragonStyles = window.getComputedStyle(document.documentElement);

const getPropertyValue = property => {
  const value = snapdragonStyles.getPropertyValue(property);
  return value.trim();
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#576163',
      main: '#3c4345',
      dark: '#788082',
      // light: getPropertyValue('--snap-button-light'),
      // main: getPropertyValue('--snap-button-main'),
      // dark: getPropertyValue('--snap-button-dark'),
    }
  }
});