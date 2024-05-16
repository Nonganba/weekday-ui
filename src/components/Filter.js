import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React from "react";

const Filter = ({ filterName, handleFilterChange, filterType }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        minWidth: "200px",
        border: "1px solid #808080",
        width: "max-content",
      }}
    >
      <InputBase
        sx={{ ml: 1, mr: 1, fontSize: "15px" }}
        placeholder={filterName}
        inputProps={{ "aria-label": filterName }}
        onChange={(event) => handleFilterChange(filterType, event.target.value)}
      />
      <Divider sx={{ height: 28 }} orientation="vertical" />
      <IconButton color="disabled" sx={{ p: "5px" }} aria-label="directions">
        <ExpandMoreIcon />
      </IconButton>
    </Paper>
  );
};

export default Filter;
