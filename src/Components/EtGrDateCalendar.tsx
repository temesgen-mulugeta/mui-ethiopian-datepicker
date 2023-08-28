import { Box, Divider } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

import { useContext } from "react";
import EthiopianDateCalendar from "./EthiopianDateCalendar";
import { EtDatePickerContext } from "../EtDatePickerContext";
import React from "react";

const EtGrDateCalendar = () => {
  const etDatePickerContext = useContext(EtDatePickerContext);
  const { value, onDateChange, disableFuture, disablePast, minDate, maxDate } =
    etDatePickerContext;

  return (
    <Box sx={{ width: 600 }}>
      <Box display={"flex"}>
        <Box width={295}>
          <EthiopianDateCalendar />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box width={295}>
          <DateCalendar
            monthsPerRow={3}
            value={value ?? undefined}
            onChange={(date) => {
              if (date && date instanceof Date) onDateChange(date);
            }}
            sx={{ mr: 1 }}
            disableFuture={disableFuture}
            disablePast={disablePast}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EtGrDateCalendar;
