import { ButtonBase, Stack, Typography, TypographyProps } from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";
import { DateType, EthiopianDate } from "./util/EthiopianDateUtils";
import { useEtLocalization } from "./EtLocalizationProvider";

type EtDateViewerProps = {
  date: Date;
  initialDateType?: DateType;
  disableSwitcher?: boolean;
  showTime?: boolean;
} & TypographyProps;

const EtDateViewer: React.FC<EtDateViewerProps> = ({
  date,
  initialDateType,
  disableSwitcher,
  showTime,
  ...props
}) => {
  const { localType, getLocalMonthName } = useEtLocalization();
  const [dateType, setDateType] = useState<DateType>(
    initialDateType ?? localType
  );

  const handleDateTypeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newDateType = dateType === "EN" ? localType : "EN";

    setDateType(newDateType ?? "EN");
  };

  const { disableSwitcher: disableSwitch } = useEtLocalization();
  return (
    <Stack direction="row" spacing={0.7}>
      {!disableSwitcher && !disableSwitch && (
        <ButtonBase onClick={handleDateTypeChange}>
          <Typography fontWeight={700} color="primary" {...props}>
            {dateType === "CUSTOM" ? "CU" : dateType}
          </Typography>
        </ButtonBase>
      )}
      <Typography {...props}>
        {showTime
          ? dateType === "EN"
            ? `${format(date, "MMM dd/yyyy")} ${format(date, "hh:mm a")}`
            : EthiopianDate.formatEtDate(
                EthiopianDate.toEth(date),
                dateType ?? localType,
                getLocalMonthName,
                date.getTime()
              )
          : dateType === "EN"
          ? format(date, "MMM dd/yyyy")
          : EthiopianDate.formatEtDate(
              EthiopianDate.toEth(date),
              dateType ?? localType,
              getLocalMonthName
            )}
      </Typography>
    </Stack>
  );
};

export default EtDateViewer;
