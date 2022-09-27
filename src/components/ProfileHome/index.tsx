import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ProfileHome(): JSX.Element {
  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box>
          <Typography variant="h5">Olá, eu sou Emanuel Vogt</Typography>
          <Divider sx={{ margin: "10px 0" }} />
          <Typography>
            JR Web Full-stack Developer, fazendo códigos a 3 anos. Crio
            aplicativos em Ruby on Rails, React Native, ReactJS, NextJS e NodeJS
            utilizando typescript. Tenho interesse em TDD, DDD, Clean
            Arquitecture e Código Limpo. Além disso estou estudando, com
            projetos pessoais (esse blog, por exemplo), conceitos de CI e CD,
            com ambiente de homologação e de testes;
          </Typography>
        </Box>
        <Avatar
          sx={{ height: "200px", width: "200px", marginLeft: 10 }}
          alt="Remy Sharp"
          src="https://media-exp1.licdn.com/dms/image/C4D03AQG6MHKd0_mVdA/profile-displayphoto-shrink_200_200/0/1642197588734?e=1669852800&v=beta&t=W0jD7Wh0zx79QuiN0Fl_cDUrDGpf67Kl18N0lIsqz6U"
        />
      </Box>
      <Box>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => {
            window.open("https://github.com/EmanuelVogt", "_blank");
          }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/emanuel-vogt-6bb365185/",
              "_blank"
            );
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </>
  );
}
