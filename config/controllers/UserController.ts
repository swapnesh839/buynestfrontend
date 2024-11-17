import { ApiResponse, HttpClient } from "./HttpClient";
interface LoginData {
  email: string;
  password: string;
}

export const login = async (
  data: LoginData
): Promise<ApiResponse<{message:string}>> => {
  const url = "/api/admin/login";
  return HttpClient.apiCaller<{message:string}>({
    uri: url,
    method: "POST",
    data: data,
  });
};
export const UserController = {
  login
};
