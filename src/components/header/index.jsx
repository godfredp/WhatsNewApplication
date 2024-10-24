import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

import Button from "../button";

const Header = ({ handleClickOpen, handleOpenWhatsNew }) => {
  const location = useLocation();

  const navLinks = [
    {
      label: "Customer Success",
      url: "/customer-success",
      target: "",
    },
    {
      label: "Team Management",
      url: "/team-management",
      target: "",
    },
    {
      label: "Job Listings",
      url: "/job-listings",
      target: "",
    },
    {
      label: "Active Pool",
      url: "/active-pool",
      target: "",
    },
    {
      label: "Recruitment",
      url: "/recruitment",
      target: "recruitment-tab",
    },
    {
      label: "HR",
      url: "/hr",
    },
  ];

  return (
    <div className="flex px-[30px] h-[60px] border-b-[1px] border-[#e8e8e9] bg-white items-center">
      <div className="inline-flex items-center">
        <Link to={"/"}>
          <img
            className="w-[85px]"
            src="https://staging-codev-internal-portal.azurewebsites.net/static/media/logo-new-spread.f9c87707bf8ec01a1e7650a3b57e8e62b87200747e90319d02dd66bf765bc36c.svg"
            alt="logo"
          />
        </Link>
      </div>
      <div className="ml-[30px]">
        <ul className="flex gap-1 items-center">
          {navLinks.map((link) => {
            const isActive = location.pathname.includes(link.url);
            return (
              <li className={`flex items-center w-[108px]`} key={link.url}>
                <div
                  className={`navigation-links relative h-[60px] flex items-center justify-center ${
                    isActive ? "after:w-full" : "after:w-0"
                  }`}
                  onClick={handleClickOpen}
                >
                  <Link
                    id={`${link.target}`}
                    to={link.url}
                    className={`text-[#37373b] text-[12px] uppercase px-[20px] py-[10px] text-center h-[60px] flex items-center`}
                    style={{
                      fontWeight: isActive ? 800 : 400,
                    }}
                  >
                    {link.label}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="ml-auto">
        <Button variant="contained" onClick={handleOpenWhatsNew}>
          Start Walkthrough
        </Button>
      </div>
    </div>
  );
};

export default Header;
