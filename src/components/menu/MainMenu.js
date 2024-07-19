import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import OneMenu from "./OneMenu";
import CustomersIcon from "./icons/CustomersIcon";
import SVGDashBoard from "./icons/DashBoardIcon";
import KeywordIcon from "./icons/KeywordIcon";
import NotificationIcon from "./icons/NotificationIcon";
import OrdersIcon from "./icons/OrdersIcon";
import ServicesIcon from "./icons/ServicesIcon";
import SettingsIcon from "./icons/SettingsIcon";
import "./style.css";
import { useSelector } from "react-redux";

function MainMenu() {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  const [currentTab, setCurrentTab] = useState("services");
  const [currentSubTab, setCurrentSubTab] = useState("services");
  const [currentSubSubTab, setCurrentSubSubTab] = useState("services");

  const adminMenu = {
    services: [
      {
        name: "Cài đặt",
        icon: <SettingsIcon />,
        children: [
          {
            name: "Ngành nghề",
            path: "/services/settings/job",
          },
          {
            name: "Bios",
            path: "/services/settings/bio",
          },
        ],
      },
    ],
  };
  const menuList = adminMenu;

  useEffect(() => {
    const tempParams = pathname.split("/").filter((x) => !_.isEmpty(x));
    if (tempParams[0]) {
      setCurrentTab(tempParams[0]);
    }

    if (tempParams[1]) {
      setCurrentSubTab(tempParams[1]);
    }
    if (tempParams[2]) {
      setCurrentSubSubTab(tempParams[2]);
    } else {
      setCurrentSubSubTab("");
    }
  }, [pathname]);

  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="menu-list-container">
          <div className="menu-btn-conatiner">
            <div
              role="button"
              className={`menu-btn${
                currentTab === "services" ? "-active" : ""
              }`}
            >
              <div className="menu-btn-label">Dịch vụ</div>
            </div>
          </div>
          {(menuList[`${currentTab}`] || []).length > 0 ? (
            <div className="menu-list-item-container">
              {(menuList[`${currentTab}`] || []).map((oneItem) => {
                return (
                  <OneMenu
                    currentSubTab={currentSubTab}
                    currentSubSubTab={currentSubSubTab}
                    key={oneItem.name}
                    item={oneItem}
                  />
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
