import { authInstance } from "..";

export async function Logout() {
  const res = await authInstance().get("/auth/logout");
  return res.data;
}
