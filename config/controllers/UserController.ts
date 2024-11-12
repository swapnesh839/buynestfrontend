import { ApiResponse, HttpClient } from "./HttpClient";
interface LoginData {
  email: string;
  password: string;
}

export const login = async (
  data: LoginData
): Promise<ApiResponse<{ token: string }>> => {
  const url = "/api/admin/login";
  return HttpClient.apiCaller<{ token: string }>({
    uri: url,
    method: "POST",
    data: data,
  });
};
export const UserController = {
  login
};
