import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const EmtyState = () => {
  return (
    <Box>
      <Stack
        direction={"column"}
        minHeight={300}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="body2">No data to display</Typography>
      </Stack>
    </Box>
  );
};
