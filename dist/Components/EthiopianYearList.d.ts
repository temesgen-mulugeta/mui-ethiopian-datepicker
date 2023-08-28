import React from "react";
type EthiopianYearListProps = {
    startYear?: number;
    yearRange?: number;
    onYearClick: (year: number) => void;
};
declare const EthiopianYearList: React.FC<EthiopianYearListProps>;
export default EthiopianYearList;
