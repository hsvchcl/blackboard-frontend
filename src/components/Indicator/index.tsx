import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface BarIndicatorProps {
  children?: React.ReactNode;
  title: string;
  height?: number;
}

export const Indicator = ({ children, title, height }: BarIndicatorProps) => {
  return (
    <Stack
      direction={"column"}
      spacing={2}
      p={4}
      component={Paper}
      variant="outlined"
      sx={{ bgcolor: "#ffffff" }}
      minHeight={300}
      height={height ? height : undefined}
    >
      <Typography variant="overline" fontWeight={700}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
