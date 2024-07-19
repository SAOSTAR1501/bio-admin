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
  const isEdit = !!id

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
  }, [id]);

  useEffect(() => {
    setName(jobDetail?.name || "");
    setCode(jobDetail?.code || "");
  }, [jobDetail]);

  const validate = (callback) => {
    const tempEM = {
      name: "",
      code: "",
    };

    let errorCount = 0;

    if (isEmpty(name)) {
      errorCount++;
      tempEM.name = "name không được để trống";
    }
    if (isEmpty(code)) {
      errorCount++;
      tempEM.code = "code không được để trống";
    }

    if (errorCount === 0) {
      callback();
    } else {
      setErrorMessage(tempEM);
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
          name,
          code,
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
          name,
          code,
        },
      })
    );
  };

  return (
    <MST.Container
      title={
        isEdit
          ? "Cập nhật ngành nghề"
          : "Tạo mới ngành nghề"
      }
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/settings/job")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button
            onClick={
              isEdit
                ? () => validate(onEdit)
                : () => validate(onCreate)
            }
          >
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
                  errorMessage={errorMessage?.username}
                  placeholder="Nhập tên ngành nghề"
                  maxLength={225}
                  value={name}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      username: "",
                    });
                    setName(e.target.value);
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
                  errorMessage={errorMessage?.password}
                  placeholder="Nhập mã ngành nghề"
                  value={code}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      password: "",
                    });
                    setCode(e.target.value);
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
