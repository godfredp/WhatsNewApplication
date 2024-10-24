import { Button as MuiButton } from "@mui/material/";

const Button = ({ children, ...rest }) => {
  return (
    <MuiButton
      {...rest}
      sx={{
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "1px",
        fontFamily: "Inter",
        color: "rgb(55, 55, 59)",
        border: "1px solid rgb(55, 55, 59)",
        height: "35px",
        width: "max-content",
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
