import { ArrowDropDown, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import EthiopianYearList from "./EthiopianYearList";
import EthiopianDaysList from "./EthiopianDaysList";
import { EtDatePickerContext } from "../EtDatePickerContext";
import { EthiopianDate } from "../util/EthiopianDateUtils";

const EthiopianDateCalendar = () => {
  const { onDateChange, value } = useContext(EtDatePickerContext);
  const today = EthiopianDate.toEth(new Date());
  const [ethDate, setEthDate] = useState<EthiopianDate.EtDate>(today);
  const [showYearList, setShowYearList] = useState(false);

  const incrementMonth = () => {
    if (ethDate.Month === 13) {
      setEthDate({ ...ethDate, Month: 1, Year: ethDate.Year + 1 });
    } else {
      setEthDate((prev: EthiopianDate.EtDate) => ({
        ...prev,
        Month: prev.Month + 1,
      }));
    }
  };

  const decrementMonth = () => {
    if (ethDate.Month === 1) {
      setEthDate({ ...ethDate, Year: ethDate.Year - 1 });
    }
    setEthDate((prev) => ({ ...prev, Month: prev.Month - 1 }));
  };

  useEffect(() => {
    if (value) {
      setEthDate(EthiopianDate.toEth(value));
    }
  }, [value]);

  return (
    <Box mx={2}>
      <Stack direction="row" justifyContent="space-between" m={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{`${EthiopianDate.getEtMonthName(ethDate.Month)} ${
            ethDate.Year
          }`}</Typography>
          <IconButton
            size="small"
            onClick={() => setShowYearList(!showYearList)}
          >
            <ArrowDropDown />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex" }}>
          <IconButton size="small" onClick={decrementMonth}>
            <ChevronLeft />
          </IconButton>
          <IconButton size="small" onClick={incrementMonth}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Stack>
      <Box>
        {showYearList ? (
          <EthiopianYearList
            onYearClick={(selectedYear) => {
              setEthDate({ ...ethDate, Year: selectedYear });
              setShowYearList(false);
              const etDate = EthiopianDate.createEthiopianDateFromParts(
                ethDate.Day,
                ethDate.Month,
                selectedYear
              );
              const grDate = EthiopianDate.toGreg(etDate);
              onDateChange(grDate);
            }}
            startYear={ethDate.Year}
          />
        ) : (
          <EthiopianDaysList month={ethDate.Month} year={ethDate.Year} />
        )}
      </Box>
    </Box>
  );
};

export default EthiopianDateCalendar;
