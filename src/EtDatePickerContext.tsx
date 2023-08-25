import React, { useState, createContext, ReactNode, useEffect } from "react";

interface EtDatePickerContextType {
  value: Date;
  onDateChange: (date: Date) => void;
  disableFuture?: boolean;
}

const EtDatePickerContext = createContext<EtDatePickerContextType>({
  value: new Date(),
  onDateChange: (date) => {},
});

interface EtDatePickerProviderProps {
  children: ReactNode;
  onChange?: (date: Date) => void;
  disableFuture?: boolean;
  value?: Date;
}

const EtDatePickerProvider: React.FC<EtDatePickerProviderProps> = ({
  children,
  onChange,
  disableFuture,
  value,
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
      value={{ value: date, onDateChange, disableFuture }}
    >
      {children}
    </EtDatePickerContext.Provider>
  );
};

export { EtDatePickerProvider, EtDatePickerContext };
