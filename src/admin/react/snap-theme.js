import { createMuiTheme } from '@material-ui/core/styles';

const snapdragonStyles = window.getComputedStyle(document.documentElement);

const getPropertyValue = property => {
  const value = snapdragonStyles.getPropertyValue(property);
  return value.trim();
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: getPropertyValue('--snap-button-light'),
      main: getPropertyValue('--snap-button-main'),
      dark: getPropertyValue('--snap-button-dark'),
    }
  }
});