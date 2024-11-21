import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TextField } from "../components/RegisterAccount";
import { auth } from "../utils/Firebase";
import { handleLogin } from "../utils/FirebaseFunctions";
import SpinnerModal from "../components/SpinnerModal";
const CitizenLogin = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Spinner, setSpinner] = useState(false);
  const [Err, setErr] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return navigate("/citizen-dashboard");
      }
    });
  }, []);
  return (
    <div className="h-screen overflow-hidden">
      <SpinnerModal visible={Spinner} />
      <Navbar />
      <div className=" lg:px-96 px-4 h-3/4 flex flex-col justify-center">
        <h2 className="mt-[25%] lg:mt-0 leading-normal font-bold text-center text-base lg:text-[2rem] my-8">
          Citizen Login
        </h2>
        <div
          className="LoginBox flex flex-col gap-5 items-center 
      border-solid border-gray-500 px-3 lg:px-12 py-12 mx-4 lg:mx-12 rounded-3xl
      border-2 shadow-[0px_20px_20px_10px_#00000024] bg-opacity-20 lg:h-3/4
      justify-center
    "
        >
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              setSpinner(true);
              handleLogin(FormData)
                .then(async (user) => {
                  if (!user.official) {
                    navigate("/citizen-dashboard");
                  } else {
                    await auth.signOut();
                    throw new Error("Invalid user");
                  }
                })
                .catch((err) => {
                  err.message.split(": ")[1]
                    ? setErr(err.message.split(": ")[1])
                    : setErr(err.message);
                })
                .finally(() => {
                  setSpinner(false);
                });
            }}
            className=" flex flex-col gap-5 w-full"
          >
            <TextField
              variant="outlined"
              label="E-mail"
              type="email"
              onChange={(e) =>
                setFormData({ ...FormData, email: e.target.value })
              }
              required
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              onChange={(e) =>
                setFormData({ ...FormData, password: e.target.value })
              }
              required
            />
            <p className="text-red-600">{Err}</p>

            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CitizenLogin;
