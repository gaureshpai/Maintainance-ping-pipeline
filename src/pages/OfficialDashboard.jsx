import { Dialog } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintDetailModal from "../components/ComplaintDetailModal";
import Navbar from "../components/Navbar";
import SpinnerModal from "../components/SpinnerModal";
import { auth } from "../utils/Firebase";
import { fetchComplaints, isOfficial } from "../utils/FirebaseFunctions";
import { Statuses, statusColors } from "../utils/enums";

const OfficialDashboard = () => {
  const [Complaints, setComplaints] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [complaint, setComplaint] = useState({});
  const [SpinnerVisible, setSpinnerVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setSpinnerVisible(true);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/official-login");
      } else {
        isOfficial(user.uid).then((res) => {
          if (!res) {
            navigate("/citizen-dashboard");
          } else {
            setSpinnerVisible(false);
          }
        });
      }
    });
    const unsubscribe = fetchComplaints(handleComplaintsUpdate);

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);
  const handleComplaintsUpdate = (updatedComplaints) => {
    setComplaints(updatedComplaints);
  };
  let columns = [
    {
      field: "reason",
      headerName: "Complaint Reason",
      width: 300,
      headerClassName: "",
    },
    {
      field: "author",
      headerName: "Reported By",
      width: 150,
    },
    {
      field: "location",
      headerName: "Reported Location",
      width: 200,

      valueGetter: (params) => `${params.row.location.name}`,
    },
    {
      field: "timestamp",
      headerName: "Reported Date & Time",
      width: 200,

      valueGetter: (params) => {
        let d = new Date(params.row.timestamp);
        let date = d.toLocaleDateString();
        let time = d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return date + " , " + time;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "",
      headerAlign: "center",
      align: "center",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("StatusCol", {
          inProgress: params.value === Statuses.inProgress,
          Rejected: params.value === Statuses.rejected,
          Solved: params.value === Statuses.solved,
        });
      },
    },
  ];
  return (
    <>
      {/* <SpinnerModal visible={SpinnerVisible} /> */}
      <Navbar />
      <div className="px-20 ">
        <h2 className=" lg:mt-10 leading-normal font-bold text-center text-xl lg:text-[2rem] my-8 lg:text-left">
          Admin Dashboard
        </h2>
        <Dialog
          open={ModalOpen}
          children={
            <ComplaintDetailModal
              setDialogOpen={setModalOpen}
              complaint={complaint}
            />
          }
        />
        <DataGrid
          rows={Complaints}
          columns={columns}
          onRowClick={(params) => {
            setComplaint(params.row);
            setModalOpen(true);
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          sx={{
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
              overflow: "visible !important",
            },
            "& .StatusCol": {
              color: "#fff",
              fontWeight: 900,
              marginY: 1.5,
              minHeight: "30px !important",
              marginLeft: "auto !important",
              borderRadius: 500,
            },
            "& .StatusCol.inProgress": {
              backgroundColor: statusColors.inProgress,
            },
            "& .StatusCol.Rejected": {
              backgroundColor: statusColors.rejected,
            },
            "& .StatusCol.Solved": {
              backgroundColor: statusColors.solved,
            },
          }}
          // checkboxSelection
        ></DataGrid>
      </div>
    </>
  );
};

export default OfficialDashboard;