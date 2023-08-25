import { Grid, Chip, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { EthiopianDate } from "../../../../model/EthiopianDate";

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
  const CURRENT_YEAR = startYear ?? EthiopianDate.toEth(new Date()).Year;
  const START_YEAR = CURRENT_YEAR - (yearRange ?? 100);
  const currentYearRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, []);

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
        {Array.from({ length: 201 }, (_, index) => START_YEAR + index).map(
          (year) => (
            <Grid
              item
              xs={4}
              key={year}
              style={{ display: "flex", justifyContent: "center" }}
              ref={year === CURRENT_YEAR ? currentYearRef : null}
            >
              <Chip
                label={year}
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
          )
        )}
      </Grid>
    </Box>
  );
};

export default EthiopianYearList;
