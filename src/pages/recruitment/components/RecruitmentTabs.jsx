import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import Button from "../../../components/button";

import Joyride from "react-joyride";

const steps = [
  {
    target: ".add-leads-button",
    content: "Start adding leads by clicking this button",
  },
];

const StyledTabs = styled(Tabs)({
  borderBottom: "1px solid #f0f0f1",
  minHeight: "48px",
  overflow: "visible",
  "& .MuiTabs-indicator": {
    height: "4px",
    backgroundColor: "#ea3b2d",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    fontFamily: "Inter",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 14,
    marginRight: theme.spacing(1),
    color: "#37373b",
    "&.Mui-selected": {
      color: "#37373b",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = [
  { id: 1, label: "Leads" },
  { id: 2, label: "Applicants" },
];

const RecruitmentTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab) => (
            <StyledTab
              label={tab.label}
              {...a11yProps(tab.id)}
              className="w-[270px]"
            />
          ))}
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
          <div className="flex mt-4 gap-4">
            <Button
              variant="outlined"
              endIcon={<AddIcon />}
              className="add-leads-button"
            >
              ADD LEAD
            </Button>
            <Button variant="outlined" endIcon={<UploadFileIcon />}>
              BULK ADD LEAD
            </Button>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
};

export default RecruitmentTabs;
