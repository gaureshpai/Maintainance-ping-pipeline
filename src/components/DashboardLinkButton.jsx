import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const DashboardLinkButton = ({
  name,
  icon,
  link,
  onClick,
  className,
  subtitle,
}) => {
  return (
    <Link
      className=""
      to={link}
      onClick={() => {
        onClick ? onClick() : null;
      }}
    >
      <div
        className={
          `DashboardLinkButton  border shadow-[3px_4px_4px_rgba(0,0,0,0.26)] rounded-lg border-solid border-black w-100 flex flex-col justify-center items-center px-10 py-10 mx-10 my-5 
      lg:h-96 lg:text-xl
      ` + className
        }
      >
        <FontAwesomeIcon size={"2x"} icon={icon} />
        <p className="mt-6 text-center">{name}</p>
        <p
          className={`text-center text-xs lg:text-base ${
            !subtitle ? "hidden" : "block"
          }`}
        >
          ({subtitle})
        </p>
      </div>
    </Link>
  );
};

export default DashboardLinkButton;
