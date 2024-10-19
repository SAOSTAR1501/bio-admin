import AppReducer from "./app/app.slice.js";
import CustomerReducer from "./customer/customer.slice.js";
import KeywordReducer from "./keyword/keyword.slice.js";
import LoginReducer from "./login/login.slice.js";
import NotificationReducer from "./notification/notification.slice.js";
import OrderReducer from "./order/order.slice.js";
import PartnerReducer from "./partner/partner.slice.js";
import ServiceReducer from "./service/service.slice.js";
import SettingReducer from "./setting/setting.slice.js";
import TopicReducer from "./topic/topic.slice.js";
import DashBoardReducer from "./dashboard/dashboard.slice.js";
import LocalServerReducer from "./local-server/local-server.slice.js";
import SupportAccountReducer from "./support-account/support-account.slice.js";
import JobReducer from "./jobs/jobs.slice.js";
import BioReducer from "./bios/bios.slice.js";
import UserReducer from "./users/users.slide.js";
const reducer = {
  app: AppReducer,
  login: LoginReducer,
  customer: CustomerReducer,
  order: OrderReducer,
  service: ServiceReducer,
  setting: SettingReducer,
  notification: NotificationReducer,
  topic: TopicReducer,
  keyword: KeywordReducer,
  partner: PartnerReducer,
  dashboard: DashBoardReducer,
  localServer: LocalServerReducer,
  supportAccount: SupportAccountReducer,
  job: JobReducer,
  bio: BioReducer,
  user: UserReducer,
};

export default reducer;
