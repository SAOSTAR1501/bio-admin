import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JobActions, JobSelectors } from "../../app/services/jobs/jobs.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import JobDeleteModal from "./Job.Options";

function JobList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobList = useSelector(JobSelectors.list);
  const pagination = useSelector(JobSelectors.pagination);

  useEffect(() => {
    dispatch(JobActions.getJobList());
  }, [pagination.page, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(JobActions.resetSession());
    };
  }, [navigate, dispatch]);

  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      name: "Mã ngành nghề",
      style: { width: 200 },
      className: "",
    },
    {
      name: "Tên ngành nghề",
      style: {
        textAlign: "left",
      },
    },
    {
      name: "Thao tác",
      style: { width: 100 },
    },
  ];

  const genRenderList = useCallback(() => {
    return (jobList || []).map((x, index) => {
      return [
        { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
        {
          value: x?.code,
        },
        {
          value: x?.name,
          style: {
            textAlign: "left",
          },
        },
        {
          value: <JobDeleteModal id={x._id} />,
        },
      ];
    });
  }, [jobList]);

  const onChangePage = (page) => {
    dispatch(
      JobActions.setPagination({
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

export default JobList;
