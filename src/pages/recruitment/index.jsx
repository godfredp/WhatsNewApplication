import RecruitmentTabs from "./components/RecruitmentTabs";
import { useOutletContext } from "react-router-dom";

const RecruitmentPage = () => {
  const { handleClickOpen } = useOutletContext(); // Retrieve function from context

  return (
    <div>
      <div className="text-[35px] font-bold text-[#37373b]">RECRUITMENT</div>
      <div>
        <RecruitmentTabs handleClickOpen={handleClickOpen} />
      </div>
    </div>
  );
};

export default RecruitmentPage;
