import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  Menu,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

type Props = {
  anchorEl: null | HTMLElement;
  handleClose: any;
  open: boolean;
};

const ButtonAccount = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  color: "#808080",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  borderRadius: 20,
  borderColor: "#808080",
  "&:hover": {
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem #4d4d4d7f",
  },
});

export function MenuAvatar({
  anchorEl,
  handleClose,
  open,
}: Props): JSX.Element {
  const { logout } = useContext(AuthContext);
  const { push } = useRouter()
  
  const handleLogout = (): void => {
    logout()
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box sx={{ width: 350, height: 300, padding: 1 }}>
        <List sx={{ height: "100%" }}>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ width: 5, height: 5, marginBottom: 2 }}>EV</Avatar>
            <ButtonAccount onClick={() => push('account')}>
              {" "}
              Gerenciar sua conta
            </ButtonAccount>
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "30%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{ borderRadius: 20 }}
              onClick={handleLogout}
            >
              Sair
            </Button>
          </ListItem>
        </List>
      </Box>
    </Menu>
  );
}
