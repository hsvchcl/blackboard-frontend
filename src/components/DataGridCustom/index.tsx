import Paper from "@mui/material/Paper";
import { EmtyState } from "@components/EmptyState";
import { useProductStore } from "@common/hooks/useProductStore";
import { useEffect, useState } from "react";
import { Product } from "@common/interfaces/product.interface";
import { MenuAction } from "@components/MenuAction";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { formatCurrency } from "@common/utils/format-currency.util";

export const DataGridCustom = () => {
  const { products } = useProductStore((state) => state);
  const [rows, setRows] = useState<Product[]>([]);

  useEffect(() => {
    setRows(products.rows.sort((a, b) => b.id - a.id));
  }, [products]);

  return (
    <>
      {rows.length === 0 ? (
        <EmtyState />
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {products.header.map(
                  (header: { key: string; label: string }, index: number) => (
                    <TableCell
                      key={index}
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 900,
                      }}
                    >
                      {header.label}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {products.header.map((header, index) =>
                    header.key === "action" ? (
                      <TableCell key={index}>
                        <MenuAction productSelected={row} />
                      </TableCell>
                    ) : (
                      <TableCell key={index}>
                        {header.key === "price"
                          ? formatCurrency(row[header.key])
                          : row[header.key]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
