import "./style.css";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CONST from "../../app/services/const";
import {
  ServiceActions,
  ServiceSelectors,
} from "../../app/services/service/service.slice";
import MST from "../../components";
import Editor from "../../components/base/editor/Editor";
import Select from "../../components/base/select/Select";
import TableCreateService from "../../components/table-create-service/TableCreateService";
import ServiceCreateCreateServiceGroupModal from "./ServiceCreate.CreateServiceGroupModal";
import ServiceCreateCreateServiceTagModal from "./ServiceCreate.CreateServiceTagModal";
import {
  LocalServerActions,
  LocalServerSelectors,
} from "../../app/services/local-server/local-server.slice";

function ServiceCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceDetail = useSelector(ServiceSelectors.serviceDetail);
  const serviceGroupList = useSelector(ServiceSelectors.serviceGroup);
  const serviceList = useSelector(ServiceSelectors.scriptGroupCodeList);
  const serviceTagsList = useSelector(ServiceSelectors.serviceTags);

  const [isLoadingService, setIsLoadingService] = useState(false);

  const partnerList = [
    {
      name: "Nội bộ",
      value: "local",
    },
    {
      name: "1DG.ME",
      value: "1dg.me",
    },
    {
      name: "ongtrum",
      value: "ongtrum",
    },
  ];

  const getData = () => {
    dispatch(ServiceActions.getCreateInfo());
  };

  const typeList = [
    { name: "Chạy dịch vụ", value: "runService" },
    { name: "API Key", value: "apiKey" },
  ];

  const [status, setStatus] = useState(false);
  const [isBestSellers, setIsBestSellers] = useState(false);
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [type, setType] = useState({
    name: "Chạy dịch vụ",
    value: "runService",
  });
  const [partner, setPartner] = useState({
    name: "Nội bộ",
    value: "local",
  });
  const [description, setDescription] = useState("");
  const [orderSuccessDescription, setOrderSuccessDescription] = useState("");
  const [scriptGroupCode, setScriptGroupCode] = useState(undefined);
  const [serviceGroupID, setServiceGroupID] = useState();
  const [serviceTags, setServiceTags] = useState([]);
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [vipPrice, setVipPrice] = useState("");
  const [originPrice, setoriginPrice] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const localServerList = useSelector(LocalServerSelectors.list);
  const [localServerSelected, setLocalServerSelected] = useState([]);

  useEffect(() => {
    if (partner.value === "local") {
      dispatch(LocalServerActions.getLocalServerList({ status: true }));
    }
  }, [partner.value]);

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    price: "",
  });
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (scriptGroupCode && partner.value === "1dg.me") {
      scriptGroupCode.minValue && setMinValue(scriptGroupCode.minValue);
      scriptGroupCode.maxValue && setMaxValue(scriptGroupCode.maxValue);
    }
  }, [scriptGroupCode, partner]);

  useEffect(() => {
    if (!isLoadingService) {
      setIsLoadingService(true);
      partner.value !== "local" && setScriptGroupCode(undefined);
      dispatch(
        ServiceActions.getScriptGroupCodeList({
          partnerCode: partner.value,
          onSuccess: () => {
            setIsLoadingService(false);
          },
        })
      );
    }
  }, [partner]);
  useEffect(() => {
    if (serviceDetail) {
      setStatus(serviceDetail?.status);
      setIsBestSellers(serviceDetail?.isBestSellers);
      setName(serviceDetail?.name);
      setAttributes(
        serviceDetail?.attributes.map((x) => {
          return {
            ...x,
            dataType: {
              name: x?.dataType,
              value: x?.dataType,
            },
            errorMessage: {
              label: "",
              code: "",
            },
          };
        })
      );
      setType(
        (() => {
          try {
            return typeList.filter((x) => x.value === serviceDetail?.type)[0];
          } catch (error) {
            return "";
          }
        })()
      );
      setDescription(serviceDetail?.description);
      setPartner(
        (() => {
          try {
            return partnerList.filter(
              (x) => x.value === serviceDetail?.partnerCode
            )[0];
          } catch (error) {
            return "";
          }
        })()
      );
      setOrderSuccessDescription(serviceDetail?.orderSuccessDescription);

      setUnit(serviceDetail?.unit);
      setUnit(serviceDetail?.cost);
      setPrice(Number(serviceDetail?.price));
      setVipPrice(serviceDetail?.vipPrice);
      setoriginPrice(serviceDetail?.originPrice);
      setMinValue(serviceDetail.minValue || "");
      setMaxValue(serviceDetail.maxValue || "");
    }
  }, [serviceDetail, serviceTagsList, serviceGroupList]);

  useEffect(() => {
    if (serviceDetail?.partnerCode === "local") {
      setScriptGroupCode({
        scriptGroupCode: serviceDetail.scriptGroupCode,
        scriptCode: serviceDetail.scriptCode,
      });
      const list = localServerList
        .filter((item) => serviceDetail?.listLocalServer?.includes(item._id))
        .map((item) => ({ ...item, value: item._id }));
      setLocalServerSelected(list);
    }
  }, [localServerList, serviceDetail]);

  useEffect(() => {
    partner.value !== "local" &&
      setScriptGroupCode(
        (() => {
          try {
            return serviceList.filter(
              (x) =>
                x.scriptGroupCode === serviceDetail?.scriptGroupCode &&
                x.scriptCode == serviceDetail?.scriptCode
            )[0];
          } catch (error) {
            return "";
          }
        })()
      );
  }, [serviceList, partner.value]);

  useEffect(() => {
    if (serviceGroupID === undefined) {
      setServiceGroupID(
        (() => {
          try {
            return serviceGroupList.filter(
              (x) => x.value === serviceDetail?.serviceGroup?._id
            )[0];
          } catch (error) {
            return "";
          }
        })()
      );
    }
  }, [serviceDetail, serviceGroupList]);

  useEffect(() => {
    if (isEmpty(serviceTags)) {
      setServiceTags(
        (() => {
          try {
            return serviceTagsList.filter(
              (x) => (serviceDetail?.serviceTags || []).indexOf(x.name) > -1
            );
          } catch (error) {
            return "";
          }
        })()
      );
    }
  }, [serviceDetail, serviceTagsList]);

  const onChangeStatus = () => {
    setStatus(!status);
  };

  const onChangeIsBestSellers = () => {
    setIsBestSellers(!isBestSellers);
  };

  //
  const onChangeAttributes = useCallback(
    (data) => {
      setAttributes(data);
    },
    [attributes]
  );

  //
  const onAddAttributes = useCallback(() => {
    setAttributes([
      ...attributes,
      {
        id: `cd${Math.random()}`,
        label: "",
        code: "",
        dataType: {
          name: "",
          value: "",
        },
        description: "",
        required: false,
        errorMessage: {
          label: "",
          code: "",
        },
        commentType: false,
        options: [],
      },
    ]);
  }, [attributes]);

  //
  const renderTable = useMemo(() => {
    return (
      <TableCreateService
        data={attributes}
        onChange={onChangeAttributes}
        customPrice={serviceDetail?.customPrice}
      />
    );
  }, [attributes]);

  const validate = (callback) => {
    const tempEM = {
      name: "",
      price: "",
      scriptGroupCode: "",
      scriptCode: "",
    };

    let errorCount = 0;

    if (isEmpty(name)) {
      errorCount++;
      tempEM.name = "Tên dịch vụ không được để trống";
    }

    if (price.length === 0) {
      errorCount++;
      tempEM.price = "Giá dịch vụ không được để trống";
    }

    if (price <= 0) {
      errorCount++;
      tempEM.price = "Giá dịch vụ không được nhỏ hơn 0";
    }

    if (!isEmpty(attributes)) {
      setAttributes(
        attributes.map((oneAtt) => {
          const tempMes = {
            label: "",
            code: "",
          };
          if (isEmpty(oneAtt.label)) {
            errorCount++;
            tempMes.label = "Tên không được bỏ trống";
          }

          if (isEmpty(oneAtt.code)) {
            errorCount++;
            tempMes.code = "Mã không được bỏ trống";
          }

          return {
            ...oneAtt,
            errorMessage: tempMes,
          };
        })
      );
    }

    if (partner.value === "local") {
      if (isEmpty(scriptGroupCode?.scriptGroupCode)) {
        errorCount++;
        tempEM.scriptGroupCode = "scriptGroupCode không được để trống";
      }
      if (isEmpty(scriptGroupCode?.scriptCode)) {
        errorCount++;
        tempEM.scriptCode = "scriptCode không được để trống";
      }
    }

    if (errorCount == 0) {
      callback();
    } else {
      setErrorMessage(tempEM);
    }
  };

  const getCustomPrice = () => {
    const newCustomPrice = attributes.reduce((acc, attribute) => {
      const newAcc = [...acc];
      if (attribute.dataType?.value === "select" && attribute.options?.length) {
        attribute.options.map((option) => {
          newAcc.push({
            attributeCode: attribute.code,
            price: option.price?.value,
            customType: option.price?.amountType,
            mappingValue: option.value,
          });
        });
      }
      return newAcc;
    }, []);
    if (newCustomPrice.some((item) => !item.price)) {
      return serviceDetail.customPrice;
    }
    return newCustomPrice;
  };

  const onCreate = () => {
    dispatch(
      ServiceActions.createService({
        onSuccess: (id) => {
          toast.success("Tạo mới gói dịch vụ thành công");
          navigate(`/services/services/edit/${id}`);
        },
        body: {
          status,
          isBestSellers,
          name, // tên dịch vụ
          code: "sv1",
          description,
          orderSuccessDescription,
          scriptGroupCode: scriptGroupCode?.scriptGroupCode,
          scriptCode: scriptGroupCode?.scriptCode,
          serviceCode: scriptGroupCode?.serviceCode,
          serviceGroupID: serviceGroupID?.value,
          serviceTags: serviceTags.map((x) => x.name),
          partnerCode: partner.value,
          partnerServiceID: scriptGroupCode?.partnerServiceID,
          unit,
          cost,
          price,
          vipPrice,
          originPrice,
          type: type?.value, //loại dịch vụ
          attributes: attributes.map((x) => {
            return {
              ...x,
              dataType: x?.dataType?.value,
            };
          }),
          minValue: minValue || 0,
          maxValue: maxValue || 0,
          customPrice: getCustomPrice(),
          listLocalServer: localServerSelected.map((item) => item._id),
        },
      })
    );
  };

  const onEdit = () => {
    dispatch(
      ServiceActions.edit({
        onSuccess: () => {
          toast.success("Cập nhật gói dịch vụ thành công");
        },
        id: serviceDetail._id,
        body: {
          status,
          isBestSellers,
          name, // tên dịch vụ
          code: "sv1",
          description,
          orderSuccessDescription,
          scriptGroupCode: scriptGroupCode?.scriptGroupCode,
          scriptCode: scriptGroupCode?.scriptCode,
          serviceCode: scriptGroupCode?.serviceCode,
          serviceGroupID: serviceGroupID?.value,
          serviceTags: serviceTags.map((x) => x.name),
          partnerCode: partner.value,
          partnerServiceID: scriptGroupCode?.partnerServiceID,
          unit,
          cost,
          price,
          vipPrice,
          originPrice,
          type: type?.value, //loại dịch vụ
          attributes: attributes.map((x) => {
            return {
              ...x,
              dataType: x?.dataType?.value,
            };
          }),
          minValue: Number(minValue) || 0,
          maxValue: Number(maxValue) || 0,
          customPrice: getCustomPrice(),
          listLocalServer: localServerSelected.map((item) => item._id),
        },
      })
    );
  };

  return (
    <MST.Container
      title={serviceDetail ? "Cập nhật dịch vụ" : "Tạo mới dịch vụ"}
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/services")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button
            onClick={
              serviceDetail ? () => validate(onEdit) : () => validate(onCreate)
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
            <div className="service-create-title">Thông tin dịch vụ</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Loại dịch vụ<span className="color-red"> *</span>
              </div>
              <div>
                <Select.Simple
                  placeholder="Chọn loại dịch vụ"
                  selected={type}
                  setSelected={setType}
                  width={400}
                  data={typeList}
                />
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Tên dịch vụ<span className="color-red"> *</span>
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
                <div style={{ color: "#72777A", marginTop: 8 }}>
                  {name.length}/225
                </div>
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Giá<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  type="number"
                  errorMessage={errorMessage?.price}
                  placeholder="Nhập giá"
                  value={price}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      price: "",
                    });
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="service-create-content">
            <div className="service-create-title">Giá dịch vụ</div>

            <div
              className="service-create-one-field"
              style={{ display: "flex", flex: 1 }}
            >
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <div className="service-create-one-field-name">Giá gốc</div>
                <div>
                  <MST.Input
                    type="number"
                    placeholder="Nhập giá gốc"
                    value={originPrice}
                    onChange={(e) => setoriginPrice(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <div className="service-create-one-field-name">
                  Giá cho khách hàng VIP
                </div>
                <div>
                  <MST.Input
                    type="number"
                    placeholder="Nhập giá vip"
                    value={vipPrice}
                    onChange={(e) => setVipPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div
              className="service-create-one-field"
              style={{ display: "flex", flex: 1 }}
            >
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <div className="service-create-one-field-name">Chi phí</div>
                <div>
                  <MST.Input
                    placeholder="Nhập chi phí"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <div className="service-create-one-field-name">Đơn vị</div>
                <div>
                  <MST.Input
                    placeholder="Nhập đơn vị"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* minValue, maxValue */}
            <div
              className="service-create-one-field"
              style={{ display: "flex", flex: 1 }}
            >
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <div className="service-create-one-field-name">
                  Số lượng tối thiểu
                </div>
                <div>
                  <MST.Input
                    type="number"
                    placeholder="Nhập số lượng tối thiểu"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    disabled={partner?.value === "1dg.me"}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <div className="service-create-one-field-name">
                  Số lượng tối đa
                </div>
                <div>
                  <MST.Input
                    type="number"
                    placeholder="Nhập số lượng tối đa"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    disabled={partner?.value === "1dg.me"}
                  />
                </div>
              </div>
            </div>
            {/* ============= */}
          </div>

          <div className="service-create-content">
            <div className="d-flex jc-between ai-center">
              <div className="service-create-title">
                Dữ liệu nhập vào của khách hàng
              </div>
              <div>
                <MST.Button onClick={onAddAttributes}>
                  Thêm thuộc tính
                </MST.Button>
              </div>
            </div>
            <div className="pt-20">{renderTable}</div>
          </div>

          <div className="service-create-content">
            <div className="service-create-title">Mô tả dịch vụ</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">Mô tả</div>
              <div>
                <Editor
                  placeholder="Nhập mô tả"
                  onBlur={(eventInfo, editor) => {
                    const data = editor?.getData();
                    const valueTrim = data?.trim();
                    if (isEmpty(data)) {
                      editor.setData("");
                      return;
                    }
                    setDescription(valueTrim);
                  }}
                  data={description || ""}
                />
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Mô tả sau khi đặt hàng
              </div>
              <div>
                <Editor
                  placeholder="Nhập mô tả sau khi đặt hàng"
                  onBlur={(eventInfo, editor) => {
                    const data = editor?.getData();
                    const valueTrim = data?.trim();
                    if (isEmpty(data)) {
                      editor.setData("");
                      return;
                    }
                    setOrderSuccessDescription(valueTrim);
                  }}
                  data={orderSuccessDescription || ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="service-create-content-right">
          <div className="service-create-content">
            <div className="service-create-title">Trạng thái</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">Sẵn sàn bán</div>
              <MST.Switch enable={status} onClick={onChangeStatus} />
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Đặt thành dịch vụ hot
              </div>
              <MST.Switch
                enable={isBestSellers}
                onClick={onChangeIsBestSellers}
              />
            </div>
          </div>

          <div className="service-create-content">
            <div className="service-create-title">Phân loại</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Đơn vị xử lý<span className="color-red"> *</span>
              </div>
              <div>
                <Select.Simple
                  placeholder="Chọn đơn vị xử lý"
                  selected={partner}
                  setSelected={setPartner}
                  width={"100%"}
                  data={partnerList}
                />
              </div>
            </div>

            {partner.value === "local" ? (
              <>
                <div className="service-create-one-field">
                  <div className="service-create-one-field-name">
                    scriptCode<span className="color-red"> *</span>
                  </div>
                  <div>
                    <MST.Input
                      errorMessage={errorMessage?.scriptCode}
                      placeholder="Nhập scriptCode"
                      value={scriptGroupCode?.scriptCode || ""}
                      onChange={(e) => {
                        setScriptGroupCode({
                          ...scriptGroupCode,
                          scriptCode: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="service-create-one-field">
                  <div className="service-create-one-field-name">
                    scriptGroupCode<span className="color-red"> *</span>
                  </div>
                  <div>
                    <MST.Input
                      errorMessage={errorMessage?.scriptGroupCode}
                      placeholder="Nhập scriptGroupCode"
                      value={scriptGroupCode?.scriptGroupCode || ""}
                      onChange={(e) => {
                        setScriptGroupCode({
                          ...scriptGroupCode,
                          scriptGroupCode: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="service-create-one-field">
                  <div className="service-create-one-field-name">
                    Local servers<span className="color-red"> *</span>
                  </div>
                  <div>
                    <Select.Multiple
                      placeholder="Chọn local server"
                      setSelectedList={setLocalServerSelected}
                      selectedList={localServerSelected}
                      width={"100%"}
                      data={localServerList.map((item) => ({
                        ...item,
                        value: item._id,
                      }))}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="service-create-one-field">
                <div className="service-create-one-field-name">
                  Dịch vụ gốc<span className="color-red"> *</span>
                </div>
                {isLoadingService ? (
                  <div
                    style={{
                      color: "#00000090",
                    }}
                  >
                    Đang lấy thông tin dịch vụ gốc...
                  </div>
                ) : (
                  <div>
                    <Select.Simple
                      placeholder="Chọn loại dịch vụ gốc"
                      width={"100%"}
                      data={serviceList.map((x) => {
                        return {
                          ...x,
                          value: x?.scriptCode,
                          icon: (
                            <img
                              style={{
                                marginRight: 12,
                                width: 24,
                                height: 24,
                              }}
                              src={`${CONST.URL.API}/images/services/${x.scriptGroupCode}.png`}
                            />
                          ),
                        };
                      })}
                      selected={scriptGroupCode}
                      setSelected={setScriptGroupCode}
                      selectShowOptionsStyles={{ maxHeight: 400 }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Nhóm dịch vụ<span className="color-red"> *</span>
              </div>
              <div className="d-flex-col">
                <Select.Simple
                  canRemove
                  onRemove={(value) => {
                    dispatch(
                      ServiceActions.deleteServiceGroup({
                        id: value,
                      })
                    );
                  }}
                  placeholder="Chọn nhóm dịch vụ"
                  selected={serviceGroupID}
                  setSelected={setServiceGroupID}
                  width={"100%"}
                  data={serviceGroupList}
                />
                <div style={{ marginTop: 8 }}>
                  <ServiceCreateCreateServiceGroupModal
                    serviceGroupID={serviceGroupID}
                    setServiceGroupID={setServiceGroupID}
                  />
                </div>
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">Thẻ dịch vụ</div>
              <div className="d-flex-col">
                <Select.Multiple
                  placeholder="Chọn thẻ dịch vụ"
                  setSelectedList={setServiceTags}
                  selectedList={serviceTags}
                  width={"100%"}
                  data={serviceTagsList}
                />
                <div style={{ marginTop: 8 }}>
                  <ServiceCreateCreateServiceTagModal
                    serviceTags={serviceTags}
                    setServiceTags={setServiceTags}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default ServiceCreatePage;
