import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { DateType } from "./util/EthiopianDateUtils";

type LocalizationContextProps = {
  localType: DateType;
  setLocalType: React.Dispatch<React.SetStateAction<DateType>>;
  getLocalMonthName?: (month: number) => string;
  disableEt?: boolean;
  disableGregorian?: boolean;
  disableSwitcher?: boolean;
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
  disableEt?: boolean;
  disableGregorian?: boolean;
  disableSwitcher?: boolean;
};

export const EtLocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  locale = "AMH",
  getLocalMonthName,
  disableEt,
  disableGregorian,
  disableSwitcher,
}) => {
  const [localType, setLocalType] = useState<DateType>(locale);

  useEffect(() => {
    setLocalType(locale);
  }, [locale]);

  return (
    <EtLocalizationContext.Provider
      value={{
        localType,
        setLocalType,
        getLocalMonthName,
        disableEt,
        disableGregorian,
        disableSwitcher,
      }}
    >
      {children}
    </EtLocalizationContext.Provider>
  );
};

export const useEtLocalization = () => {
  const context = useContext(EtLocalizationContext);

  if (context) return context;
  const local: DateType = "AMH";
  return {
    localType: local,
    getLocalMonthName: (m: number) => "",
    disableEt: false,
    disableGregorian: false,
    disableSwitcher: false,
  };
};
