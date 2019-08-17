import moment from "moment";

export const parseUkDate = (ukDateString: string) =>
  moment(ukDateString, "DD/MM/YYYY HH:mm").toDate();

export const formatUkDate = (date: Date) => moment(date).format("DD/MM/YYYY");
