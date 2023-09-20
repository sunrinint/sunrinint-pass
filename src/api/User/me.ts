import { authInstance } from "..";

export async function GetMe() {
  const res = await authInstance().get("/user/me");
  return res.data;
}

interface MeBody {
  department: string;
  class: number;
  number: number;
  profileImage?: string;
  birthday?: string;
}

export async function UpdateMe(body: Partial<MeBody>) {
  const res = await authInstance().patch("/user/me", body);
  return res.data;
}
