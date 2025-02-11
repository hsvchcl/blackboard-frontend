import { Theme, createTheme } from "@mui/material";

const borderRadius = 5;
const buttonBorderRadius = 5;

const mainColor = "#343435";
const secondaryColor = "#8d8d8d";
const contrastTextColor = "#ffffff";
const secondaryTextColor = "#4e05a4";

export const customTheme = (outerTheme: Theme) =>
  createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
    palette: {
      mode: outerTheme.palette.mode,
      primary: {
        main: mainColor,
        contrastText: contrastTextColor,
      },
      secondary: {
        main: secondaryColor,
        contrastText: contrastTextColor,
      },
      text: {
        primary: mainColor,
        secondary: secondaryTextColor,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius,
            boxShadow: "0px 0px 33px -8px rgba(173,163,173,0.3)",
            padding: 20,
            margin: 20,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(5px)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(15px)",
            backgroundColor: "#ffffff1c",
            borderBottom: "1px solid #0000000d",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: borderRadius,
            boxShadow: "0px 0px 33px -8px rgba(173,163,173,0.3)",
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontWeight: "500",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            boxShadow: "0px 5px 13px 1px rgb(3 12 102 / 10%)", // Tu sombra personalizada
            padding: 20,
            borderRadius: borderRadius,
          },
          container: {
            backdropFilter: "blur(10px)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: buttonBorderRadius,
            textTransform: "inherit",
            zIndex: 1,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius,
            margin: 10,
            transition: ".5s",
            ":hover": {
              backgroundColor: mainColor,
              color: contrastTextColor,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#bfc7d1",
            color: "#52616B",
          },
        },
      },
    },
  });
