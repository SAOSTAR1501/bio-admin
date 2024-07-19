import React from "react";
import { useNavigate } from "react-router-dom";
import MST from "../../components";
import PlugIcon from "../../images/icons/PlugIcon";
import BioList from "./BioList";
import "./style.css";

function BiosPage() {

  return (
    <MST.Container
      title={"Danh sách bio"}
    >
      <div className="local-service-content">
        <BioList />
      </div>
    </MST.Container>
  );
}

export default BiosPage;
