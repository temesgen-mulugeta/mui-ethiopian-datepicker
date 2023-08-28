import React, { useState, createContext, ReactNode, useEffect } from "react";
import { EtDateFieldProps } from "./EtDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type EtDatePickerContextType = {
  value?: Date;
  onDateChange: (date: Date) => void;
} & EtDateFieldProps;

const EtDatePickerContext = createContext<EtDatePickerContextType>({
  value: new Date(),
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

  const onDateChange = (date: Date) => {
    setDate(date);
    onChange?.(date);
  };

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <EtDatePickerContext.Provider
        value={{
          value: date ?? undefined,
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
