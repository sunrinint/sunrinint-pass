import { authInstance } from "..";
import { userInfo } from "../../stores/info";

export async function Get() {
  const res = await authInstance().get("/pass");
  return res.data;
}
