import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { Statuses, statusColors } from "../utils/enums";
import ComplaintDetailModal from "./ComplaintDetailModal";

const ComplaintsCard = ({ complaint }) => {
  const [DialogOpen, setDialogOpen] = useState(false);
  let date = new Date(complaint.timestamp);
  let StatusColorEnum = Object.keys(Statuses).find(
    (key) => Statuses[key] === complaint.status
  );
  
  return (
    <>
      <Dialog
        open={DialogOpen}
        children={
          <ComplaintDetailModal
            setDialogOpen={setDialogOpen}
            complaint={complaint}
          />
        }
      />
      <div
        className="border shadow-[2px_4px_11px_1px_rgba(0,0,0,0.25)] border-solid border-[rgba(45,41,41,0.4)] rounded-lg my-4
  p-4 flex flex-col gap-2
  "
      >
        <div className="flex justify-between">
          <p>Reported Date : {date.toLocaleDateString("en-IN")}</p>
          <p
            className="cursor-pointer text-sm font-semibold"
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Detailed View
          </p>
        </div>
        <p className="font-bold">{complaint.reason}</p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon size="1x" icon={faMapMarkerAlt} />
            <p>{complaint.location.name}</p>
          </div>
          <span className="flex gap-2 font-bold">
            Status:{" "}
            <p
              style={{
                color: statusColors[StatusColorEnum],
              }}
            >
              {complaint.status}
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

export default ComplaintsCard;