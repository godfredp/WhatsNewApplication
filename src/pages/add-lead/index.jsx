import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const AddLeadPage = () => {
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
      </div>
    </div>
  );
};

export default AddLeadPage;
