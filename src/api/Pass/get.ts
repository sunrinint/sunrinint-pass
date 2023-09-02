import { authInstance } from "..";
import { userInfo } from "../../stores/info";

export async function Get() {
  const res = await authInstance().get("/pass");
  return res.data;
}

export async function GetEncrypted() {
  const res = await authInstance().get("/pass/encrypt");
  return res.data;
}
