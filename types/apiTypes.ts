// src/types/apiTypes.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  data: User;
}
