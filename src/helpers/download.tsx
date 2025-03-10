import { saveAs } from "file-saver";

export const downloadFile = (url: string, name: string) => {
  saveAs(url, name);
};
