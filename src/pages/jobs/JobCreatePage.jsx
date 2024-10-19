import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  JobActions,
  JobSelectors,
} from "../../app/services/jobs/jobs.slice";
import MST from "../../components";
import "./style.css";

function JobCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobDetail = useSelector(JobSelectors.detail);
  const params = useParams();
  const id = params?.id;
  const isEdit = !!id;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(JobActions.getJobById({ id }));
    } else {
      dispatch(JobActions.setJobById(undefined));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setName(jobDetail?.name || "");
    setCode(jobDetail?.code || "");
  }, [jobDetail]);

  const validate = () => {
    const tempEM = {
      name: "",
      code: "",
    };

    let isValid = true;

    if (isEmpty(name.trim())) {
      isValid = false;
      tempEM.name = "Tên ngành nghề không được để trống";
    }
    if (isEmpty(code.trim())) {
      isValid = false;
      tempEM.code = "Mã ngành nghề không được để trống";
    }

    setErrorMessage(tempEM);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      if (isEdit) {
        onEdit();
      } else {
        onCreate();
      }
    }
  };

  const onCreate = () => {
    dispatch(
      JobActions.create({
        onSuccess: (id) => {
          toast.success("Tạo mới ngành nghề thành công");
          navigate(`/services/settings/job/edit/${id}`);
        },
        body: {
          name: name.trim(),
          code: code.trim(),
        },
      })
    );
  };

  const onEdit = () => {
    dispatch(
      JobActions.update({
        onSuccess: () => {
          toast.success("Cập nhật ngành nghề thành công");
        },
        id: jobDetail._id,
        body: {
          name: name.trim(),
          code: code.trim(),
        },
      })
    );
  };

  return (
    <MST.Container
      title={isEdit ? "Cập nhật ngành nghề" : "Tạo mới ngành nghề"}
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/settings/job")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button onClick={handleSubmit}>
            Lưu lại
          </MST.Button>
        </div>
      }
    >
      <div className="service-create-content-container">
        <div className="service-create-content-left">
          <div className="service-create-content">
            <div className="service-create-title">
              Thông tin chung
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Tên ngành nghề<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  errorMessage={errorMessage.name}
                  placeholder="Nhập tên ngành nghề"
                  maxLength={225}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMessage({
                      ...errorMessage,
                      name: "",
                    });
                  }}
                />
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Mã ngành nghề<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  errorMessage={errorMessage.code}
                  placeholder="Nhập mã ngành nghề"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setErrorMessage({
                      ...errorMessage,
                      code: "",
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default JobCreatePage; 