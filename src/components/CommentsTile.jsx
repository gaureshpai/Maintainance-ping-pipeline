import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { fetchUserById } from "../utils/FirebaseFunctions";

const CommentsTile = ({ comment }) => {
  const [CommentAuthor, setCommentAuthor] = useState("");
  fetchUserById(comment.author).then((u) => {
    setCommentAuthor(u);
  });
  let TimeStamp = new Date(comment.timestamp);
  let date = TimeStamp.toLocaleDateString();
  let time = TimeStamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <React.Fragment key={comment.timestamp}>
      <div className="flex justify-between w-full">
        <div className="h-10 w-10 flex justify-center items-center bg-red-500 rounded-full">
          <FontAwesomeIcon icon={faUser} color="#fff" size="1x" />
        </div>
        <div className="font-semibold flex px-4 items-center w-full justify-between">
          <p>{CommentAuthor.name}</p>
          <p>{date + " , " + time}</p>
        </div>
      </div>
      <p className="ml-12">{comment.comment}</p>
    </React.Fragment>
  );
};

export default CommentsTile;
