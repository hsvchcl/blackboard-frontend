import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface NumberIndicatorProps {
  title: string;
  value: number | string;
}
export const NumberIndicator = ({
  title = "Indicador",
  value = 0,
}: NumberIndicatorProps) => {
  return (
    <Box height={150} component={Paper} variant="outlined">
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        sx={{
          height: "100%",
        }}
      >
        <Typography variant="overline" fontWeight={700} textTransform={'uppercase'}>{title}</Typography>
        <Typography
          variant="h4"
          fontWeight={900}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Box>
  );
};
