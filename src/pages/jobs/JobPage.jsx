import React from "react";
import { useNavigate } from "react-router-dom";
import MST from "../../components";
import PlugIcon from "../../images/icons/PlugIcon";
import LocalServerList from "./JobList";
import "./style.css";

function SupportAccountPage() {
  const navigate = useNavigate();

  const onCreate = () => navigate("/services/settings/job/create");

  return (
    <MST.Container
      title={"Danh sách ngành nghề"}
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
            Tạo mới ngành nghề
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

export default SupportAccountPage;
