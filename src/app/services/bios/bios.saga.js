import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import BioRequest from "./bios.request";
import { BioActions, BioSelectors } from "./bios.slice";

function* BioSaga() {
  yield takeLatest(BioActions.getBioList, getBioList);
}

export default BioSaga;


function* getBioList({ payload }) {
  try {
    yield delay(100);
    const pagination = yield select(BioSelectors.pagination);

    const rs = yield BioRequest.gets({
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(BioActions.setBioList(rs.data.bios));
      yield put(BioActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}
