import moment from "moment";

export const parseUkDate = (ukDateString: string) =>
  moment(ukDateString, "DD/MM/YYYY HH:mm").toDate();
