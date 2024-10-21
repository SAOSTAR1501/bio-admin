import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
import UserRequest from "./users.request";
import { UserActions, UserSelectors } from "./users.slide";
import { delay } from "lodash";


function* UserSaga() {
  yield takeLatest(UserActions.getUserList.type, getUserList)
  yield takeLatest(UserActions.delete,deleteUser);
}

function* getUserList({ payload }) {
    try {
      yield put(UserActions.setLoading(true));
      yield put(UserActions.setError(null)); // Reset error
      const pagination = yield select(UserSelectors.pagination);
      const { page = pagination.page, pageSize =5} = payload || {};
      const response = yield call(UserRequest.gets, { page, pageSize });
  
      if (response.success) {
        yield put(UserActions.setUserList(response.data.customers));
        yield put(UserActions.setPagination(response.data.pagination));
      } else {
        throw new Error(response.message || "Failed to fetch user list");
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
      toast.error(error.message || "An error occurred while fetching the user list");
      yield put(UserActions.setError(error.message || "Failed to fetch user list"));
      yield put(UserActions.setUserList([]));
    } finally {
      yield put(UserActions.setLoading(false));
    }
  }

  function* deleteUser({payload}) {
    try {
      yield delay(100);
      const {id, onSuccess} =payload;
      const response = yield UserRequest.delete(id);
      if (response.success) {
        onSuccess();
      } else {
        throw response.message;
      }
    } catch (error) {
      toast.error(error);
    }
  }

// ... other saga functions remain the same

export default UserSaga;