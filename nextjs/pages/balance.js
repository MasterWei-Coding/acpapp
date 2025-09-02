// pages/balance.js
import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function BalancePage() {
  const balance = 1500;
  return (
    <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"70vh" }}>
      <Card sx={{ minWidth:300, p:2, textAlign:"center", boxShadow:3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Your Balance</Typography>
          <Typography variant="h4" sx={{ fontWeight:"bold", color:"#0b5394", mb:2 }}>
            ${balance.toLocaleString()}
          </Typography>
          <Box sx={{ display:"flex", gap:2, justifyContent:"center" }}>
            <Button variant="contained">Deposit</Button>
            <Button variant="outlined" color="secondary">Withdraw</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
