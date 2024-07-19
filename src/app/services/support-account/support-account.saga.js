import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import SupportAccountRequest from "./support-account.request";
import { SupportAccountActions, SupportAccountSelectors } from "./support-account.slice";

function* SupportAccountSaga() {
  yield takeLatest(SupportAccountActions.getSupportAccountList, getSupportAccountList);
  yield takeLatest(SupportAccountActions.getSupportAccountById, getSupportAccountById);
  yield takeLatest(SupportAccountActions.delete, deleteSupportAccount);
  yield takeLatest(SupportAccountActions.create, create);
  yield takeLatest(SupportAccountActions.update, update);
}

export default SupportAccountSaga;

function* update({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body, id } = payload;
    const rs = yield SupportAccountRequest.update(id, body);
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

function* deleteSupportAccount({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield SupportAccountRequest.delete(id);
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
    const rs = yield SupportAccountRequest.create(body);
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

function* getSupportAccountList({ payload }) {
  try {
    yield delay(100);
    const { status } = payload || {};
    const pagination = yield select(SupportAccountSelectors.pagination);

    const rs = yield SupportAccountRequest.gets({
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(SupportAccountActions.setSupportAccountList(rs.data.supports));
      yield put(SupportAccountActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getSupportAccountById({ payload }) {
  console.log(payload);
  try {
    yield delay(100);
    const rs = yield SupportAccountRequest.get(payload.id);

    if (rs.success) {
      yield put(SupportAccountActions.setSupportAccountById(rs.data.support));
    }
  } catch (error) {
    toast.error(error);
  }
}
