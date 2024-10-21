import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import { UserActions, UserSelectors } from "../../app/services/users/users.slide";
import { UserDeleteModal } from "./User.Options";


function UserList() {
  const dispatch = useDispatch();
  const userList = useSelector(UserSelectors.list);
  const pagination = useSelector(UserSelectors.pagination);
  const isLoading = useSelector(UserSelectors.isLoading);
  const error = useSelector(UserSelectors.error);

  useEffect(() => {
    dispatch(UserActions.getUserList({ page: 1, pageSize: 5 }));
  }, [dispatch]);

  const genRenderList = useCallback(() => {
    return (userList || []).map((user, index) => [
      { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
      { value: user.fullName},
      { value: user.username },
      { value: user.phoneNumber},
      { value: <UserDeleteModal id={user._id} /> },
    ]);
  }, [userList, pagination.page, pagination.pageSize]);
  const onChangePage = (page) => {
    dispatch(UserActions.getUserList({ page ,pageSize:5}));
  };

  const thead = [
    { name: "STT" },
    { name: "Tên người dùng"},
    { name: "Email người dùng" },
    { name: "SĐT người dùng" },
    { name: "Thao tác" },
  ];

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

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

export default UserList;