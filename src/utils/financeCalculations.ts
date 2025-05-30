import { Balance, Transaction } from "../types";

export function financeCalculations(transactions: Transaction[]): Balance {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    {
      income: 0,
      expense: 0,
      balance: 0,
    }
  );
  // {income: 300, expense: 200, balance: 100}
}

// 1. 日付ごとの収支を計算する関数
export function calculateDailyBalance(
  transactions: Transaction[]
): Record<string, Balance> {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }
    if (transaction.type === "income") {
      acc[day].income += transaction.amount;
    } else {
      acc[day].expense += transaction.amount;
    }

    acc[day].balance = acc[day].income - acc[day].expense;
    return acc;
  }, {});
  // {
  //   "2025-05-20" : {income: 700, expense: 200, balance: 500},
  //   "2025-05-23" : {income: 0, expense: 500, balance: -500},
  // }
}
