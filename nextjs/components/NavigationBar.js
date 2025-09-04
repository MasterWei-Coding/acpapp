import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import FunctionsIcon from "@mui/icons-material/Functions";
import PersonIcon from "@mui/icons-material/Person";
import useBearStore from "@/store/useBearStore";

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const appName = useBearStore((state) => state.appName);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#0b5394" }}>
        <Toolbar>
          {/* Logo / Home */}
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <FunctionsIcon sx={{ color: "#ffffff", mr: 1 }} fontSize="large" />
          </Link>

          <Typography
            variant="body1"
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#ffffff",
              padding: "0 10px",
              fontFamily: "Prompt",
            }}
          >
            {appName}
          </Typography>

          {/* Navigation links */}
          <NavigationLink href="/register" label="Login" />
          <NavigationLink href="/game" label="Game Selection" />
          <NavigationLink href="/spinner" label="Spinner" />
          <NavigationLink href="/rockpaperscissors" label="rpc" />
          <NavigationLink href="/balance" label="Balance" />

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Profile button */}
          <Button
            onClick={() => {
              router.push("/profile");
            }}
          >
            <PersonIcon sx={{ color: "#ffffff" }} />
          </Button>
        </Toolbar>
      </AppBar>

      <main>{children}</main>
    </>
  );
};

const NavigationLink = ({ href, label }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: isActive ? 700 : 500,
          color: isActive ? "#FFD700" : "#fff", // Gold for active
          padding: "0 12px",
          borderBottom: isActive ? "2px solid #FFD700" : "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default NavigationLayout;
