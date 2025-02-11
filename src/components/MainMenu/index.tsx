import { useMainMenuStore } from "@common/hooks/useMainMenuStore";
import { useModalStore } from "@common/hooks/useModalStore";
import { ProductForm } from "@components/ProductForm/EditProductForm";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Plus } from "lucide-react";

export const MainMenu = () => {
  const { open, toggleDrawer } = useMainMenuStore((state) => state);
  const { setOpen } = useModalStore((state) => state);

  const handleAddNewProduct = () => {
    setTimeout(() => {
    setOpen(true, `Añadir nuevo producto`, <ProductForm mode="create" />);
    }, 300);
  };

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      slotProps={{
        root: {
          style: {
            backdropFilter: "blur(5px)",
          },
        },
      }}
    >
      <Box
        sx={{ width: 250, p: 2 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleAddNewProduct}>
              <ListItemIcon>
                <Plus />
              </ListItemIcon>
              <ListItemText primary={"Nuevo Producto"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
