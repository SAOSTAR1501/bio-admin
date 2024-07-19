import SysFetch from "../../fetch";
import qs from "qs";

const SupportAccountRequest = {
  gets: (body) => {
    return SysFetch.get(
      `bios?${qs.stringify(body, { encode: false })}`
    );
  },
};

export default SupportAccountRequest;
