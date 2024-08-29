import api from '../../api';
import { LoginResponse } from '../interfaces';

export const loginService = async (email: string) => {
  try {
    const res = await api.post<LoginResponse>('/auth/login', { email });
    localStorage.setItem('token', res.data.token);
    return res;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
