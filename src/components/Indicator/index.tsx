import { IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Filter, FilterX } from "lucide-react";
import React, { JSX, useEffect } from "react";
import { useState } from "react";

interface BarIndicatorProps {
  children?: React.ReactNode;
  filterComponent?: JSX.Element;
  title: string;
  height?: number;
}

export const Indicator = ({
  children,
  filterComponent,
  title,
  height,
}: BarIndicatorProps) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [updatedComponent, setUpdatedComponent] = useState<JSX.Element | null>(
    null
  );

  useEffect(() => {
    if (filterComponent) {
      setUpdatedComponent(
        React.cloneElement(filterComponent, { isActive: true })
      );
    }
  }, [openCollapse]); // Se ejecuta cuando cambian los props

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
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="overline" fontWeight={700}>
          {title}
        </Typography>
        {filterComponent && (
          <IconButton onClick={() => setOpenCollapse(!openCollapse)}>
            {openCollapse ? <FilterX /> : <Filter />}
          </IconButton>
        )}
      </Stack>
      <Collapse in={openCollapse}>
        {openCollapse ? updatedComponent : null}
      </Collapse>
      {children}
    </Stack>
  );
};
