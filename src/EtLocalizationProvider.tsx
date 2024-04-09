import React, { createContext, useContext, useState, ReactNode } from "react";
import { DateType } from "./util/EthiopianDateUtils";

type LocalizationContextProps = {
  localType: DateType;
  setLocalType: React.Dispatch<React.SetStateAction<DateType>>;
  getLocalMonthName?: (month: number) => string;
};

const defaultState: LocalizationContextProps = {
  localType: "AMH",
  setLocalType: () => {},
};

const EtLocalizationContext =
  createContext<LocalizationContextProps>(defaultState);

export type LocalizationProviderProps = {
  children: ReactNode;
  locale?: DateType;
  getLocalMonthName?: (month: number) => string;
};

export const EtLocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  locale = "AMH",
  getLocalMonthName,
}) => {
  const [localType, setLocalType] = useState<DateType>(locale);

  return (
    <EtLocalizationContext.Provider
      value={{ localType, setLocalType, getLocalMonthName }}
    >
      {children}
    </EtLocalizationContext.Provider>
  );
};

export const useEtLocalization = () => {
  const context = useContext(EtLocalizationContext);

  if (context) return context;
  const local: DateType = "AMH";
  return { localType: local, getLocalMonthName: (m: number) => "" };
};
