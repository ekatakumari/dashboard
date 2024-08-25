import React from 'react';
import "../Style/MainContainer.css";

const LeftSide = () => {
  return (
    <div className="left-side">
      <div>
        <img
          style={{ width: "20px", height: "20px" }}
          src="https://e7.pngegg.com/pngimages/144/29/png-clipart-whatsapp-android-message-mobile-phones-whatsapp-text-sms-thumbnail.png"
          alt="WhatsApp icon"
        />
      </div>
      <div class="sidebar">
        <span class="pages">Pages</span>
        <p className="page-item">Dashboard</p>
        <p className="page-item">Home</p>
      </div>
     
    </div>
  );
}

export default LeftSide;
