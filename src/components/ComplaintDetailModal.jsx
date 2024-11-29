import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import {
  faClose,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Send } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/Firebase";
import {
  addComment,
  isOfficial,
  markAsRejected,
  markAsSolved
} from "../utils/FirebaseFunctions";
import { Statuses, statusColors } from "../utils/enums";
import CommentsTile from "./CommentsTile";

const ComplaintDetailModal = ({ setDialogOpen, complaint }) => {
  console.log(complaint);
  const [Official, setOfficial] = useState(false);
  const [CommentBoxDisabled, setCommentBoxDisabled] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && isOfficial(user.uid)) {
        setOfficial(true);
      }
    });
  }, []);
  let TimeStamp = new Date(complaint.timestamp);
  let date = TimeStamp.toLocaleDateString();
  let time = TimeStamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let StatusColorEnum = Object.keys(Statuses).find(
    (key) => Statuses[key] === complaint.status
  );
  const [CommentFValue, setCommentFValue] = useState("");

  return (
    <div>
      <DialogTitle className="flex justify-between">
        Complaint Details
        <DialogActions>
          <FontAwesomeIcon
            onClick={() => {
              setDialogOpen((prevState) => !prevState);
            }}
            className="cursor-pointer"
            icon={faClose}
          />
        </DialogActions>
      </DialogTitle>
      <DialogContent>
        <div>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>{complaint.location.name}</p>
            </div>
            <span
              className="w-30 text-center rounded-xl font-bold flex items-center text-white h-12 lg:h-6 px-4"
              style={{
                backgroundColor: statusColors[StatusColorEnum],
              }}
            >
              {complaint.status}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon icon={faClockFour} />
            <p>{date + " , " + time}</p>
          </div>
          <h2 className="text-lg font-bold my-4">{complaint.reason}</h2>
          <p>{complaint.additionalInfo}</p>
          {complaint.mediaType === "image" ? (
            <img
              className="max-w-full w-auto h-96 object-scale-down"
              src={complaint.mediaPath}
            />
          ) : (
            <video
              controls
              className="max-w-full w-auto h-96 object-scale-down"
              src={complaint.mediaPath}
            />
          )}
          <h2 className="text-lg font-bold my-4">Comments</h2>
          <div>
            {complaint.comments && complaint.comments.length === 0 ? (
              <p className="text-center">No Comments</p>
            ) : (
              complaint.comments.map((comment) => (
                <CommentsTile key={comment.id} comment={comment} />
              ))
            )}
          </div>
          <div
            className={`${
              complaint.status !== Statuses.inProgress ? "hidden" : "block"
            } my-4 flex  gap-4 items-center`}
          >
            <TextField
              fullWidth
              value={CommentFValue}
              onChange={(e) => {
                setCommentFValue(e.target.value);
                if (e.target.value == "") {
                  setCommentBoxDisabled(true);
                } else {
                  setCommentBoxDisabled(false);
                }
              }}
              variant="outlined"
              label="Add your comment"
            />
            <IconButton
              className="h-10 w-10 shadow-xl border rounded-full flex items-center justify-center"
              onClick={() => {
                addComment(complaint.id, CommentFValue);
                setCommentFValue("");
                // setDialogOpen(false);
              }}
              disabled={CommentBoxDisabled}
            >
              <Send />
            </IconButton>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        {Official && complaint.status === Statuses.inProgress ? (
          <>
            <Button color="error" variant="outlined"
              onClick={async () => {
                await markAsRejected(complaint.id);
                setDialogOpen(false);
              }}
            >
              Mark as Rejected
            </Button>
            <Button
              onClick={async () => {
                await markAsSolved(complaint.id);
                setDialogOpen(false);
              }}
              color="success"
              variant="contained"
            >
              Mark as Solved
            </Button>
          </>
        ) : null}
      </DialogActions>
    </div>
  );
};

export default ComplaintDetailModal;