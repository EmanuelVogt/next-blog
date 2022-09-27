import { ListItem, SvgIcon, Typography, useTheme } from "@mui/material";
import Color from "color";
import { useRouter } from "next/router";
type Props = {
  isCollapsed: boolean;
  to: string;
  title: string;
  icon: any;
};

export function NavItem({ isCollapsed, icon, title, to }: Props): JSX.Element {
  const { pathname, push } = useRouter();
  const theme = useTheme();

  const match = pathname === to ? true : false;

  return (
    <ListItem
      selected={match}
      key={title}
      disablePadding
      button
      onClick={() => push(to)}
      sx={{
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        minHeight: 32,
        "-webkit-font-smoothing": "antialiased",
        fontSize: 14,
        padding: 1,
        "& > svg:first-child": {
          marginRight: "30px",
          marginLeft: "10px",
          fontSize: 24,
          color: "rgba(0, 0, 0, 0.54)",
        },
        "&.Mui-selected": {
          backgroundColor: "rgba(4,102,200, 0.3)",
          "&:hover": {
            backgroundColor: "rgba(4,102,200, 0.3)",
          },
          "& > p": {
            color: `${Color(
              theme.palette.primary.light
            ).toString()} !important`,
          },
          "& > svg:first-child": {
            color: `${Color(
              theme.palette.primary.light
            ).toString()} !important`,
          },
        },
      }}
    >
      <SvgIcon>{icon}</SvgIcon>
      {!isCollapsed && <Typography>{title}</Typography>}
    </ListItem>
  );
}
