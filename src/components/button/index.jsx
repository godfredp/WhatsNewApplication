import { Button as MuiButton } from "@mui/material/";

const Button = ({ children, variant, ...rest }) => {
  return (
    <MuiButton
      sx={{
        background: variant === "outlined" ? "transparent" : "#ea3b2d",
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "1px",
        fontFamily: "Inter",
        color: variant === "outlined" ? "rgb(55, 55, 59)" : "#fff",
        border:
          variant === "outlined"
            ? "1px solid rgb(55, 55, 59)"
            : "1px solid #ea3b2d",
        height: "35px",
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
