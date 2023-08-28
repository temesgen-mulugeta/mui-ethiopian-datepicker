# MUI Ethiopian DatePicker

`mui-ethiopian-datepicker` is a React component for selecting Ethiopian dates. It's built on top of Material-UI and provides a culturally tailored date picker experience integrated seamlessly with other MUI components.

## Installation

You can install the package using npm:


```console
npm install mui-ethiopian-datepicker
```

### Peer Dependencies

The package has the following peer dependencies, which must be installed in your project:

```code
"devDependencies": {
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

Here's a sample code snippet to use the `EtDatePicker` component in your React application:

```tsx
import React, { useState } from "react";
import EtDatePicker from "mui-ethiopian-datepicker";

function MyComponent() {
  const [date, setDate] = useState(null);

  return (
    <EtDatePicker
      label="Document Date"
      onChange={(selectedDate) => {
        setDate(selectedDate);
      }}
      value={date}
      disablePast
      minDate="2022-01-01"
      maxDate="2023-12-31"
      // other TextField props here, except InputProps
    />
  );
}
```

## API

### Props

- `label`: The label for the date picker input.
- `onChange`: Callback function that receives the selected date.
- `value`: The currently selected date.
- `disablePast`: Disables all dates in the past.
- `disableFuture`: Disables all dates in the future.
- `minDate`: The minimum selectable date (e.g., "2022-01-01").
- `maxDate`: The maximum selectable date (e.g., "2023-12-31").
- Additional `TextField` props can be passed except for `InputProps`.

## Support and Contributions

Feel free to open issues or PRs if you find any problems or have suggestions for improvements.
