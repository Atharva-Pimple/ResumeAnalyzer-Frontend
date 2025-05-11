import axios from "axios";

export function getAnalysis(file, token) {
  const formdata = new FormData();
  formdata.append("file", file);
  return axios.post("http://localhost:3000/api/resume/file", formdata, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

