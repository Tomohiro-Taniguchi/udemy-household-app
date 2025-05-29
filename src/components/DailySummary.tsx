import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { financeCalculations } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
import { Transaction } from "../types";

interface DailySummaryProps {
  dailyTransactions: Transaction[];
}

const DailySummary = ({ dailyTransactions }: DailySummaryProps) => {
  const theme = useTheme();
  const { income, expense, balance } = financeCalculations(dailyTransactions);
  return (
    <Box>
      <Grid container spacing={2}>
        {/* 収入 */}
        <Grid item xs={6} display={"flex"}>
          <Card sx={{ bgcolor: theme.palette.grey[100], flexGrow: 1 }}>
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                収入
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  wordBreak: "break-all",
                  color: theme.palette.incomeColor.main,
                }}
              >
                ¥{formatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 支出 */}
        <Grid item xs={6} display={"flex"}>
          <Card sx={{ bgcolor: theme.palette.grey[100], flexGrow: 1 }}>
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                支出
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  wordBreak: "break-all",
                  color: theme.palette.expenseColor.main,
                }}
              >
                ¥{formatCurrency(expense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 残高 */}
        <Grid item xs={12} display={"flex"}>
          <Card sx={{ bgcolor: theme.palette.grey[100], flexGrow: 1 }}>
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                残高
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                  wordBreak: "break-all",
                  color: theme.palette.balanceColor.main,
                }}
              >
                ¥{formatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DailySummary;
