import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BioActions,
  BioSelectors,
} from "../../app/services/bios/bios.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";

function BioUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bioList = useSelector(BioSelectors.list);
  const pagination = useSelector(BioSelectors.pagination);

  useEffect(() => {
    dispatch(BioActions.getBioList());
  }, [pagination.page, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(BioActions.resetSession());
    };
  }, [navigate, dispatch]);

  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      name: "Tên bio",
      style: { width: 200 },
      className: "",
    },
    {
      name: "Ngành nghề",
      style: { width: 200 },
    },
    {
      name: "Đường dẫn",
      style: {
        textAlign: "left",
      },
    },
  ];

  const genRenderList = useCallback(() => {
    return (bioList || []).map((x, index) => {
      return [
        { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
        {
          value: x?.fullName,
        },
        {
          value: x?.job?.name,
        },
        {
          value: x?.bioLink,
          style: {
            textAlign: "left",
            color: "#FF8900",
          },
        },
      ];
    });
  }, [bioList, pagination]);

  const onChangePage = (page) => {
    dispatch(
      BioActions.setPagination({
        ...pagination,
        page,
      })
    );
  };

  return (
    <div>
      <MST.Table head={thead} body={genRenderList()} />
      <div className="order-pagination">
        <Pagination
          onChange={onChangePage}
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalPage={pagination.totalPage}
          total={pagination.total}
        />
      </div>
    </div>
  );
}

export default BioUser;
