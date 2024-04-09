import { Box, Button, Divider } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

import { useContext, useEffect, useState } from "react";
import EthiopianDateCalendar from "./EthiopianDateCalendar";
import { EtDatePickerContext } from "../EtDatePickerContext";
import React from "react";

const EtGrDateCalendar = () => {
  const etDatePickerContext = useContext(EtDatePickerContext);
  const {
    onDateChange,
    disableFuture,
    disablePast,
    minDate,
    maxDate,
    onMonthChange,
    gregDate,
    setGregDate,
  } = etDatePickerContext;

  const gregDateValue = gregDate?.toLocaleDateString();

  const [gregDatePicker, setGregDatePicker] = useState<Date | null>(null);

  useEffect(() => {
    if (gregDateValue) {
      const value = new Date(gregDateValue);
      setGregDatePicker(value);
    }
  }, [gregDateValue]);

  const handleTodayButtonClick = () => {
    onDateChange(new Date());
  };

  return (

    <Box sx={{ minWidth: 610 }}>

      <Box display={"flex"}>
        <Box width={295} display="flex" flexDirection="column">
          <EthiopianDateCalendar />

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Button sx={{ ml: 2 }} onClick={handleTodayButtonClick}>
              Today
            </Button>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box width={295}>

        <Box width={295} pr={4}>

          <DateCalendar
            monthsPerRow={3}
            value={gregDatePicker}
            onChange={(date) => {
              if (date && date instanceof Date) onDateChange(date);
            }}
            disableFuture={disableFuture}
            onMonthChange={(date) => {
              const newDate = new Date(date);
              newDate.setDate(gregDate?.getDate() ?? 15);
              onMonthChange(newDate);
              setGregDate(newDate);
            }}
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
