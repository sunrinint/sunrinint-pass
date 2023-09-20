import axios from "axios";

export async function Upload(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios
    .create({
      baseURL: import.meta.env.PUBLIC_CDN_URL,
    })
    .post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  return res.data;
}
