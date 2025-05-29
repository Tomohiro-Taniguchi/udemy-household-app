import React from "react";
import { useState, useEffect } from "react";

import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types/index";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/shema";

function App() {
  // Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err != null && "code" in err;
  }
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetcheTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });
        setTransactions(transactionsData);
      } catch (err) {
        // error
        if (isFireStoreError(err)) {
          console.error("firestoreのエラーは：", err);
        } else {
          console.error("一般的なエラーは：", err);
        }
      }
    };
    fetcheTransactions();
  }, []);
  // ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transactions) => {
    return transactions.date.startsWith(formatMonth(currentMonth));
  });
  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction);
    try {
      // firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      console.log(newTransaction);
      setTransactions((prevTransaction) => [...transactions, newTransaction]);
    } catch (err) {
      // error
      if (isFireStoreError(err)) {
        console.error("firestoreのエラーは：", err);
      } else {
        console.error("一般的なエラーは：", err);
      }
    }
  };
  // 削除処理
  const handleDeleteTransaction = async (transactionId: string) => {
    // firestoreのデータ削除
    try {
      // firestoreのデータ削除
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filterdTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      setTransactions(filterdTransactions);
    } catch (err) {
      // error
      if (isFireStoreError(err)) {
        console.error("firestoreのエラーは：", err);
      } else {
        console.error("一般的なエラーは：", err);
      }
    }
  };
  // 更新処理
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      //firestoreの更新処理
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      // フロント更新
      const updateTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updateTransactions);
    } catch (err) {
      // error
      if (isFireStoreError(err)) {
        console.error("firestoreのエラーは：", err);
      } else {
        console.error("一般的なエラーは：", err);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
