import styled from "@emotion/styled";
import { Button } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegistration } from "../utils/FirebaseFunctions";

export const TextField = styled(MuiTextField)((props) => ({
  width: "100%",
  [`& fieldset`]: {
    borderRadius: "15px",
  },
}));

const RegisterAccount = () => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [Err, setErr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (FormData.password != FormData.confirmPassword) {
      setErr("The password and confirmation password do not match.");
    } else {
      setErr(null);
    }
  }, [FormData]);

  return (
    <div
      className="RegisterAccount flex flex-col gap-5 items-center 
      border-solid border-gray-500 px-3 lg:px-4 py-5 mx-4 lg:mx-12 rounded-3xl
      border-2 shadow-[0px_20px_20px_10px_#00000024] bg-opacity-20
    "
    >
      <p className="Slogan text-sm lg:text-xl text-center">
        Register a account to be a <b>RAISE AN ISSUE</b>
      </p>
      <form
        className=" flex flex-col gap-5 w-full"
        onSubmit={(e) => {
          e.preventDefault();

          handleRegistration(FormData)
            .then((user) => {
              console.log(user);

              navigate("/student-dashboard?newUser=true");
            })
            .catch((err) => {
              setErr(err.message.split(": ")[1]);
            });
        }}
      >
        <TextField
          variant="outlined"
          label="Full Name"
          required
          value={FormData.name}
          onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="E-mail"
          type="email"
          required
          value={FormData.email}
          onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Phone No."
          type="tel"
          required
          value={FormData.mobile}
          onChange={(e) => setFormData({ ...FormData, mobile: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          required
          value={FormData.password}
          onChange={(e) =>
            setFormData({ ...FormData, password: e.target.value })
          }
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          required
          value={FormData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...FormData, confirmPassword: e.target.value })
          }
        />
        <p className="text-red-600">{Err}</p>
        <Button variant="contained" type="submit">
          REGISTER
        </Button>
      </form>
    </div>
  );
};

export default RegisterAccount;