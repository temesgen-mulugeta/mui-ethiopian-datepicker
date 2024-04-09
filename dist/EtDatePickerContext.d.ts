import React, { ReactNode } from "react";
import { EtDateFieldProps } from "./EtDatePicker";
type EtDatePickerContextType = {
    value?: Date;
    monthValue?: Date;
    gregDate?: Date;
    setGregDate: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    onDateChange: (date: Date) => void;
} & EtDateFieldProps;
declare const EtDatePickerContext: React.Context<EtDatePickerContextType>;
type EtDatePickerProviderProps = {
    children: ReactNode;
    onChange?: (date: Date) => void;
    value?: Date;
} & EtDateFieldProps;
declare const EtDatePickerProvider: React.FC<EtDatePickerProviderProps>;
export { EtDatePickerProvider, EtDatePickerContext };
