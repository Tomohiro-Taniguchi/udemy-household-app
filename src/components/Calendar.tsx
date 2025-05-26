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

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
function Calendar({ monthlyTransactions, setCurrentMonth }: CalendarProps) {
  const events = [
    { title: "Meeting", start: new Date() },
    {
      title: "お買い物",
      start: "2025-05-10",
      income: 300,
      expense: 200,
      balance: 100,
    },
  ];
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
  const CalendarEvents = createCalendarEvents(dailyBalance);
  // const CalendarEvents = [
  //   {
  //     start: "2025-05-10",
  //     income: 300,
  //     expense: 200,
  //     balance: 100,
  //   },
  //   {
  //     start: "2025-05-11",
  //     income: 500,
  //     expense: 300,
  //     balance: 200,
  //   },
  // ];
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
    setCurrentMonth(datesetInfo.view.currentStart);
  };
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={CalendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  );
}

export default Calendar;
