import React from "react";
import { DateType } from "./util/EthiopianDateUtils";
type EtDateViewerProps = {
    date: Date;
    initialDateType?: DateType;
};
declare const EtDateViewer: React.FC<EtDateViewerProps>;
export default EtDateViewer;
