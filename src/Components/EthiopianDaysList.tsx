import { Box, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { EthiopianDate } from "../../../../model/EthiopianDate";
import { EtDatePickerContext } from "../EtDatePickerContext";

type EthiopianDaysListProps = {
  month: number;
  year: number;
};

const EthiopianDaysList: React.FC<EthiopianDaysListProps> = ({
  month,
  year,
}) => {
  const cellSize = "36px";
  const gap = 0.5;
  const days = EthiopianDate.shortDays;
  const today = EthiopianDate.toEth(new Date());
  const { onDateChange, value, disableFuture } =
    useContext(EtDatePickerContext);

  const [selectedDate, setSelectedDate] = useState<EthiopianDate.EtDate | null>(
    EthiopianDate.toEth(value)
  );

  const getEtDate = (day: number): EthiopianDate.EtDate => {
    return { Day: day, Month: month, Year: year };
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
              disabled={disableFuture && index + 1 > today.Day}
              onClick={() => {
                setSelectedDate(getEtDate(index + 1));
                const etDate = EthiopianDate.createEthiopianDateFromParts(
                  index + 1,
                  month,
                  year
                );
                const grDate = EthiopianDate.toJsDate(etDate);
                onDateChange(grDate);
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
