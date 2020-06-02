import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 250,
    overflowY: "auto",
    position: "absolute",
    margin: 0,
    borderTop: 0,
    zIndex: 1000
  },
  highlighted: {
    backgroundColor: "#bde4ff"
  },
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

export const menuStyles = {
  maxHeight: "180px",
  overflowY: "auto",
  width: "135px",
  margin: 0,
  borderTop: 0,
  background: "white",
  position: "absolute",
  zIndex: 1000,
  listStyle: "none",
  padding: 0,
  left: "135px"
};

export const playgroundStyles = { height: "160px" };

export const comboboxStyles = { display: "inline-block", marginLeft: "5px" };
