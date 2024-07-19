import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import LocalServerRequest from "./local-server.request";
import { LocalServerActions, LocalServerSelectors } from "./local-server.slice";

function* ServiceSaga() {
  yield takeLatest(LocalServerActions.getLocalServerList, getLocalServerList);
  yield takeLatest(LocalServerActions.getLocalServerById, getLocalServerById);
  yield takeLatest(LocalServerActions.delete, deleteLocalServer);
  yield takeLatest(LocalServerActions.create, create);
  yield takeLatest(LocalServerActions.update, update);
}

export default ServiceSaga;

function* update({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body, id } = payload;
    const rs = yield LocalServerRequest.update(id, body);
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

function* deleteLocalServer({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield LocalServerRequest.delete(id);
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
    const rs = yield LocalServerRequest.create(body);
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

function* getLocalServerList({ payload }) {
  try {
    yield delay(100);
    const { status } = payload || {};
    const pagination = yield select(LocalServerSelectors.pagination);

    const rs = yield LocalServerRequest.getLocalServerList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...(status !== undefined ? { status } : {}),
    });

    if (rs.success) {
      yield put(LocalServerActions.setLocalServerList(rs.data.localServers));
      yield put(LocalServerActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getLocalServerById({ payload }) {
  console.log(payload);
  try {
    yield delay(100);
    const rs = yield LocalServerRequest.getLocalServerById(payload.id);

    if (rs.success) {
      yield put(LocalServerActions.setLocalServerById(rs.data.localServer));
    }
  } catch (error) {
    toast.error(error);
  }
}
