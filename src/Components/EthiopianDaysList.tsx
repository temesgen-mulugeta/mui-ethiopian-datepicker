import { Box, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { EtDatePickerContext } from "../EtDatePickerContext";
import { EthiopianDate } from "../util/EthiopianDateUtils";
import { useEtLocalization } from "../EtLocalizationProvider";

type EthiopianDaysListProps = {
  month: number;
  year: number;
};

const EthiopianDaysList: React.FC<EthiopianDaysListProps> = ({
  month,
  year,
}) => {
  const { localType } = useEtLocalization();
  const cellSize = "36px";
  const gap = 0.5;
  const days =
    localType === "AMH" || localType === "EN"
      ? EthiopianDate.shortDays
      : EthiopianDate.englishShortDays;
  const today = EthiopianDate.toEth(new Date());
  const {
    onDateChange,
    setGregDate,
    value,
    disableFuture,
    disablePast,
    minDate,
    maxDate,
  } = useContext(EtDatePickerContext);

  const [selectedDate, setSelectedDate] = useState<EthiopianDate.EtDate | null>(
    value ? EthiopianDate.toEth(value) : null
  );

  const getEtDate = (day: number): EthiopianDate.EtDate => {
    return { Day: day, Month: month, Year: year };
  };

  const isDisabled = (day: number): boolean => {
    const date = EthiopianDate.createEthiopianDateFromParts(day, month, year);
    if (disableFuture && EthiopianDate.compareDates(today, date) === -1) {
      return true;
    }
    if (disablePast && EthiopianDate.compareDates(today, date) === 1) {
      return true;
    }
    if (
      minDate &&
      (minDate instanceof Date || Boolean(new Date(minDate as string))) &&
      EthiopianDate.compareDates(
        EthiopianDate.toEth(
          minDate instanceof Date ? minDate : new Date(minDate as string)
        ),
        date
      ) === 1
    ) {
      return true;
    }
    if (
      maxDate &&
      (maxDate instanceof Date || Boolean(new Date(maxDate as string))) &&
      EthiopianDate.compareDates(
        EthiopianDate.toEth(
          maxDate instanceof Date ? maxDate : new Date(maxDate as string)
        ),
        date
      ) === -1
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (value) setSelectedDate(EthiopianDate.toEth(value));
  }, [value]);

  const isSelectedDate = (day: number): boolean => {
    return (
      day === selectedDate?.Day &&
      month === selectedDate?.Month &&
      year === selectedDate?.Year
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(7, ${cellSize})`,
          gap: gap,
          justifyContent: "center",
          alignItems: "center",
          mb: 1,
        }}
      >
        {days.map((day, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              justifySelf: "center",
              alignSelf: "center",
              color: "grey",
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(7, ${cellSize})`,
          gap: gap,
        }}
      >
        {Array.from(
          {
            length: EthiopianDate.ethiopianMonthLength(month, year),
          },
          (_, index) => (
            <IconButton
              key={index}
              disabled={isDisabled(index + 1)}
              onClick={() => {
                setSelectedDate(getEtDate(index + 1));
                const etDate = EthiopianDate.createEthiopianDateFromParts(
                  index + 1,
                  month,
                  year
                );
                const grDate = EthiopianDate.toGreg(etDate);
                onDateChange(grDate);
                setGregDate(grDate);
              }}
              sx={{
                width: cellSize,
                height: cellSize,
                backgroundColor: isSelectedDate(index + 1)
                  ? "primary.dark"
                  : "transparent",
                border:
                  index + 1 === today.Day &&
                  month === today.Month &&
                  year === today.Year &&
                  !isSelectedDate(index + 1)
                    ? "1px solid grey"
                    : "none",
                gridColumn:
                  index === 0
                    ? EthiopianDate.getEtMonthStartDate(month, year)
                    : undefined,
                color: isSelectedDate(index + 1) ? "white" : "black",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: isSelectedDate(index + 1)
                    ? "primary.dark"
                    : undefined,
                },
              }}
            >
              {index + 1}
            </IconButton>
          )
        )}
      </Box>
    </>
  );
};

export default EthiopianDaysList;
