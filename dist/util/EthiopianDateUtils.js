"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthiopianDate = void 0;
const date_fns_1 = require("date-fns");
// export type EtLocal = "AMH" | "AO" | "CUSTOM";
var EthiopianDate;
(function (EthiopianDate) {
    EthiopianDate.shortDays = ["ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ", "እ"];
    EthiopianDate.englishShortDays = ["M", "T", "W", "T", "F", "S", "S"];
    EthiopianDate.longDays = ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "እሁድ"];
    EthiopianDate.ethMonths = [
        "መስከረም",
        "ጥቅምት",
        "ህዳር",
        "ታህሳስ",
        "ጥር",
        "የካቲት",
        "መጋቢት",
        "ሚያዚያ",
        "ግንቦት",
        "ሰኔ",
        "ሐምሌ",
        "ነሀሴ",
        "ጳጉሜ",
    ];
    EthiopianDate.AoMonths = [
        "Fulbaana",
        "Onkololeessa",
        "Sadaasa",
        "Muddee",
        "Amajji",
        "Guraadhanala",
        "Bitootesa",
        "Ebla",
        "Caamsaa",
        "Waxabajji",
        "Adoolessa",
        "Hagayya",
        "Qaammee",
    ];
    function createEthiopianDateFromParts(d, m, y) {
        return {
            Day: d,
            Month: m,
            Year: y,
        };
    }
    EthiopianDate.createEthiopianDateFromParts = createEthiopianDateFromParts;
    function isLeapYearEt(y) {
        return y % 4 === 3;
    }
    EthiopianDate.isLeapYearEt = isLeapYearEt;
    function ethiopianMonthLength(m, y) {
        if (m === 13) {
            return isLeapYearEt(y) ? 6 : 5;
        }
        return 30;
    }
    EthiopianDate.ethiopianMonthLength = ethiopianMonthLength;
    function isLeapYearGr(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    function getDayNoEthiopian(etDate) {
        let num = Math.floor(etDate.Year / 4);
        let num2 = etDate.Year % 4;
        return num * 1461 + num2 * 365 + (etDate.Month - 1) * 30 + etDate.Day - 1;
    }
    EthiopianDate.getDayNoEthiopian = getDayNoEthiopian;
    function grigorianMonthLength(index, year) {
        switch (index) {
            case 1: // January
            case 3: // March
            case 5: // May
            case 7: // July
            case 8: // August
            case 10: // October
            case 12: // December
                return 31;
            case 2: // February
                return isLeapYearGr(year) ? 29 : 28;
        }
        return 30; // April, June, September, November
    }
    function getEtMonthStartDate(Month, Year) {
        const grDate = toGreg({ Day: 1, Month, Year });
        return ((grDate.getUTCDay() || 7) % 7) + 1;
    }
    EthiopianDate.getEtMonthStartDate = getEtMonthStartDate;
    function grigorianDateFromDayNo(dayNum) {
        let year = 1, month = 1, day;
        let num400 = Math.floor(dayNum / 146097); // number of full 400-year periods
        dayNum %= 146097;
        if (dayNum === 0) {
            return new Date(400 * num400, 12 - 1, 31);
        }
        let num100 = Math.min(Math.floor(dayNum / 36524), 3); // number of full 100-year periods, but not more than 3
        dayNum -= num100 * 36524;
        if (dayNum === 0) {
            return new Date(400 * num400 + 100 * num100, 12 - 1, 31);
        }
        let num4 = Math.floor(dayNum / 1461); // number of full 4-year periods
        dayNum %= 1461;
        if (dayNum === 0) {
            return new Date(400 * num400 + 100 * num100 + 4 * num4, 12 - 1, 31);
        }
        let num1 = Math.min(Math.floor(dayNum / 365), 3); // number of full years, but not more than 3
        dayNum -= num1 * 365;
        if (dayNum === 0) {
            return new Date(400 * num400 + 100 * num100 + 4 * num4 + num1, 12 - 1, 31);
        }
        year += 400 * num400 + 100 * num100 + 4 * num4 + num1;
        while (true) {
            let daysInMonth = grigorianMonthLength(month, year);
            if (dayNum <= daysInMonth) {
                day = dayNum;
                break;
            }
            dayNum -= daysInMonth;
            month++;
        }
        // Remember in JavaScript Date object, months are 0-based.
        return new Date(year, month - 1, day);
    }
    EthiopianDate.grigorianDateFromDayNo = grigorianDateFromDayNo;
    function createEthiopianDate(dn) {
        let num;
        let num2;
        let num3;
        let num4;
        num = Math.floor(dn / 1461);
        num2 = dn % 1461;
        num3 = Math.floor(num2 / 365);
        num4 = num2 % 365;
        if (num2 !== 1460) {
            return {
                Year: num * 4 + num3,
                Month: Math.floor(num4 / 30) + 1,
                Day: (num4 % 30) + 1,
            };
        }
        else {
            return {
                Year: num * 4 + num3 - 1,
                Month: 13,
                Day: 6,
            };
        }
    }
    EthiopianDate.createEthiopianDate = createEthiopianDate;
    function addGregorianMonths(m, y) {
        let sum = 0;
        for (let i = 1; i < m; i++) {
            sum += grigorianMonthLength(i, y);
        }
        return sum;
    }
    function getDayNoGrigorian(date) {
        if (!(date instanceof Date)) {
            console.error("Invalid date object:", date);
            return 0;
        }
        let years = date.getFullYear() - 1;
        let leap_years = Math.floor(years / 4) - Math.floor(years / 100) + Math.floor(years / 400);
        let non_leap_years = years - leap_years;
        let days_in_previous_years = leap_years * 366 + non_leap_years * 365;
        let days_in_current_year = addGregorianMonths(date.getMonth() + 1, date.getFullYear()) +
            date.getDate();
        return days_in_previous_years + days_in_current_year;
    }
    EthiopianDate.getDayNoGrigorian = getDayNoGrigorian;
    function toEth(dt) {
        return createEthiopianDate(getDayNoGrigorian(dt) - 2431);
    }
    EthiopianDate.toEth = toEth;
    function toGreg(et) {
        return grigorianDateFromDayNo(getDayNoEthiopian(et) + 2431);
    }
    EthiopianDate.toGreg = toGreg;
    function formatEtDate(dt, locale, getLocalMonth, time) {
        var _a;
        let month = "";
        switch (locale) {
            case "AMH":
                month = getEtMonthName(dt.Month);
                break;
            case "AO":
                month = getEtMonthName(dt.Month, "AO");
                break;
            case "CUSTOM":
                month = (_a = getLocalMonth === null || getLocalMonth === void 0 ? void 0 : getLocalMonth(dt.Month)) !== null && _a !== void 0 ? _a : "";
                break;
            default:
                break;
        }
        return time
            ? `${month} ${dt.Day}/${dt.Year}  ${(0, date_fns_1.format)(new Date(time - 6 * 60 * 60 * 1000), "hh:mm a")}`
            : `${month} ${dt.Day}/${dt.Year}`;
    }
    EthiopianDate.formatEtDate = formatEtDate;
    function formatGrDateToEtDate(date) {
        const dt = toEth(date);
        return `${getEtMonthName(dt.Month)} ${dt.Day}/${dt.Year}`;
    }
    EthiopianDate.formatGrDateToEtDate = formatGrDateToEtDate;
    function getEtMonthName(m, locale = "AMH", getLocalMonth) {
        var _a;
        if (m > 0 && m <= 13) {
            switch (locale) {
                case "AMH":
                    return EthiopianDate.ethMonths[m - 1];
                case "AO":
                    return EthiopianDate.AoMonths[m - 1];
                case "CUSTOM":
                    return (_a = getLocalMonth === null || getLocalMonth === void 0 ? void 0 : getLocalMonth(m)) !== null && _a !== void 0 ? _a : "";
                default:
                    return EthiopianDate.ethMonths[m - 1];
            }
        }
        return "";
    }
    EthiopianDate.getEtMonthName = getEtMonthName;
    function getDayOfWeekNameEt(d) {
        switch (d) {
            case 1:
                return "ሰኞ";
            case 2:
                return "ማክሰኞ";
            case 3:
                return "ረቡዕ";
            case 4:
                return "ሀሙስ";
            case 5:
                return "አርብ";
            case 6:
                return "ቅዳሜ";
            case 7:
                return "እሁድ";
            default:
                return "";
        }
    }
    EthiopianDate.getDayOfWeekNameEt = getDayOfWeekNameEt;
    function toNamedMonthStringFromEtDate(et) {
        return `${getEtMonthName(et.Month)} ${et.Day}, ${et.Year}`;
    }
    EthiopianDate.toNamedMonthStringFromEtDate = toNamedMonthStringFromEtDate;
    function isValid(date) {
        if (date.Year < 1000 || date.Year > 3000)
            return false;
        if (date.Month < 1)
            return false;
        if (date.Day < 1)
            return false;
        if (date.Month > 13)
            return false;
        if (date.Day > ethiopianMonthLength(date.Month, date.Year))
            return false;
        return true;
    }
    EthiopianDate.isValid = isValid;
    function addYears(etDate, years) {
        if (!isValid(etDate))
            throw new Error(`Invalid ethiopian date ${etDate.Day}-${etDate.Month}-${etDate.Year}`);
        let newYear = etDate.Year + years;
        if (etDate.Month === 13 && etDate.Day === 6) {
            if (!isLeapYearEt(newYear)) {
                return { Day: 5, Month: etDate.Month, Year: newYear };
            }
        }
        return { Day: etDate.Day, Month: etDate.Month, Year: newYear };
    }
    EthiopianDate.addYears = addYears;
    function addDays(etDate, days) {
        if (!isValid(etDate))
            throw new Error(`Invalid ethiopian date ${etDate.Day}-${etDate.Month}-${etDate.Year}`);
        return createEthiopianDate(getDayNoEthiopian(etDate) + 1 + days);
    }
    EthiopianDate.addDays = addDays;
    function ethiopianYearDifference(d1, d2, upperBoundInclusive) {
        let date1 = toEth(d1);
        let date2 = toEth(d2);
        if (upperBoundInclusive) {
            date2 = addDays(date2, 1);
        }
        let dayNo1 = date1.Month * 30 + date1.Day;
        let dayNo2 = date2.Month * 30 + date2.Day;
        let years = date2.Year - date1.Year - (dayNo2 >= dayNo1 ? 0 : 1);
        years += (dayNo2 - dayNo1) / 365.0;
        return years;
    }
    EthiopianDate.ethiopianYearDifference = ethiopianYearDifference;
    function fullEthiopianYearDifference(d1, d2, upperBoundInclusive) {
        let date1 = toEth(d1);
        let date2 = toEth(d2);
        if (upperBoundInclusive) {
            date2 = addDays(date2, 1);
        }
        let dayNo1 = date1.Month * 30 + date1.Day;
        let dayNo2 = date2.Month * 30 + date2.Day;
        let years = date2.Year - date1.Year - (dayNo2 >= dayNo1 ? 0 : 1);
        let remainder = dayNo2 - dayNo1;
        return { years, remainder };
    }
    EthiopianDate.fullEthiopianYearDifference = fullEthiopianYearDifference;
    // -1 if the first date is earlier than the second date
    // 0 if the two dates are the same
    // 1 if the first date is later than the second date
    function compareDates(date1, date2) {
        if (date1.Year < date2.Year)
            return -1;
        if (date1.Year > date2.Year)
            return 1;
        if (date1.Month < date2.Month)
            return -1;
        if (date1.Month > date2.Month)
            return 1;
        if (date1.Day < date2.Day)
            return -1;
        if (date1.Day > date2.Day)
            return 1;
        return 0; // Dates are equal
    }
    EthiopianDate.compareDates = compareDates;
})(EthiopianDate || (exports.EthiopianDate = EthiopianDate = {}));
