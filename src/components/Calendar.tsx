import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { render } from "@testing-library/react";
import { EventContentArg } from "@fullcalendar/core";
import { calculateDailyBalance } from "../utils/financeCalculations";
import { Balance, CalendarContent, Transaction } from "../types";
import { start } from "repl";
import { formatCurrency } from "../utils/formatting";
import { DatesSetArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import { isSameMonth } from "date-fns";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}
function Calendar({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) {
  const theme = useTheme();
  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };

  // 日付ごとの収支を計算する関数
  const dailyBalance = calculateDailyBalance(monthlyTransactions);
  // FullCalendar用のイベントを生成する関数
  const createCalendarEvents = (
    dailyBalance: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalance).map((date) => {
      const { income, expense, balance } = dailyBalance[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };
  const calendarEvents = createCalendarEvents(dailyBalance);
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>

        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>

        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  };
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
}

export default Calendar;
