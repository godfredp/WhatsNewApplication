import { TextField as MuiTextfield, InputLabel } from "@mui/material";

const TextField = ({
  name,
  label,
  onChange,
  value,
  required,
  fullWidth,
  id,
}) => {
  return (
    <div>
      <InputLabel
        sx={{
          fontFamily: "Inter",
          color: "#37373b",
          fontSize: "12px",
          marginBottom: "5px",
          fontWeight: 500,
        }}
      >
        {label}
        {required && <span className="text-[#ea3b2d] ml-[5px]">*</span>}
      </InputLabel>
      <MuiTextfield
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        fullWidth={fullWidth}
        sx={{
          "& .MuiInputBase-root": {
            height: "35px",
            background: "#fff",
            borderRadius: "4px",
          },
          "& fieldset": {
            border: "1px solid #ddd!important",
          },
        }}
      />
    </div>
  );
};

export default TextField;
