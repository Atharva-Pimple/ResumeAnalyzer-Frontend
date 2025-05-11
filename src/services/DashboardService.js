import axios from "axios";
export function getAnalysis(file) {
  const formdata = new FormData();
  formdata.append("file", file);
  return axios.post("http://localhost:3000/api/resume/file", formdata, {
    headers: {
      'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF0aGFuZyIsInVzZXJJRCI6ImZkY2U5ZjAxLWJkYjktNGNiNS04ZGNkLTk2NTAwZTFiNmViYyIsImlhdCI6MTc0NjkzODY1NCwiZXhwIjoxNzQ2OTQyMjU0fQ.NoK1LjVTQrGtLlzXizO9SKWpNcBQfxSYv3aGMGv1wBU`,
      'Content-Type': 'multipart/form-data'
    },
  });
}
