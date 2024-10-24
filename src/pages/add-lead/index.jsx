import { useEffect } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import TextField from "../../components/textfield";
import IconButton from "@mui/material/IconButton";
import Button from "../../components/button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Divider from "@mui/material/Divider";

import { useOutletContext } from "react-router-dom";

const AddLeadPage = () => {
  const { setJoyride } = useOutletContext();

  useEffect(() => {
    setJoyride((prevState) => ({
      ...prevState,
      run: false,
      stepIndex: prevState.stepIndex + 1,
    }));

    setTimeout(() => {
      setJoyride((prevState) => ({ ...prevState, run: true }));
    }, 400);
  }, []);

  return (
    <div>
      <div className="w-1/2">
        <div className="flex gap-1 cursor-pointer items-center">
          <ChevronLeftIcon className="!text-[19px]" />
          BACK
        </div>
        <div className="text-[35px] font-bold text-[#37373b]">ADD LEAD</div>
        <div>
          <div className="flex whitespace-nowrap items-center">
            <span className="text-[#37373b] text-[15px] font-bold pr-[10px]">
              BASIC INFORMATION
            </span>
            <div className="w-full h-[1px] bg-[#e8e8e9]" />
          </div>
        </div>
        <div className="flex mt-[10px] gap-3">
          <div>
            <TextField
              name="firstName"
              label="First Name"
              required
              id="first-name-textfield"
            />
          </div>
          <div>
            <TextField name="middleName" label="Middle Name" />
          </div>
          <div>
            <TextField
              name="lastName"
              label="Last Name"
              required
              id="last-name-textfield"
            />
          </div>
        </div>
        <div className="flex mt-[10px] gap-3 items-center">
          <div>
            <TextField
              name="email"
              label="Email"
              required
              id="email-textfield"
            />
          </div>
          <div className="pt-5">
            <IconButton>
              <AddCircleIcon className="text-[#37373b] !text-[18px]" />
            </IconButton>
          </div>
          <div>
            <TextField
              name="contact"
              label="Contact #"
              required
              id="contact-textfield"
            />
          </div>
          <div className="pt-5">
            <IconButton>
              <AddCircleIcon className="text-[#37373b] !text-[18px]" />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="mt-[30%]">
        <Divider />
      </div>

      <div className="mt-[10px]">
        <Button
          variant="outlined"
          className="!py-[25px] !px-[70px]"
          id="create-lead-button"
        >
          CREATE
        </Button>
      </div>
    </div>
  );
};

export default AddLeadPage;
