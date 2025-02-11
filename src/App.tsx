import { RouterProvider } from "react-router-dom";
import { router } from "@routes";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useTheme } from "@mui/material";
import { customTheme } from "@theme";
import { SnackbarProvider } from "notistack";
import { Modal } from "@components/Modal";
import { MainMenu } from "@components/MainMenu";

export const App = () => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={customTheme(theme)}>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
        <Modal />
        <MainMenu />
      </SnackbarProvider>
    </ThemeProvider>
  );
};
