import React from "react";
import { Box, Button } from "@mui/material";

const MonthSelector = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Button color={"error"} variant="contained">
        先月
      </Button>
      <div>日付</div>
      <Button color={"primary"} variant="contained">
        次月
      </Button>
    </Box>
  );
};

export default MonthSelector;
