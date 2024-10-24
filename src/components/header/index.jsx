import Link from "@mui/material/Link";

const Header = () => {
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <div className="flex">
      <div className="inline-flex">
        <img
          src="https://staging-codev-internal-portal.azurewebsites.net/static/media/logo-new-spread.f9c87707bf8ec01a1e7650a3b57e8e62b87200747e90319d02dd66bf765bc36c.svg"
          alt="logo"
        />
      </div>
      <div className="flex">
        <ul>
          <li>
            <Link href="#">test</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
