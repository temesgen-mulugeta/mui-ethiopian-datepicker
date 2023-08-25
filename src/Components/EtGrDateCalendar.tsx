import { Box, Divider } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

import { useContext } from "react";
import EthiopianDateCalendar from "./EthiopianDateCalendar";
import { EtDatePickerContext } from "../EtDatePickerContext";

const EtGrDateCalendar = () => {
  const etDatePickerContext = useContext(EtDatePickerContext);
  const { value, onDateChange, disableFuture } = etDatePickerContext;

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
            value={value}
            onChange={(date) => {
              if (date) onDateChange(date);
            }}
            
            sx={{ mr: 1 }}
            disableFuture={disableFuture}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EtGrDateCalendar;
