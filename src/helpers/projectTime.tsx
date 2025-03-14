import moment from "moment";

export const projectTime = (date: string, amount: any, unit: string) => {
  return moment(date).add(amount, unit).format("YYYY-MM-DD");
};
