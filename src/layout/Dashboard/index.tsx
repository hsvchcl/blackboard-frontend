import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import { BarIndicator } from "@components/Charts/BarIndicator";
import { NavBar } from "@components/NavBar";
import { LineIndicator } from "@components/Charts/LineIndicator";
import { Indicator } from "@components/Indicator";
import { PieIndicator } from "@components/Charts/PieIndicator";
import { Footer } from "@components/Footer";
import { DataGridCustom } from "@components/DataGridCustom";
import { Filters } from "@components/Filters";
import { NumberIndicator } from "@components/NumberIndicator";
import { formatCurrency } from "@common/utils/format-currency.util";
import { useEffect, useState } from "react";
import { getIndicators } from "@services";
import { Indicator as IndicatorInterface } from "@common/interfaces/indicator.interface";
import { useProductStore } from "@common/hooks/useProductStore";
import CircularProgress from "@mui/material/CircularProgress";

const dashboardIndicators = [
  {
    title: "Unidades disponibles por producto",
    component: <BarIndicator />,
  },
  {
    title: "Ventas por producto",
    component: <LineIndicator />,
  },
  {
    title: "Categorias con más stock",
    component: <PieIndicator />,
  },
];

export const Dashboard = () => {
  const { products: productFromStore, loading } = useProductStore(
    (state) => state
  );
  const [loadingIndicators, setLoadingIndicators] = useState(true);
  const [indicators, setIndicators] = useState<IndicatorInterface>({
    productWithMaxSales: "",
    totalSales: 0,
    totalStock: 0,
  });

  useEffect(() => {
    setLoadingIndicators(true);
    if (productFromStore.rows.length === 0) {
      setLoadingIndicators(false);
      return;
    }
    getIndicators()
      .then((response) => {
        if (response) {
          setIndicators(response.data.data);
        }
      })
      .finally(() => {
        setLoadingIndicators(false);
      });
  }, [productFromStore.rows]);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        {loadingIndicators ? (
          <Box
            minHeight={150}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress size={20} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
                xl: 4,
              }}
            >
              <NumberIndicator
                title="Total productos en Stock"
                value={indicators?.totalStock || 0}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                xl: 4,
              }}
            >
              <NumberIndicator
                title="Total ventas"
                value={formatCurrency(indicators?.totalSales || 0)}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                xl: 4,
              }}
            >
              <NumberIndicator
                title="Producto más vendido"
                value={indicators?.productWithMaxSales || "No hay ventas"}
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <br />

      {loading ? (
        <Box
          minHeight={250}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress size={20} />
        </Box>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {dashboardIndicators.map((indicator, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    xl: 4,
                  }}
                >
                  <Indicator
                    title={indicator.title}
                    children={indicator.component}
                  />
                </Grid>
              ))}
              <Grid
                size={{
                  xs: 12,
                  xl: 4,
                }}
              ></Grid>
            </Grid>
          </Box>
          <Box>
            <Indicator
              title="Productos Registrados"
              children={<DataGridCustom />}
              filterComponent={<Filters />}
            />
          </Box>
        </>
      )}

      <Footer />
    </Container>
  );
};
