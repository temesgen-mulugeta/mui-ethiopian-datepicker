import { ButtonBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { DateType, EthiopianDate } from "../../../model/EthiopianDate";
import { format } from "date-fns";

type EtDateViewerProps = {
  date: Date;
};

const EtDateViewer: React.FC<EtDateViewerProps> = ({ date }) => {
  const [dateType, setDateType] = useState<DateType>("EC");

  const handleDateTypeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newDateType = dateType === "GC" ? "EC" : "GC";
    setDateType(newDateType);
    event.stopPropagation();
  };

  return (
    <Stack direction="row" spacing={0.7}>
      <ButtonBase onClick={handleDateTypeChange}>
        <Typography fontWeight={700} color="primary">
          {dateType}
        </Typography>
      </ButtonBase>
      <Typography>
        {dateType === "GC"
          ? format(date, "dd/MMM/yyyy")
          : EthiopianDate.formatEtDate(EthiopianDate.toEth(date))}
      </Typography>
    </Stack>
  );
};

export default EtDateViewer;
