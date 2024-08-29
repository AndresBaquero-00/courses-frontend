import { AxiosError } from 'axios';
import api from '../../api';
import { CreateUpdateUser, User } from '../interfaces';

export const findAllUsersService = async () => {
  try {
    const res = await api.get<User[]>('/users');
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const createUserServie = async (user: CreateUpdateUser) => {
  try {
    await api.post<{ id: number }>('/users', user);
    return true;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};

export const updateUserService = async (id: number, user: CreateUpdateUser) => {
  try {
    await api.patch(`/users/${id}`, user);
    return true;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};

export const deleteUserService = async (id: number) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};
