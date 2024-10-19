import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import OneMenu from "./OneMenu";
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
          {
            name: "Users",
            path: "/services/settings/user",
          },
        ],
      },
    ],
  };

  const menuList = adminMenu;

  useEffect(() => {
    const tempParams = pathname.split("/").filter((x) => !_.isEmpty(x));
    setCurrentTab(tempParams[0] || "services");
    setCurrentSubTab(tempParams[1] || "services");
    setCurrentSubSubTab(tempParams[2] || "");
  }, [pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="menu-list-container">
          <div className="menu-btn-container">
            <div
              role="button"
              className={`menu-btn${currentTab === "services" ? "-active" : ""}`}
              onClick={() => handleMenuClick("/services")}
              aria-current={currentTab === "services" ? "page" : undefined}
            >
              <div className="menu-btn-label">Dịch vụ</div>
            </div>
          </div>
          {(menuList[currentTab] || []).length > 0 && (
            <div className="menu-list-item-container">
              {menuList[currentTab].map((oneItem) => (
                <OneMenu
                  currentSubTab={currentSubTab}
                  currentSubSubTab={currentSubSubTab}
                  key={oneItem.name}
                  item={oneItem}
                  onClick={() => handleMenuClick(oneItem.path)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
