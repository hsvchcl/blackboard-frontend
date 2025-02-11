import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import { BarIndicator } from "@components/Charts/BarIndicator";
import { NavBar } from "@components/NavBar";
import { LineIndicator } from "@components/Charts/LineIndicator";
import { Indicator } from "@components/Indicator";
import { PieIndicator } from "@components/Charts/PieIndicator";
import { DataGrid } from "@components/DataGrid";
import { useProductStore } from "@common/hooks/useProductStore";
import { Footer } from "@components/Footer";
import { useEffect } from "react";
import { getAllProducts } from "@services";

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
  const { setProductRows } = useProductStore((state) => state);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = () => {
    getAllProducts()
      .then((response) => {
        if (response?.data.success) {
          setProductRows(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
      <NavBar />
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
        <Indicator title="Productos Registrados" children={<DataGrid />} />
      </Box>
      <Footer />
    </Container>
  );
};
