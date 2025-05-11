import axios from "axios";
import { getToken } from "./userServices";

const token = getToken();


export function getAnalysis(file) {
  const formdata = new FormData();
  formdata.append("file", file);
  return axios.post("http://localhost:3000/api/resume/file", formdata, {
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
  });
}

function hello(){
  console.log("hello");
}
