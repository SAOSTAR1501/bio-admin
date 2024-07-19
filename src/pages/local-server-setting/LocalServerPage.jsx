import React from "react";
import { useNavigate } from "react-router-dom";
import MST from "../../components";
import PlugIcon from "../../images/icons/PlugIcon";
import LocalServerList from "./LocalServerList";
import "./style.css";

function LocalServicePage() {
  const navigate = useNavigate();

  const onCreate = () => navigate("/services/settings/local-server/create");

  return (
    <MST.Container
      title={"Local server"}
      right={
        <div>
          <MST.Button
            onClick={onCreate}
            icon={
              <div className="service-icon-create">
                <PlugIcon />
              </div>
            }
          >
            Tạo mới local server
          </MST.Button>
        </div>
      }
    >
      <div className="local-service-content">
        <LocalServerList />
      </div>
    </MST.Container>
  );
}

export default LocalServicePage;
