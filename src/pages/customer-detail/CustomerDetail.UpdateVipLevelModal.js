import React, { useEffect, useState } from "react";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { CustomerActions } from "../../app/services/customer/customer.slice";
import Select from "../../components/base/select/Select";

function UpdateVipLevelModal({ id, customerDetail, onHide }) {
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      CustomerActions.update({
        id,
        body: {
          vipLevel: vipLevel.value,
        },
        onSuccess: onHide,
      })
    );
  };

  const vipLevelList = [
    { name: "0", value: 0 },
    { name: "1", value: 1 },
  ];
  const [vipLevel, setVipLevel] = useState({
    name: "0",
    value: 0,
  });

  useEffect(() => {
    setVipLevel(
      vipLevelList.find(
        (level) => level.value === (customerDetail?.vipLevel || 0)
      )
    );
  }, [customerDetail]);

  return (
    <div>
      <div className="modal-header">Thay đổi cấp độ VIP</div>
      <div className="modal-body">
        <Select.Simple
          placeholder="Chọn cấp độ VIP"
          selected={vipLevel}
          setSelected={setVipLevel}
          width={400}
          data={vipLevelList}
        />
      </div>
      <div className="modal-footer">
        <div className="d-flex jc-between">
          <div />
          <MST.Button onClick={onSubmit}>Xác nhận</MST.Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVipLevelModal;
