import {
  ButtonBase,
  IconButton,
  InputAdornment,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import EtGrDateCalendar from "./Components/EtGrDateCalendar";
import React from "react";
import { DateType, EthiopianDate } from "../../../model/EthiopianDate";
import format from "date-fns/format";
import { EventOutlined } from "@mui/icons-material";
import { EtDatePickerProvider } from "./EtDatePickerContext";

type EtDatePickerProps = {
  onClick?: () => void;
  value?: Date;
  onChange?: (date: Date) => void;
  onChangeDateType?: (dateType: DateType) => void;
  disableFuture?: boolean;
};

type CustomFieldProos = Omit<
  React.ComponentProps<typeof TextField>,
  "onChange" | "value" | "InputProps"
>;

const EtDatePicker: React.FC<EtDatePickerProps & CustomFieldProos> = ({
  onClick,
  onChangeDateType,
  value,
  onChange,
  disableFuture,
  ...props
}) => {
  const [dateType, setDateType] = useState<DateType>("EC");
  const [date, setDate] = useState<Date>(new Date());

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

    if (
      !(
        newDate.getFullYear() !== date.getFullYear() &&
        newDate.getDate() === date.getDate() &&
        newDate.getMonth() === date.getMonth()
      )
    ) {
      setAnchorEl(null);
    }
    setDate(newDate);
  };

  const handleDateTypeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newDateType = dateType === "GC" ? "EC" : "GC";
    setDateType(newDateType);
    onChangeDateType?.(newDateType);
    event.stopPropagation();
  };

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
          dateType === "GC"
            ? format(date, "dd/MMM/yyyy")
            : EthiopianDate.formatEtDate(EthiopianDate.toEth(date))
        }
        InputProps={{
          onClick: (event) => {
            handleClick(event);
          },
          startAdornment: (
            <InputAdornment position="start">
              <ButtonBase onClick={handleDateTypeChange}>
                <Typography fontWeight={700} color="primary">
                  {dateType}
                </Typography>
              </ButtonBase>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
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
          disableFuture={disableFuture}
          value={date}
        >
          <EtGrDateCalendar />
        </EtDatePickerProvider>
      </Menu>
    </>
  );
};

export default EtDatePicker;
