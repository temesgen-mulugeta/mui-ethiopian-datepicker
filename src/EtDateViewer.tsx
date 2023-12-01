import { ButtonBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";
import { DateType, EthiopianDate } from "./util/EthiopianDateUtils";
import { useEtLocalization } from "./EtLocalizationProvider";

type EtDateViewerProps = {
  date: Date;
  initialDateType?: DateType;
  disableSwitcher?: boolean;
};

const EtDateViewer: React.FC<EtDateViewerProps> = ({
  date,
  initialDateType,
  disableSwitcher,
}) => {
  const [dateType, setDateType] = useState<DateType>(initialDateType ?? "AMH");
  const { localType, getLocalMonthName } = useEtLocalization();
  const handleDateTypeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newDateType = dateType === "EN" ? localType : "EN";
    setDateType(newDateType ?? "EN");
    event.stopPropagation();
  };

  return (
    <Stack direction="row" spacing={0.7}>
      {!disableSwitcher && (
        <ButtonBase onClick={handleDateTypeChange}>
          <Typography fontWeight={700} color="primary">
            {localType === "CUSTOM" ? "CU" : localType}
          </Typography>
        </ButtonBase>
      )}
      <Typography>
        {localType === "EN"
          ? format(date, "MMM dd/yyyy")
          : EthiopianDate.formatEtDate(
              EthiopianDate.toEth(date),
              localType ?? "AMH",
              getLocalMonthName
            )}
      </Typography>
    </Stack>
  );
};

export default EtDateViewer;
