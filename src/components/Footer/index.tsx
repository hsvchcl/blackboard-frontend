import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <Stack mt={2} borderRadius={1} minHeight={200} justifyContent={"center"} bgcolor={"black"} color={"white"}>
      <Grid container spacing={2} component={"footer"}>
        <Grid
          size={{
            xs: 12,
            lg: 4,
            xl: 4,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              variant="h5"
              fontWeight={900}
              textTransform={"uppercase"}
            >
              Blackboard
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{
            xs: 12,
            lg: 4,
            xl: 4,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Stack direction={"column"} spacing={0}>
              <Typography fontWeight={900} textTransform={"uppercase"}>
                By
              </Typography>
              <Typography variant="overline">Hans Steven Vergara</Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid
          size={{
            xs: 12,
            lg: 4,
            xl: 4,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
          <Box display={"flex"} justifyContent={"center"}>
            <Stack direction={"column"} spacing={0}>
              <Typography fontWeight={900} textTransform={"uppercase"}>
                Contact
              </Typography>
              <Typography variant="overline">hans.vergara.cl@gmail.com</Typography>
            </Stack>
          </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};
