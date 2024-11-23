import styled from "@emotion/styled";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { LocationSearching } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DashboardLinkButton from "../components/DashboardLinkButton";
import Navbar from "../components/Navbar";
import SpinnerModal from "../components/SpinnerModal";
import { auth } from "../utils/Firebase";
import { createComplaint, isOfficial } from "../utils/FirebaseFunctions";
import { identifyLocation } from "../utils/MiscFunctions";
import { Statuses } from "../utils/enums";

const TextField = styled(MuiTextField)((props) => ({
  width: "80%",
  [`& fieldset`]: {
    borderRadius: "15px",
  },
}));
const ReportComplaint = () => {
  const [Media, setMedia] = useState();
  const [MediaPath, setMediaPath] = useState("");
  const [FormData, setFormData] = useState({
    location: {
      name: "",
      lat: "",
      lng: "",
    },
    mediaPath: "",
    reason: "",
    additionalInfo: "",
    reportedBy: "",
    timestamp: "",
    status: Statuses.inProgress,
    mediaType: "",
  });
  const [LoaderVisibile, setLoaderVisibile] = useState(false);
  const FileInput = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user || !isOfficial(user.uid)) {
        return navigate("/");
      }
      setFormData({ ...FormData, reportedBy: user.uid });
    });
  }, []);
  return (
    <div className="overflow-x-hidden">
      <SpinnerModal visible={LoaderVisibile} />
      <Navbar />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className=" lg:mt-10 leading-normal font-bold text-center text-xl lg:text-[2rem] my-6 lg:text-left lg:mx-20">
        Report a Complaint
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoaderVisibile(true);
          createComplaint(FormData, Media)
            .then(() => {
              toast.success("Complaint Reported Succesfully");
              setTimeout(() => {
                navigate("/student-dashboard");
              }, 3000);
            })
            .finally(() => {
              setLoaderVisibile(false);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        }}
      >
        <input
          required
          type="file"
          ref={FileInput}
          className="opacity-0"
          accept="image/*, video/*"
          onChange={(e) => {
            setMedia(e.target.files[0]);
            setFormData({
              ...FormData,
              mediaType: e.target.files[0].type.split("/")[0],
            });
            setMediaPath(URL.createObjectURL(e.target.files[0]));
          }}
          name=""
          id=""
        />
        <DashboardLinkButton
          className={`${Media ? "hidden" : "block"} mx-[8vw]` }
          icon={faCamera}
          name={"Upload a picture/video of issue"}
          onClick={() => FileInput.current.click()}
          subtitle={"Make sure that everything is clear"}
        />
        <div
          className={`flex flex-col justify-center items-center mx-8 lg:mx-20 py-6 ${
            Media ? "block" : "hidden"
          }`}
        >
          <img
            src={Media && FormData.mediaType === "image" ? MediaPath : null}
            alt=""
            className={`max-w-full w-auto my-6 h-96 object-scale-down
          ${Media && FormData.mediaType == "image" ? "block" : "hidden"}
          `}
          />
          <video
            controls
            src={Media && FormData.mediaType === "video" ? MediaPath : null}
            className={`max-w-full w-auto my-6 h-96 object-scale-down
          ${Media && FormData.mediaType == "video" ? "block" : "hidden"}
          `}
          ></video>
          <Button
            onClick={() => FileInput.current.click()}
            hidden={Media ? false : true}
            variant="outlined"
          >
            Change Image
          </Button>
        </div>
        <Box ml={'8vw'}>
          <TextField
            variant="outlined"
            label="Location"
            value={FormData.location.name}
            required
            contentEditable={false}
            InputProps={{
              endAdornment: (
                <ButtonBase
                  onClick={async () => {
                    let locationRes = await identifyLocation();
                    setFormData({ ...FormData, location: locationRes });
                  }}
                >
                  <LocationSearching />
                </ButtonBase>
              ),
            }}
          />
          <p className="mt-6">Reason:</p>
          <RadioGroup
            onChange={(e) => {
              setFormData({ ...FormData, reason: e.target.value });
            }}
            value={FormData.reason}
          >
            <FormControlLabel
              value="Projector issues"
              control={<Radio />}
              label="Projector issues"
            />
            <FormControlLabel
              value="Black board issues"
              control={<Radio />}
              label="Black board issues"
            />
            <FormControlLabel
              value="Fan and light issues"
              control={<Radio />}
              label="Fan and light issues"
            />
            <FormControlLabel
              value="Switch board issues"
              control={<Radio />}
              label="Switch board issues"
            />
            <FormControlLabel
              value="Table bench and chairs"
              control={<Radio />}
              label="Table bench and chairs"
            />
            <FormControlLabel
              value="Door and windows"
              control={<Radio />}
              label="Door and windows"
            />
            <FormControlLabel
              value="Others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
          <p className="my-2">More Information</p>
          <TextField
            required
            multiline
            value={FormData.additionalInfo}
            onChange={(e) => {
              setFormData({ ...FormData, additionalInfo: e.target.value });
            }}
            rows={5}
            placeholder="Provide more information about the issue"
          />
          <FormControlLabel
            required
            value="terms-accepted"
            control={<Checkbox />}
            label="By clicking this checkbox, I understood that reporting fake complaints against anyone will lead to legal actions against me."
          />
        </Box>
        <div className="flex justify-center my-8 px-40 lg:px-96">
          <Button variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportComplaint;