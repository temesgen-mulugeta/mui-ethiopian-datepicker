
# MUI Ethiopian DatePicker

Current Version: 0.1.9

`mui-ethiopian-datepicker` is a React component for selecting Ethiopian dates. It's built on top of Material-UI and provides a culturally tailored date picker experience integrated seamlessly with other MUI components.

![Screenshot of DatePicker](https://drive.google.com/uc?export=view&id=1F59_kA2MBtQuczFLYWo1-e527uPvn0yt)


## Installation

You can install the package using npm:

```console
npm install mui-ethiopian-datepicker
```

### Peer Dependencies

```code
"peerDependencies": {
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "@mui/icons-material": "^5.14.6",
  "@mui/material": "^5.14.6",
  "@mui/x-date-pickers": "^6.11.2",
  "date-fns": "^2.30.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

You can install them using:

```console
npm install @mui/icons-material @mui/material @mui/x-date-pickers date-fns react react-dom
```

## Usage

### Basic Usage with `EtDatePicker`

```tsx
import React, { useState } from "react";
import EtDatePicker from "mui-ethiopian-datepicker";

function MyComponent() {
  const [date, setDate] = useState(null);

  return (
    <EtDatePicker
      label="Document Date"
      onChange={(selectedDate: Date) => {
        setDate(selectedDate);
      }}
      value={date}
      minDate={new Date("2023-08-20")}
      maxDate={new Date("2023-08-26")}
      
      // other TextField props here, except InputProps
    />
  );
}
```


## Localization Support in `Version 0.1.7`

Starting from version 0.1.7, `mui-ethiopian-datepicker`  introduces localization support for different Ethiopian localizations. This feature allows a more tailored experience for users.


#### 1. First, you need to import the EtLocalizationProvider from the mui-ethiopian-datepicker package.

```tsx

import { EtLocalizationProvider } from 'mui-ethiopian-datepicker';

```


#### 2. Wrap Your Application or Component: 
Use the EtLocalizationProvider to wrap your entire application or just the section where the date picker is used. This will ensure that all date pickers within this context are localized.

```tsx

function MyApp({ children }) {
  return (
    <EtLocalizationProvider localType="AMH">
      {children}
    </EtLocalizationProvider>
  );
}
```
#### 3. Configure the Localization Provider:
The EtLocalizationProvider accepts the following props to configure the localization:

`localType:` This can be set to "AMH" (Amharic), "AO" (Afan Oromo), or "CUSTOM". It defines the type of localization you want to apply. "AMH" and "AO" are predefined localizations, while "CUSTOM" allows for more personalized configurations.

`getLocalMonthName:` This optional function is used only when localType is set to "CUSTOM". It allows you to provide a custom function to return the name of the month based on the month number.

```tsx
function MyApp() {
  const getCustomMonthName = (month: number) => {
    // Define custom month names
    const customMonthNames = ["Custom Month 1", "Custom Month 2", ...];
    return customMonthNames[month - 1];
  };

  return (
    <EtLocalizationProvider localType="CUSTOM" getLocalMonthName={getCustomMonthName}>
      {children}
    </EtLocalizationProvider>
  );
}


```


### Using `EtDateViewer`

```tsx
import { EtDateViewer } from "mui-ethiopian-datepicker";

```

## EthiopianDateUtil

`EthiopianDateUtil` is a utility module that provides various functions for working with Ethiopian dates. Here are some of the key functionalities:

### Creating an Ethiopian Date

```typescript
import { EthiopianDate } from 'mui-ethiopian-datepicker';

const date = EthiopianDate.createEthiopianDateFromParts(23, 7, 2013);
```

### Convert To and From Gregorian

```typescript
import { EthiopianDate } from 'mui-ethiopian-datepicker';

const etDate = EthiopianDate.toEth(new Date());
const grDate = EthiopianDate.toGreg(etDate);
```

### Getting Ethiopian Months

```typescript
import { EthiopianDate } from 'mui-ethiopian-datepicker';

const months = EthiopianDate.ethMonths;
```

### Examples

#### Convert a Gregorian Date to Ethiopian Date

```typescript
const etDate = EthiopianDate.toEth(new Date());
```

#### Convert an Ethiopian Date to Gregorian Date

```typescript
const grDate = EthiopianDate.toGreg({ Day: 23, Month: 7, Year: 2013 });
```

#### Get the Names of Ethiopian Months

```typescript
const months = EthiopianDate.ethMonths;
```

For more functionalities, refer to the source code.

## Support and Contributions

Feel free to open issues or PRs if you find any problems or have suggestions for improvements.
