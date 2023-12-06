import { TypographyProps } from "@mui/material";
import React from "react";
import { DateType } from "./util/EthiopianDateUtils";
type EtDateViewerProps = {
    date: Date;
    initialDateType?: DateType;
    disableSwitcher?: boolean;
} & TypographyProps;
declare const EtDateViewer: React.FC<EtDateViewerProps>;
export default EtDateViewer;
