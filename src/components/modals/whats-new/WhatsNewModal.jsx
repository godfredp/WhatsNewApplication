import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../../components/button";

import NewsIcon from "../../../assets/images/present.png";

const WhatsNewModal = ({ open, onClose, handleStartGuide }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <div className="p-4">
        <div className="flex mb-2 items-center justify-end">
          <div>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <img className="w-[70px] mr-4" src={NewsIcon} />
        </div>
        <div className="flex flex-wrap mb-2 text-[18px] font-bold">
          Welcome to the internal portal
        </div>
        <div className="mb-4">A simple way to manage your team</div>

        <div>
          <Button
            variant="contained"
            fullWidth
            className="!text-[12px]"
            onClick={() => {
              handleStartGuide();
              onClose();
            }}
          >
            See what's new
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default WhatsNewModal;
