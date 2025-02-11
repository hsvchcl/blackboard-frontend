import { productSchema, ProductZodType } from "@common/zod/product-schema.zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { FORM_LABELS } from "@common/constants/form-labels.constants";
import Stack from "@mui/material/Stack";
import { Product } from "@common/interfaces/product.interface";
import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useModalStore } from "@common/hooks/useModalStore";
import { createProduct, updateProduct } from "@services";
import { enqueueSnackbar } from "notistack";
import { useProductStore } from "@common/hooks/useProductStore";

interface ProductFormProps {
  productSelected?: Product;
  mode: "edit" | "create";
}
export const ProductForm = ({
  productSelected = undefined,
  mode,
}: ProductFormProps) => {
  const handleClose = useModalStore((state) => state.handleClose);
  const {
    updateProduct: updateProductFromStore,
    addProduct: addProductFromStore,
  } = useProductStore((state) => state);

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm<ProductZodType>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductZodType> = (data) => {
    if (mode === "edit") {
      updateProduct({ ...data, id: productSelected?.id })
        .then((response) => {
          enqueueSnackbar(<Typography>{response?.data.message}</Typography>, {
            variant: "success",
          });
          updateProductFromStore({
            ...data,
            id: productSelected?.id,
          } as Product);
          handleClose?.();
        })
        .catch((error) => {
          console.error(error);
          enqueueSnackbar("Ocurrió un error al actualizar el producto", {
            variant: "error",
          });
        });
    } else if (mode === "create") {
      const completeData = {
        ...data,
        id: Date.now(),
      };
      createProduct(completeData)
        .then((response) => {
          if (response?.data.success) {
            enqueueSnackbar(<Typography>{response?.data.message}</Typography>, {
              variant: "success",
            });
            addProductFromStore(completeData as Product);
          } else {
            throw new Error(
              response?.data.message || "Error al crear producto"
            );
          }
          handleClose?.();
        })
        .catch((error) => {
          console.error(error);
          enqueueSnackbar(<Typography>Error al crear producto</Typography>, {
            variant: "error",
          });
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack direction={"column"} spacing={2} p={1}>
            <TextField
              fullWidth
              focused
              defaultValue={productSelected?.name || ""}
              id={`name`}
              label="Nombre del producto"
              variant="outlined"
              placeholder="Mi super producto"
              autoComplete="off"
              {...register("name")}
              error={errors.name ? true : false}
              helperText={
                errors.name ? errors.name.message : FORM_LABELS.required
              }
              onBlur={() => trigger("name")}
            />
            <TextField
              fullWidth
              focused
              defaultValue={productSelected?.stock || ""}
              id={`stock`}
              label="Stock"
              variant="outlined"
              placeholder="1000"
              autoComplete="off"
              {...register("stock", {
                valueAsNumber: true,
              })}
              error={errors.stock ? true : false}
              helperText={
                errors.stock ? errors.stock.message : FORM_LABELS.required
              }
              onBlur={() => trigger("stock")}
            />
            <TextField
              fullWidth
              focused
              defaultValue={productSelected?.price || ""}
              id={`price`}
              label="Precio"
              variant="outlined"
              placeholder="1000"
              autoComplete="off"
              {...register("price", {
                valueAsNumber: true,
              })}
              error={errors.price ? true : false}
              helperText={
                errors.price ? errors.price.message : FORM_LABELS.required
              }
              onBlur={() => trigger("price")}
            />
            <TextField
              fullWidth
              focused
              defaultValue={productSelected?.category || ""}
              id={`category`}
              label="Categoría"
              variant="outlined"
              placeholder="Mi super categoría"
              autoComplete="off"
              {...register("category")}
              error={errors.category ? true : false}
              helperText={
                errors.category ? errors.category.message : FORM_LABELS.required
              }
              onBlur={() => trigger("category")}
            />
            <TextField
              fullWidth
              focused
              defaultValue={productSelected?.sales || ""}
              id={`sales`}
              label="Ventas"
              variant="outlined"
              placeholder="10"
              autoComplete="off"
              {...register("sales", {
                valueAsNumber: true,
              })}
              error={errors.sales ? true : false}
              helperText={
                errors.sales ? errors.sales.message : FORM_LABELS.required
              }
              onBlur={() => trigger("sales")}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} type="button">
            Cancelar
          </Button>
          <Button
            variant="contained"
            disabled={!isValid}
            color="primary"
            type="submit"
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </>
  );
};
