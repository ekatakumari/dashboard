import React from "react";
import SalesDashboard from "./SalesDashboard";
import LeftSide from "./LeftSide";
import "../Style/MainContainer.css"
import HeaderComponent from "./HeaderComponent";
import BottomRight from "./BottomRight";
import TopComponent from "./TopComponent";
const MainContainer = () => {
    return (
        <div className="main-container">
          <div className="left-side">
            <LeftSide />
          </div>
          <div className="right-side">
            <HeaderComponent/>
           <div className="right-bottom">
            <TopComponent/>
           <SalesDashboard />
           <BottomRight/>
           </div>
          </div>
        </div>
      );
};

export default MainContainer;
