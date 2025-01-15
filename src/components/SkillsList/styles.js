import { Grid, styled } from "@mui/material";

export const ScrollTableBox = styled(Grid)(({ theme }) => ({
  overflow: "auto",
  maxHeight: "300px",
  paddingRight: "10px",
  paddingLeft: "20%",
}));