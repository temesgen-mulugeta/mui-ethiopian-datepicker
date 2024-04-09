import React, { useState, createContext, ReactNode, useEffect } from "react";
import { EtDateFieldProps } from "./EtDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { set } from "date-fns";

type EtDatePickerContextType = {
  value?: Date;
  monthValue?: Date;
  gregDate?: Date;
  setGregDate: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  onDateChange: (date: Date) => void;
} & EtDateFieldProps;

const EtDatePickerContext = createContext<EtDatePickerContextType>({
  value: new Date(),
  monthValue: new Date(),
  gregDate: new Date(),
  setGregDate: (date: Date) => {},
  onMonthChange: (date: Date) => {},
  onDateChange: (date: Date) => {},
});

type EtDatePickerProviderProps = {
  children: ReactNode;
  onChange?: (date: Date) => void;

  value?: Date;
} & EtDateFieldProps;

const EtDatePickerProvider: React.FC<EtDatePickerProviderProps> = ({
  children,
  onChange,
  value,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
}) => {
  const [date, setDate] = useState<Date>();
  const [monthValue, setMonthValue] = useState<Date>();
  const [gregDate, setGregDate] = useState<Date>();

  const onDateChange = (date: Date) => {
    setDate(date);
    onChange?.(date);
  };

  const onMonthChange = (date: Date) => {
    setMonthValue(date);
  };

  useEffect(() => {
    if (value) {
      setDate(value);
      setGregDate(value);
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <EtDatePickerContext.Provider
        value={{
          value: date ?? undefined,
          monthValue: monthValue,
          gregDate: gregDate,
          setGregDate,
          onMonthChange,
          onDateChange,
          disableFuture,
          disablePast,
          minDate,
          maxDate,
        }}
      >
        {children}
      </EtDatePickerContext.Provider>
    </LocalizationProvider>
  );
};

export { EtDatePickerProvider, EtDatePickerContext };
