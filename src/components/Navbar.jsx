import styled from "@emotion/styled";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MuiButton from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import Logo from "/src/assets/logo.png";

export const Button = styled(MuiButton)((props) => ({
  borderRadius: "25px",
  color: "#111",
  borderColor: "#111",
  padding: "8px 25px",
  ":hover": {
    borderColor: "#080",
  },
}));

const Navbar = () => {
  const [Visible, setVisible] = useState(false);
  const [User, setUser] = useState(null);
  const [Official, setOfficial] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    navigate("/");
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        isOfficial(user.uid).then((res) => {
          setOfficial(res);
        });
      }
    });
  }, []);

  return (
    <>
      <div className="Navbar w-screen flex justify-between items-center px-4 py-2 lg:py-4 lg:px-8">
        <Link to="/">
          <div className="LogoGroup flex items-center gap-3">
            <img className="logo h-8 lg:h-12" src={Logo} />
            <h2 className="font-bold text-sm animate-typing whitespace-nowrap overflow-hidden lg:text-lg">Maintanance Ping Pipeline</h2>
          </div>
        </Link>
        {User ? (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button
              component={Link}
              to={Official ? "/official-dashboard" : "/citizen-dashboard"}
              variant="outlined"
            >
              Dashboard
            </Button>
            <Button onClick={handleLogout} variant="outlined">
              Logout
            </Button>
          </div>
        ) : (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button component={Link} to={"/admin-login"} variant="outlined">
              Admin Login
            </Button>
            <Button component={Link} to={"/student-login"} variant="outlined">
              Student Login
            </Button>
          </div>
        )}

        <FontAwesomeIcon
          className="lg:hidden"
          icon={Visible ? faClose : faBars}
          onClick={() => {
            setVisible(!Visible);
          }}
        />
      </div>
      <div
        className={`MenuMobile lg:hidden w-full text-center py-20 absolute bg-white z-10 rounded-3xl ${
          Visible ? "block" : "hidden"
        }`}
      >
        <ul className=" flex flex-col gap-16 font-bold">
          {User ? (
            <>
              <Link
                to={Official ? "/official-dashboard" : "/citizen-dashboard"}
              >
                Dashboard
              </Link>
              <Link onClick={handleLogout}>Logout</Link>{" "}
            </>
          ) : (
            <>
              <Link to={"/student-login"}>Student Login</Link>
              <Link to={"/admin-login"}>Admin Login</Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;