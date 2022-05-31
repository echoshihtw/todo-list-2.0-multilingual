import { useRef } from "react";
import { useTranslation } from "react-i18next";
const moment = require("moment");
moment.locale("zh-tw");

const TimeFilter = ({ finishedTime }) => {
  const currentLng = localStorage.getItem("i18nextLng");
  const { t } = useTranslation(["task"]);
  const timeDisplay = useRef("");

  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_TWO_MINUTES = 120;
  const SECONDS_PER_HOUR = 3_600;
  const SECONDS_PER_TWO_HOURS = 7_200;
  const SECONDS_PER_DAY = 86_400;
  const LANGUAGES_WITH_DIFFERENT_GRAMMAR = ["de-DE", "fr-FR", "es-ES"];

  const timeAgo = Math.floor((Date.now() - finishedTime) / 1000);
  const lessThanAMinute = timeAgo < SECONDS_PER_MINUTE;
  const lessThanAnHour = timeAgo < SECONDS_PER_HOUR;
  const lessThanADay = timeAgo < SECONDS_PER_DAY;

  if (
    LANGUAGES_WITH_DIFFERENT_GRAMMAR.some((language) => language === currentLng)
  ) {
    if (lessThanAMinute) {
      timeAgo === 1
        ? (timeDisplay.current = `${t("ago")} ${timeAgo} ${t("second")}`)
        : (timeDisplay.current = `${t("ago")} ${timeAgo} ${t("seconds")}`);
    } else if (lessThanAnHour) {
      timeAgo >= SECONDS_PER_MINUTE && timeAgo < SECONDS_PER_TWO_MINUTES
        ? (timeDisplay.current = `${t("ago")} ${Math.floor(timeAgo / 60)}  ${t(
            "minute"
          )}`)
        : (timeDisplay.current = `${t("ago")} ${Math.floor(timeAgo / 60)}  ${t(
            "minutes"
          )}`);
    } else if (lessThanADay) {
      timeAgo >= SECONDS_PER_HOUR && timeAgo < SECONDS_PER_TWO_HOURS
        ? (timeDisplay.current = `${t("ago")} ${Math.floor(
            timeAgo / (60 * 60)
          )} ${t("hour")}`)
        : (timeDisplay.current = `${t("ago")} ${Math.floor(
            timeAgo / (60 * 60)
          )} ${t("hours")}`);
    } else {
      timeDisplay.current = `${moment(finishedTime).format("YYYY-MM-DD")}`;
    }
  } else {
    if (lessThanAMinute) {
      timeAgo === 1
        ? (timeDisplay.current = `${timeAgo} ${t("secondAgo")}`)
        : (timeDisplay.current = `${timeAgo} ${t("secondsAgo")}`);
    } else if (lessThanAnHour) {
      timeAgo >= SECONDS_PER_MINUTE && timeAgo < SECONDS_PER_TWO_MINUTES
        ? (timeDisplay.current = `${Math.floor(timeAgo / 60)}  ${t(
            "minuteAgo"
          )}`)
        : (timeDisplay.current = `${Math.floor(timeAgo / 60)}  ${t(
            "minutesAgo"
          )}`);
    } else if (lessThanADay) {
      timeAgo >= SECONDS_PER_HOUR && timeAgo < SECONDS_PER_TWO_HOURS
        ? (timeDisplay.current = `${Math.floor(timeAgo / (60 * 60))} ${t(
            "hourAgo"
          )}`)
        : (timeDisplay.current = `${Math.floor(timeAgo / (60 * 60))} ${t(
            "hoursAgo"
          )}`);
    } else {
      timeDisplay.current = `${moment(finishedTime).format("YYYY-MM-DD")}`;
    }
  }

  return <div>{timeDisplay.current}</div>;
};

export default TimeFilter;
