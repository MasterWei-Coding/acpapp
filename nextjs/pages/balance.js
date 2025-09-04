// pages/balance.js
import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, TextField } from "@mui/material";

export default function BalancePage() {
  const [balance, setBalance] = useState(1500); // initial balance
  const [amount, setAmount] = useState(""); // input amount

  const handleDeposit = () => {
    const value = Number(amount);
    if (value > 0) {
      setBalance(balance + value);
      setAmount(""); // clear input
    } else {
      alert("Enter a valid deposit amount");
    }
  };

  const handleWithdraw = () => {
    const value = Number(amount);
    if (value > 0 && value <= balance) {
      setBalance(balance - value);
      setAmount(""); // clear input
    } else { 
      alert("Invalid withdraw amount");
    }
  };

  return (
    <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"70vh" }}>
      <Card sx={{ minWidth:300, p:2, textAlign:"center", boxShadow:3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Your Balance</Typography>
          
          {/* Balance Display */}
          <Typography variant="h4" sx={{ fontWeight:"bold", color:"#0b5394", mb:2 }}>
            ${balance.toLocaleString()}
          </Typography>

          {/* Input Field */}
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
            fullWidth
          />

          {/* Buttons */}
          <Box sx={{ display:"flex", gap:2, justifyContent:"center" }}>
            <Button variant="contained" onClick={handleDeposit}>
              Deposit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
