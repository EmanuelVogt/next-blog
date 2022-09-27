import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

export default function Header() {
  const { push } = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Emanuel Vogt
          </Typography>
          <Button color="inherit" onClick={() => push('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => push('/me')}>
            Me!
          </Button>
          <Button color="inherit" onClick={() => push('/login')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
