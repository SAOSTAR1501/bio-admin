import { toast } from "react-toastify";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
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
    const response = yield JobRequest.update(id, body);
    if (response.success) {
      onSuccess();
    } else {
      throw response.message;
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
    const response = yield JobRequest.delete(id);
    if (response.success) {
      onSuccess();
    } else {
      throw response.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* create({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body } = payload;
    const response = yield JobRequest.create(body);
    if (response.success) {
      onSuccess(response.data._id);
    } else {
      throw response.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* getJobList({ payload }) {
  try {
    yield delay(100);
    yield put(JobActions.setLoading(true));
    yield put(JobActions.setError(null));
    const pagination = yield select(JobSelectors.pagination);
    const {page = pagination.page, pageSize = pagination.pageSize} = payload || {};
    const response = yield call(JobRequest.gets,{page,pageSize});
    if (response.success) {
      yield put(JobActions.setJobList(response.data.jobs));
      yield put(JobActions.setPagination(response.data.pagination));
    } else {
    throw new Error(response.message || "Failed to fetch user list");
  }
} catch (error) {
  console.error("Error fetching user list:", error);
  toast.error(error.message || "An error occurred while fetching the user list");
  yield put(JobActions.setError(error.message || "Failed to fetch user list"));
  yield put(JobActions.setJobList([]));
} finally {
  yield put(JobActions.setLoading(false));
}
}

function* getJobById({ payload }) {
  console.log(payload);
  try {
    yield delay(100);
    const response = yield JobRequest.get(payload.id);
    if (response.success) {
      yield put(JobActions.setJobById(response.data.job));
    }
  } catch (error) {
    toast.error(error);
  }
}
