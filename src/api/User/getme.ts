import { authInstance } from "..";

export async function GetMe() {
  const res = await authInstance().get("/user/me");
  return res.data;
}
