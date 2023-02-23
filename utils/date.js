import moment from "moment-timezone";

export const getCounterTime = () => {
  return Number(
    moment.tz("2022-10-12 14:00:00", "Europe/Brussels").format("x")
  );
};
