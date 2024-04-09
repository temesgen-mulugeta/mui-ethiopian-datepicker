import {
  ArrowDropDown,
  ArrowDropUp,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import EthiopianYearList from "./EthiopianYearList";
import EthiopianDaysList from "./EthiopianDaysList";
import { EtDatePickerContext } from "../EtDatePickerContext";
import { EthiopianDate } from "../util/EthiopianDateUtils";
import { useEtLocalization } from "../EtLocalizationProvider";

const EthiopianDateCalendar = () => {
  const { value, monthValue, setGregDate, gregDate } =
    useContext(EtDatePickerContext);
  const today = EthiopianDate.toEth(new Date());
  const [ethDate, setEthDate] = useState<EthiopianDate.EtDate>(today);
  const [showYearList, setShowYearList] = useState(false);

  const { localType, getLocalMonthName } = useEtLocalization();

  const incrementMonth = () => {
    const gDate = EthiopianDate.toGreg({ ...ethDate, Day: 15 });

    if (ethDate.Month === 13) {
      setEthDate({ ...ethDate, Month: 1, Year: ethDate.Year + 1, Day: 15 });
      if (!gregDate)
        return setGregDate(
          EthiopianDate.toGreg({
            ...ethDate,
            Month: 1,
            Year: ethDate.Year + 1,
          })
        );

      if (gregDate.getMonth() === 8) {
        const newDate: Date = new Date(gregDate);
        newDate.setMonth(newDate.getMonth());
        setGregDate(newDate);
        return;
      }
      const newDate: Date = new Date(gregDate);
      newDate.setMonth(newDate.getMonth() + 1);

      setGregDate(newDate);
    } else {
      setEthDate((prev: EthiopianDate.EtDate) => ({
        ...prev,
        Month: prev.Month + 1,
        Day: 15,
      }));
      if (ethDate.Month === 12) {
        if (!gregDate) return setGregDate(EthiopianDate.toGreg({ ...ethDate }));
        const newDate: Date = new Date(gregDate);
        newDate.setMonth(newDate.getMonth());
        setGregDate(newDate);
      } else {
        if (!gregDate)
          return setGregDate(
            EthiopianDate.toGreg({
              ...ethDate,
              Month: ethDate.Month + 1,
              Day: 15,
            })
          );

        if (
          gDate.getFullYear() < gregDate.getFullYear() ||
          (gDate.getFullYear() === gregDate.getFullYear() &&
            gDate.getMonth() < gregDate.getMonth())
        )
          return;

        const newDate: Date = new Date(gregDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setGregDate(newDate);
      }
    }
  };

  const decrementMonth = () => {
    if (ethDate.Month === 1) {
      setEthDate({ ...ethDate, Year: ethDate.Year - 1, Month: 13 });
      if (!gregDate) return setGregDate(EthiopianDate.toGreg({ ...ethDate }));
      const newDate: Date = new Date(gregDate);
      newDate.setMonth(newDate.getMonth());
      setGregDate(newDate);
    } else {
      if (!gregDate)
        return setGregDate(
          EthiopianDate.toGreg({
            ...ethDate,
            Month: ethDate.Month - 1,
          })
        );
      if (gregDate.getMonth() === 7 && ethDate.Month === 13) {
        const newDate: Date = new Date(gregDate);
        newDate.setMonth(newDate.getMonth());
        setGregDate(newDate);
        setEthDate((prev) => ({ ...prev, Month: prev.Month - 1 }));
        return;
      }

      const gDate = EthiopianDate.toGreg({ ...ethDate, Day: 15 });

      if (
        gDate.getFullYear() < gregDate.getFullYear() ||
        (gDate.getFullYear() === gregDate.getFullYear() &&
          gDate.getMonth() < gregDate.getMonth())
      ) {
        const newDate: Date = new Date(gregDate);
        newDate.setMonth(newDate.getMonth() - 2);
        setGregDate(newDate);
        setEthDate((prev) => ({ ...prev, Month: prev.Month }));
        return;
      }

      const newDate: Date = new Date(gregDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setGregDate(newDate);
    }
  };

  useEffect(() => {
    if (value) {
      setEthDate(EthiopianDate.toEth(value));
    }
  }, [value]);

  useEffect(() => {
    if (!monthValue) return;

    const convertedDate = EthiopianDate.toGreg({ ...ethDate });
    const convertedMonth = convertedDate.getMonth();
    const convertedYear = convertedDate.getFullYear();

    const targetMonth = monthValue.getMonth();
    const targetYear = monthValue.getFullYear();

    const dateDifference = Math.abs(
      monthValue.getMonth() -
        EthiopianDate.toGreg({ ...ethDate, Day: 15 }).getMonth()
    );

    const isAfter =
      targetYear > convertedYear ||
      (targetYear === convertedYear && targetMonth > convertedMonth);

    const isBefore =
      targetYear < convertedYear ||
      (targetYear === convertedYear && targetMonth < convertedMonth);

    if (isAfter) {
      if (ethDate.Month === 12 || ethDate.Month === 13) {
        setEthDate({ ...ethDate, Month: 1, Year: ethDate.Year + 1 });
      } else {
        if (dateDifference === 2 || dateDifference === 10) {
          setEthDate((prev) => ({ ...prev, Month: prev.Month + 2, Day: 15 }));
          return;
        }
        setEthDate((prev) => ({ ...prev, Month: prev.Month + 1 }));
      }
    } else if (isBefore) {
      if (ethDate.Month === 1) {
        setEthDate({ ...ethDate, Year: ethDate.Year - 1, Month: 12 });
      } else {
        if (dateDifference === 0) {
          setEthDate((prev) => ({ ...prev, Month: prev.Month, Day: 15 }));
          return;
        }
        setEthDate((prev) => ({ ...prev, Month: prev.Month - 1 }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthValue]);

  return (
    <Box mx={2}>
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-between"
        m={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => setShowYearList(!showYearList)}
        >
          <Typography>{`${EthiopianDate.getEtMonthName(
            ethDate.Month,
            localType,
            getLocalMonthName
          )} ${ethDate.Year}`}</Typography>
          <IconButton size="small">
            {showYearList ? <ArrowDropUp /> : <ArrowDropDown />}
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
              setGregDate(
                EthiopianDate.toGreg({ ...ethDate, Year: selectedYear })
              );
              setShowYearList(false);
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
