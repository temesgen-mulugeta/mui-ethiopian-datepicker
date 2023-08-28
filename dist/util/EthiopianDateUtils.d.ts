export type DateType = "EC" | "GC";
export declare namespace EthiopianDate {
    const shortDays: string[];
    const longDays: string[];
    const ethMonths: string[];
    interface EtDate {
        Day: number;
        Month: number;
        Year: number;
    }
    function createEthiopianDateFromParts(d: number, m: number, y: number): EtDate;
    function isLeapYearEt(y: number): boolean;
    function ethiopianMonthLength(m: number, y: number): number;
    function getDayNoEthiopian(etDate: EtDate): number;
    function getEtMonthStartDate(Month: number, Year: number): number;
    function grigorianDateFromDayNo(dayNum: number): Date;
    function createEthiopianDate(dn: number): EtDate;
    function getDayNoGrigorian(date: Date): number;
    function toEth(dt: Date): EtDate;
    function toGreg(et: EtDate): Date;
    function formatEtDate(dt: EtDate): string;
    function getEtMonthName(m: number): string;
    function getDayOfWeekNameEt(d: number): string;
    function toNamedMonthStringFromEtDate(et: EtDate): string;
    function isValid(date: EtDate): boolean;
    function addYears(etDate: EtDate, years: number): EtDate;
    function addDays(etDate: EtDate, days: number): EtDate;
    function ethiopianYearDifference(d1: Date, d2: Date, upperBoundInclusive: boolean): number;
    function fullEthiopianYearDifference(d1: Date, d2: Date, upperBoundInclusive: boolean): {
        years: number;
        remainder: number;
    };
    function compareDates(date1: EtDate, date2: EtDate): number;
}
