import { Grid, Chip, Box } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { EthiopianDate } from "../util/EthiopianDateUtils";
import { EtDatePickerContext } from "../EtDatePickerContext";

type EthiopianYearListProps = {
  startYear?: number;
  yearRange?: number;
  onYearClick: (year: number) => void;
};

const EthiopianYearList: React.FC<EthiopianYearListProps> = ({
  startYear,
  yearRange,
  onYearClick,
}) => {
  const { onDateChange, value, disableFuture, disablePast, minDate, maxDate } =
    useContext(EtDatePickerContext);
  const CURRENT_YEAR = startYear ?? EthiopianDate.toEth(new Date()).Year;
  const START_YEAR = minDate
    ? EthiopianDate.toEth(minDate).Year
    : CURRENT_YEAR - (yearRange ?? 100);
  const END_YEAR = maxDate
    ? EthiopianDate.toEth(maxDate).Year
    : yearRange
    ? START_YEAR + yearRange
    : START_YEAR + 201;

  console.log(START_YEAR);
  console.log(END_YEAR);

  const currentYearRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, []);

  const isDisabled = (year: number) => {
    if (disablePast && year < CURRENT_YEAR) {
      return true;
    }
    if (disableFuture && year > CURRENT_YEAR) {
      return true;
    }
    if (minDate && year < EthiopianDate.toEth(minDate).Year) {
      return true;
    }
    if (maxDate && year > EthiopianDate.toEth(maxDate).Year) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        overflowY: "scroll",
        maxHeight: "270px",
        scrollbarWidth: "1px",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Grid container spacing={2}>
        {Array.from(
          { length: END_YEAR - START_YEAR + 1 },
          (_, index) => START_YEAR + index
        ).map((year) => (
          <Grid
            item
            xs={4}
            key={year}
            style={{ display: "flex", justifyContent: "center" }}
            ref={year === CURRENT_YEAR ? currentYearRef : null}
          >
            <Chip
              label={year}
              disabled={isDisabled(year)}
              sx={{
                backgroundColor:
                  year === CURRENT_YEAR ? "primary.dark" : "transparent",
                color: year === CURRENT_YEAR ? "white" : "default",
                fontSize: "16px",
                p: 1,
              }}
              onClick={() => onYearClick(year)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EthiopianYearList;
