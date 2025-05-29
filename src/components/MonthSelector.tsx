import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";
import { addMonths } from "date-fns";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  const handlePreviousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      setCurrentMonth(newDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button onClick={handlePreviousMonth} color="error" variant="contained">
          先月
        </Button>

        <DatePicker
          views={["year", "month"]}
          label="年月を選択"
          value={currentMonth}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ mx: 2, backgroundColor: "white" }}
              size="small"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                value: currentMonth
                  ? `${currentMonth.getFullYear()}/${String(
                      currentMonth.getMonth() + 1
                    ).padStart(2, "0")}` // フォーマットを "YYYY/MM" に変更
                  : "",
              }}
            />
          )}
        />

        <Button onClick={handleNextMonth} color="primary" variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
