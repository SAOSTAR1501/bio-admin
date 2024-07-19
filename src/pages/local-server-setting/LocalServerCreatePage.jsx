import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    LocalServerActions,
    LocalServerSelectors,
} from "../../app/services/local-server/local-server.slice";
import MST from "../../components";
import "./style.css";

function LocalServerCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localServerDetail = useSelector(LocalServerSelectors.detail);
  const params = useParams();
  const id = params?.id;

  const [status, setStatus] = useState(true);
  const [name, setName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [authKey, setAuthKey] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    baseUrl: "",
    authKey: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(LocalServerActions.getLocalServerById({ id }));
    } else {
      dispatch(LocalServerActions.setLocalServerById(undefined));
    }
  }, [id]);

  useEffect(() => {
    setName(localServerDetail?.name || "");
    setStatus(localServerDetail?.status || true);
    setBaseUrl(localServerDetail?.baseUrl || "");
    setAuthKey(localServerDetail?.authKey || "");
  }, [localServerDetail]);

  const onChangeStatus = () => {
    setStatus(!status);
  };

  const validate = (callback) => {
    const tempEM = {
      name: "",
      baseUrl: "",
      authKey: "",
    };

    let errorCount = 0;

    if (isEmpty(name)) {
      errorCount++;
      tempEM.name = "Tên local server không được để trống";
    }
    if (isEmpty(baseUrl)) {
      errorCount++;
      tempEM.baseUrl = "baseUrl không được để trống";
    }
    if (isEmpty(authKey)) {
      errorCount++;
      tempEM.authKey = "authKey không được để trống";
    }

    if (errorCount === 0) {
      callback();
    } else {
      setErrorMessage(tempEM);
    }
  };

  const onCreate = () => {
    dispatch(
      LocalServerActions.create({
        onSuccess: (id) => {
          toast.success("Tạo mới local server thành công");
          navigate(`/services/settings/local-server/edit/${id}`);
        },
        body: {
          status,
          name,
          baseUrl,
          authKey,
        },
      })
    );
  };

  const onEdit = () => {
    dispatch(
      LocalServerActions.update({
        onSuccess: () => {
          toast.success("Cập nhật local server thành công");
        },
        id: localServerDetail._id,
        body: {
          status,
          name,
          baseUrl,
          authKey,
        },
      })
    );
  };

  return (
    <MST.Container
      title={
        localServerDetail ? "Cập nhật local server" : "Tạo mới local server"
      }
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/settings/local-server")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button
            onClick={
              localServerDetail
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
            <div className="service-create-title">Thông tin local server</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Tên local server<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  errorMessage={errorMessage?.name}
                  placeholder="Nhập tên dịch vụ"
                  maxLength={225}
                  value={name}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      name: "",
                    });
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                baseUrl<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  errorMessage={errorMessage?.baseUrl}
                  placeholder="Nhập tên dịch vụ"
                  value={baseUrl}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      name: "",
                    });
                    setBaseUrl(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                authKey<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  errorMessage={errorMessage?.authKey}
                  placeholder="Nhập tên dịch vụ"
                  value={authKey}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      name: "",
                    });
                    setAuthKey(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="service-create-content-right">
          <div className="service-create-content">
            <div className="service-create-title">Trạng thái</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">Hoạt động</div>
              <MST.Switch enable={status} onClick={onChangeStatus} />
            </div>
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default LocalServerCreatePage;
