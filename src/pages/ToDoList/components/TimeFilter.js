import { useRef } from "react";
const moment = require("moment");
moment.locale("zh-tw");

const TimeFilter = ({ finishedTime }) => {
  const timeDisplay = useRef("");
  const timeAgo = Math.floor((Date.now() - finishedTime) / 1000);
  const lessMinute = timeAgo < 60;
  const lessHours = timeAgo < 60 * 60;
  const lessDay = timeAgo < 60 * 60 * 24;

  if (lessMinute) {
    timeDisplay.current = `${timeAgo + " 秒前"}`;
  } else if (lessHours) {
    timeDisplay.current = `${Math.floor(timeAgo / 60) + " 分鐘前"}`;
  } else if (lessDay) {
    timeDisplay.current = `${Math.floor(timeAgo / (60 * 60)) + " 小時前"}`;
  } else {
    timeDisplay.current = `${moment(finishedTime).format("YYYY-MM-DD")}`;
  }

  return <div>{timeDisplay.current}</div>;
};

export default TimeFilter;
