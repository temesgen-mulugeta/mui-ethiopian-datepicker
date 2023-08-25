import React, { useState, createContext, ReactNode, useEffect } from "react";
import { EtDateFieldProps } from "./EtDatePicker";

type EtDatePickerContextType = {
  value: Date;
  onDateChange: (date: Date) => void;
} & EtDateFieldProps;

const EtDatePickerContext = createContext<EtDatePickerContextType>({
  value: new Date(),
  onDateChange: (date) => {},
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
  const [date, setDate] = useState<Date>(new Date());

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
    <EtDatePickerContext.Provider
      value={{ value: date, onDateChange, disableFuture, disablePast, minDate, maxDate }}
    >
      {children}
    </EtDatePickerContext.Provider>
  );
};

export { EtDatePickerProvider, EtDatePickerContext };
