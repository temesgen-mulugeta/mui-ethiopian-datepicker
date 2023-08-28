
# MUI Ethiopian DatePicker

Current Version: 0.1.2

`mui-ethiopian-datepicker` is a React component for selecting Ethiopian dates. It's built on top of Material-UI and provides a culturally tailored date picker experience integrated seamlessly with other MUI components.

![Screenshot of DatePicker](screenshot-url-here)

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

### Using `EtDateViewer`

```tsx
import { EtDateViewer } from "mui-ethiopian-datepicker";

// ... Sample usage of EtDateViewer
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
