import { useMainMenuStore } from "@common/hooks/useMainMenuStore";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu, Search as SearchIcon } from "lucide-react";
import Me from "@assets/me.jpeg";
import { ChangeEvent, useEffect, useState } from "react";

import { useDebounce } from "@uidotdev/usehooks";
import { getAllProducts, getProductByQuery } from "@services";
import { enqueueSnackbar } from "notistack";
import { useProductStore } from "@common/hooks/useProductStore";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const NavBar = () => {
  const { setProductRows } = useProductStore((state) => state);
  const toggleDrawer = useMainMenuStore((state) => state.toggleDrawer);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getProductByQuery(debouncedSearchTerm)
        .then((response) => {
          enqueueSnackbar(<Typography>{response?.data.message}</Typography>, {
            variant: "success",
          });
          if (response?.data.success && response?.data.data.length > 0) {
            setProductRows(response?.data.data);
          }
        })
        .catch((error) => {
          console.error("Error al buscar el producto", error);
        });
    } else {
      getAllProducts()
        .then((response) => {
          if (response?.data.success) {
            setProductRows(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(
            <Typography>Error al obtener los productos</Typography>,
            {
              variant: "error",
            }
          );
        });
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "black", mt: 2, mb: 2, borderRadius: 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <Menu />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          fontWeight={900}
        >
          BLACKBOARD
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          {/* <Button color="inherit" startIcon={<Plus />}>
            Producto
          </Button> */}
          <Avatar alt="Remy Sharp" src={Me} sx={{ width: 40, height: 40 }} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
