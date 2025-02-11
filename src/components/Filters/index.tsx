import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Button, Paper, Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProducts, getProductByQuery } from "@services";
import { useProductStore } from "@common/hooks/useProductStore";
import { enqueueSnackbar } from "notistack";
import { formatCurrency } from "@common/utils/format-currency.util";

interface FiltersProps {
  isActive?: boolean;
}
export const Filters = ({ isActive }: FiltersProps) => {
  const { setProductRows } = useProductStore((state) => state);
  const [rangeFilters, setRangeFilters] = useState<{
    stockRange: number[];
    priceRange: number[];
    name: string;
  }>({ stockRange: [0, 10], priceRange: [0, 5000], name: "" });

  const [maxStock, setMaxStock] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  function handleStockChange(_event: Event, value: number | number[]): void {
    setRangeFilters({ ...rangeFilters, stockRange: value as number[] });
  }

  const handlePriceChange = (_event: Event, value: number | number[]): void => {
    setRangeFilters({ ...rangeFilters, priceRange: value as number[] });
  };

  useEffect(() => {
    if (isActive) {
      handleRanges();
    }
  }, []);

  const handleRanges = (fromClean = false) => {
    getAllProducts()
      .then((response) => {
        if (response?.data.success) {
          const maxStock = Math.max(
            ...response.data.data.map((product) => product.stock)
          );
          const maxPrice = Math.max(
            ...response.data.data.map((product) => product.price)
          );
          setMaxStock(maxStock);
          setMaxPrice(maxPrice);
          setRangeFilters({
            name: "",
            stockRange: [0, maxStock],
            priceRange: [0, maxPrice],
          });

          if (fromClean) {
            enqueueSnackbar(
              <Typography variant="overline">
                Todos los filtros restablecidos
              </Typography>,
              {
                variant: "info",
              }
            );
            setProductRows(response.data.data);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCleanFilters = () => {
    handleRanges(true);
  };

  const handleFilter = () => {
    setLoading(true);
    getProductByQuery(
      rangeFilters.name,
      rangeFilters.priceRange,
      rangeFilters.stockRange
    )
      .then((response) => {
        if (response?.data.success) {
          enqueueSnackbar(
            <Typography variant="overline">{response.data.message}</Typography>,
            {
              variant: "success",
            }
          );
          setProductRows(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error al filtrar productos", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box component={Paper} p={4} variant="outlined" bgcolor={"#fbfbfb"}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            focused
            value={rangeFilters.name}
            autoComplete="off"
            id="outlined-basic"
            label="Nombre del producto"
            variant="outlined"
            onChange={(e) =>
              setRangeFilters({ ...rangeFilters, name: e.target.value })
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction={"column"} spacing={0}>
            <Typography variant="overline" fontWeight={700}>
              Rango Stock
            </Typography>
            <Slider
              size="small"
              getAriaLabel={() => "Temperature range"}
              value={rangeFilters.stockRange}
              onChange={handleStockChange}
              valueLabelDisplay="auto"
              getAriaValueText={() => "Temperature range"}
              max={maxStock}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction={"column"} spacing={0}>
            <Typography variant="overline" fontWeight={700}>
              Rango Precio
            </Typography>
            <Slider
              size="small"
              getAriaLabel={() => "Temperature range"}
              value={rangeFilters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={() => "Temperature range"}
              max={maxPrice}
              valueLabelFormat={(value) => `${formatCurrency(value)}`}
            />
          </Stack>
        </Grid>
      </Grid>
      <br />

      <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
        <Button onClick={() => handleCleanFilters()}>Limpiar</Button>
        <Button
          loading={loading}
          variant={"contained"}
          color={"primary"}
          onClick={handleFilter}
        >
          Filtrar
        </Button>
      </Stack>
    </Box>
  );
};
