import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { fetchComplaintsByUser, isOfficial } from "../utils/FirebaseFunctions";
import ComplaintsCard from "./ComplaintsCard";

const ReportedComplaints = () => {
  const [Complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user || !isOfficial(user.uid)) {
        return navigate("/citizen-login");
      }
      const unsubscribe = fetchComplaintsByUser(
        user.uid,
        handleComplaintsUpdate
      );

      return () => {
        // Unsubscribe from real-time updates when the component is unmounted
        unsubscribe();
      };
    });
  }, []);
  const handleComplaintsUpdate = (updatedComplaints) => {
    setComplaints(updatedComplaints);
  };
  return (
    <div className="lg:border lg:shadow-[3px_4px_4px_rgba(0,0,0,0.26)] rounded-lg lg:border-solid lg:border-black w-full flex flex-col items-center lg:h-[28rem] py-2">
      <h3 className="font-bold my-2">Complaints Reported by You</h3>
      <div className="container px-4 overflow-y-auto">
        {Complaints.length === 0 ? (
          <h2>No Complaints Found</h2>
        ) : (
          Complaints &&
          Complaints.map((complaint) => {
            return <ComplaintsCard key={complaint.id} complaint={complaint} />;
          })
        )}
      </div>
    </div>
  );
};

export default ReportedComplaints;
