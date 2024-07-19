import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LocalServerActions, LocalServerSelectors } from "../../app/services/local-server/local-server.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import { sGenColor } from "../service/ServiceList";
import LocalServerDeleteModal from "./LocalServer.Options";

function LocalServerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localServerList = useSelector(LocalServerSelectors.list);
  const pagination = useSelector(LocalServerSelectors.pagination);

  useEffect(() => {
    dispatch(LocalServerActions.getLocalServerList());
  }, [pagination.page, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(LocalServerActions.resetSession());
    };
  }, [navigate, dispatch]);

  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      name: "Name",
      style: {
        textAlign: "left",
      },
    },
    {
      name: "Trạng thái",
      style: {
        width: 140,
      },
    },
    {
      name: "Thao tác",
      style: { width: 100 },
    },
  ];

  const genRenderList = useCallback(() => {
    return (localServerList || []).map((x, index) => {
      return [
        { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
        {
          value: x?.name,
          style: {
            textAlign: "left",
          },
        },
        {
          value: x.status ? "Hoạt động" : "Ngừng hoạt động",
          style: {
            color: sGenColor(x.status ? "active" : "unactive"),
          },
        },
        {
          value: <LocalServerDeleteModal id={x._id} />,
        },
      ];
    });
  }, [localServerList]);

  const onChangePage = (page) => {
    dispatch(
      LocalServerActions.setPagination({
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

export default LocalServerList;
