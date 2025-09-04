import { useState } from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';

const choices = ['Rock', 'Paper', 'Scissors'];

const decideWinner = (user, computer) => {
  if (user === computer) return "It's a Tie!";
  if (
    (user === 'Rock' && computer === 'Scissors') ||
    (user === 'Paper' && computer === 'Rock') ||
    (user === 'Scissors' && computer === 'Paper')
  ) {
    return 'You Win!';
  }
  return 'Computer Wins!';
};

export default function RPS() {
  const [user, setUser] = useState(null);
  const [computer, setComputer] = useState(null);
  const [result, setResult] = useState('');
  const [balance, setBalance] = useState(100); // starting balance
  const [bet, setBet] = useState(10); // default bet amount

  const play = (choice) => {
    if (bet <= 0 || bet > balance) {
      alert("Invalid bet amount!");
      return;
    }

    const comp = choices[Math.floor(Math.random() * 3)];
    setUser(choice);
    setComputer(comp);

    const outcome = decideWinner(choice, comp);
    setResult(outcome);

    if (outcome === 'You Win!') {
      setBalance(balance + bet);
    } else if (outcome === 'Computer Wins!') {
      setBalance(balance - bet);
    }
    // Tie → balance unchanged
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Rock Paper Scissors
      </Typography>

      {/* Bet input */}
      <TextField
        type="number"
        label="Bet Amount"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        sx={{ mb: 2 }}
        inputProps={{ min: 1 }}
      />

      <Box>
        {choices.map((c) => (
          <Button
            key={c}
            onClick={() => play(c)}
            variant="contained"
            sx={{ m: 1 }}
          >
            {c}
          </Button>
        ))}
      </Box>

      {/* Show result */}
      {user && computer && (
        <Typography variant="h6" mt={2}>
          You: {user} | Computer: {computer} → {result}
        </Typography>
      )}

      {/* Show balance */}
      <Typography variant="h6" mt={2} color={balance > 0 ? "green" : "red"}>
        Balance: {balance}
      </Typography>
    </Box>
  );
}
