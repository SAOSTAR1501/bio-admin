import { all, call } from "redux-saga/effects";
import CustomerSaga from "./customer/customer.saga";
import LoginSaga from "./login/login.saga";
import OrderSaga from "./order/order.saga";
import ServiceSaga from "./service/service.saga";
import SettingSaga from "./setting/setting.saga";
import NotificationSaga from "./notification/notification.saga";
import TopicSaga from "./topic/topic.saga";
import KeywordSaga from "./keyword/keyword.saga";
import PartnerSaga from "./partner/partner.saga";
import DashBoardSaga from "./dashboard/dashboard.saga";
import LocalServerSaga from "./local-server/local-server.saga";
import SupportAccountSaga from "./support-account/support-account.saga";
import JobSaga from "./jobs/jobs.saga";
import BioSaga from "./bios/bios.saga";
import UserSaga from "./users/users.saga";
function* rootSaga() {
  yield all([
    call(LoginSaga),
    call(CustomerSaga),
    call(OrderSaga),
    call(ServiceSaga),
    call(SettingSaga),
    call(NotificationSaga),
    call(TopicSaga),
    call(KeywordSaga),
    call(PartnerSaga),
    call(DashBoardSaga),
    call(LocalServerSaga),
    call(SupportAccountSaga),
    call(JobSaga),
    call(BioSaga),
    call(UserSaga)
  ]);
}

export default rootSaga;
