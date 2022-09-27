import { Container, Paper, Toolbar } from "@mui/material";
import { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};
const HomeLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Toolbar />
      <Header />
      <Container sx={{ height: "100%" }} maxWidth="lg">
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            marginTop: "10px",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {children}
        </Paper>
      </Container>
    </>
  );
};

export default HomeLayout;
