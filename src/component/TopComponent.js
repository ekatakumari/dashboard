import React from "react";
import "../Style/MainContainer.css";
import CalendarDropdown from "./CalenderDropdown";

const TopComponent = () => {
  return (
    <div className="top-container">
      <div className="top">
        <div className="top-heading">
          <p className="parag">Good Afternoon, Anujit</p>
          <img
            className="image-clapping"
            src="https://e7.pngegg.com/pngimages/456/417/png-clipart-clap-illustration-clapping-hand-emoji-noto-fonts-applause-hand-emoji-photography-hand-emoji-thumbnail.png"
            alt="Clapping hands"
          />
        </div>

        <p className="parag">Here is What's Happening Today</p>
      </div>

      <div className="image-row">
        <div className="chat-box">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src="https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png"
              alt="Profile illustration"
              className="profile-image"
            />
          ))}
          <div className="more-symbol">+</div>
        </div>
        <CalendarDropdown />
      </div>
    </div>
  );
};

export default TopComponent;
