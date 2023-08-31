import { authInstance } from "..";

export async function Get() {
  const res = await authInstance().get("/pass");
  return res.data;
}
