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
      className:"bg-blue-500",
    },
    {
      name: "Mã ngành nghề",
      className: "",
    },
    {
      name: "Tên ngành nghề",
    },
    {
      name: "Thao tác",
    },
  ];

  const genRenderList = useCallback(() => {
    return (jobList || []).map((job, index) => {
      return [
        { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
        {
          value: job?.code,
        },
        {
          value: job?.name,

        },
        {
          value: <JobDeleteModal id={job._id} />,
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
