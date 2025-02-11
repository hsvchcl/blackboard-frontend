import { useModalStore } from "@common/hooks/useModalStore";
import { useProductStore } from "@common/hooks/useProductStore";
import { Product } from "@common/interfaces/product.interface";
import { ProductForm } from "@components/ProductForm/EditProductForm";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { deleteProduct } from "@services";
import { ChevronDown, EditIcon, Trash } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

interface MenuActionProps {
  productSelected: Product;
}
export const MenuAction = ({ productSelected }: MenuActionProps) => {
  const deleteProductFromStore = useProductStore(
    (state) => state.deleteProduct
  );
  const { setOpen } = useModalStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: "edit" | "delete") => {
    try {
      if (action === "delete") {
        deleteProduct(productSelected.id)
          .then(() => {
            enqueueSnackbar(
              <Typography variant="overline">
                <strong>{productSelected.name}</strong> eliminado.
              </Typography>,
              {
                variant: "success",
              }
            );
            deleteProductFromStore(productSelected.id);
          })
          .catch((error) => {
            console.error(error);
            enqueueSnackbar("Ocurrió un error al eliminar el producto", {
              variant: "error",
            });
          });
      }
      if (action === "edit") {
        setOpen(
          true,
          `Editar ${productSelected.name}`,
          <ProductForm productSelected={productSelected} mode="edit" />
        );
      }
      handleClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Ocurrió un error al eliminar el producto", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <ChevronDown />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        slotProps={{
          paper: {
            component: Paper,
            sx: {
              width: 150,
              maxWidth: "100%",
              boxShadow: "0px 1px 26px 1px rgba(207,207,207,1)",
            },
          },
        }}
      >
        <Box sx={{ width: 200, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem onClick={() => handleAction("edit")}>
              <ListItemIcon>
                <EditIcon size={20} />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleAction("delete")}>
              <ListItemIcon>
                <Trash size={20} />
              </ListItemIcon>
              <ListItemText>Eliminar</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Menu>
    </>
  );
};
