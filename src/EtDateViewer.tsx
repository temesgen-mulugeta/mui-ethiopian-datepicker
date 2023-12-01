import { ButtonBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";
import { DateType, EthiopianDate } from "./util/EthiopianDateUtils";
import { useEtLocalization } from "./EtLocalizationProvider";

type EtDateViewerProps = {
  date: Date;
  initialDateType?: DateType;
};

const EtDateViewer: React.FC<EtDateViewerProps> = ({
  date,
  initialDateType,
}) => {
  const [dateType, setDateType] = useState<DateType>(initialDateType ?? "AMH");
  const { localType, getLocalMonthName } = useEtLocalization();
  const handleDateTypeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newDateType = dateType === "GC" ? localType : "GC";
    setDateType(newDateType);
    event.stopPropagation();
  };

  return (
    <Stack direction="row" spacing={0.7}>
      <ButtonBase onClick={handleDateTypeChange}>
        <Typography fontWeight={700} color="primary">
          {dateType === "CUSTOM" ? "CU" : dateType}
        </Typography>
      </ButtonBase>
      <Typography>
        {dateType === "GC"
          ? format(date, "dd/MMM/yyyy")
          : EthiopianDate.formatEtDate(
              EthiopianDate.toEth(date),
              localType,
              getLocalMonthName
            )}
      </Typography>
    </Stack>
  );
};

export default EtDateViewer;
