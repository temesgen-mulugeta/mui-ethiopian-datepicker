import {
  ButtonBase,
  IconButton,
  InputAdornment,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import React from "react";

import format from "date-fns/format";
import { EventOutlined } from "@mui/icons-material";
import { EtDatePickerProvider } from "./EtDatePickerContext";
import { DateType, EthiopianDate } from "./util/EthiopianDateUtils";
import { DatePicker } from "@mui/x-date-pickers";
import EtGrDateCalendar from "./Components/EtGrDateCalendar";
import { useEtLocalization } from "./EtLocalizationProvider";

type CustomFieldProps = Omit<
  React.ComponentProps<typeof TextField>,
  "onChange" | "value" | "InputProps"
>;

export type EtDateFieldProps = Pick<
  React.ComponentProps<typeof DatePicker>,
  "disablePast" | "disableFuture"
> & { minDate?: Date; maxDate?: Date };

type EtDatePickerProps = {
  onClick?: () => void;
  value?: Date | null;
  onChange?: (date: Date) => void;
} & CustomFieldProps &
  EtDateFieldProps;
const EtDatePicker: React.FC<EtDatePickerProps> = ({
  onClick,
  value,
  onChange,
  ...props
}) => {
  const { localType, getLocalMonthName } = useEtLocalization();
  const [dateType, setDateType] = useState<DateType>(localType);
  const [date, setDate] = useState<Date>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (newDate: Date) => {
    onChange?.(newDate);
    if (newDate) {
      if (
        !(
          newDate.getFullYear() !== date?.getFullYear() &&
          newDate.getDate() === date?.getDate() &&
          newDate.getMonth() === date?.getMonth()
        )
      ) {
        setAnchorEl(null);
      }
      setDate(newDate);
    }
  };

  const handleDateTypeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newDateType = dateType === "EN" ? localType : "EN";
    setDateType(newDateType ?? "EN");
    event.stopPropagation();
  };

  const { disableSwitcher } = useEtLocalization();

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  return (
    <>
      <TextField
        {...props}
        value={
          date
            ? dateType === "EN"
              ? format(date, "dd/MMM/yyyy")
              : EthiopianDate.formatEtDate(
                  EthiopianDate.toEth(date),
                  localType,
                  getLocalMonthName
                )
            : "-"
        }
        InputProps={{
          onClick: props.disabled
            ? undefined
            : (event) => {
                handleClick(event);
              },
          startAdornment: disableSwitcher ? undefined : (
            <InputAdornment position="start">
              <ButtonBase onClick={handleDateTypeChange}>
                <Typography fontWeight={700} color="primary">
                  {dateType === "CUSTOM" ? "CU" : dateType}
                </Typography>
              </ButtonBase>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick} disabled={props.disabled}>
                <EventOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <EtDatePickerProvider
          onChange={handleDateChange}
          disableFuture={props.disableFuture}
          disablePast={props.disablePast}
          minDate={props.minDate}
          maxDate={props.maxDate}
          value={date}
        >
          <EtGrDateCalendar />
        </EtDatePickerProvider>
      </Menu>
    </>
  );
};

export default EtDatePicker;
