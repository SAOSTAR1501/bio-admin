import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import JobRequest from "./jobs.request";
import { JobActions, JobSelectors } from "./jobs.slice";

function* JobSaga() {
  yield takeLatest(JobActions.getJobList, getJobList);
  yield takeLatest(JobActions.getJobById, getJobById);
  yield takeLatest(JobActions.delete, deleteJob);
  yield takeLatest(JobActions.create, create);
  yield takeLatest(JobActions.update, update);
}

export default JobSaga;

function* update({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body, id } = payload;
    const rs = yield JobRequest.update(id, body);
    if (rs.success) {
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* deleteJob({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield JobRequest.delete(id);
    if (rs.success) {
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* create({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body } = payload;
    const rs = yield JobRequest.create(body);
    if (rs.success) {
      onSuccess(rs.data._id);
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* getJobList({ payload }) {
  try {
    yield delay(100);
    const { status } = payload || {};
    const pagination = yield select(JobSelectors.pagination);

    const rs = yield JobRequest.gets({
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(JobActions.setJobList(rs.data.jobs));
      yield put(JobActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getJobById({ payload }) {
  console.log(payload);
  try {
    yield delay(100);
    const rs = yield JobRequest.get(payload.id);
    console.log('rs', rs);
    if (rs.success) {
      yield put(JobActions.setJobById(rs.data.job));
    }
  } catch (error) {
    toast.error(error);
  }
}
