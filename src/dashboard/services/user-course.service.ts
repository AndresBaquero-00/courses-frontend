import { AxiosError } from 'axios';
import api from '../../api';
import { CreateUpdateUserCourse, UserCourse } from '../interfaces';

export const findAllUserCoursesService = async () => {
  try {
    const res = await api.get<UserCourse[]>('/courses/user-course');
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const createUserCourseServie = async (user: CreateUpdateUserCourse) => {
  try {
    await api.post<{ id: number }>('/courses/user-course', user);
    return true;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};

export const updateUserCourseService = async (
  id: number,
  user: CreateUpdateUserCourse,
) => {
  try {
    await api.patch(`/courses/user-course/${id}`, user);
    return true;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};

export const deleteUserCourseService = async (id: number) => {
  try {
    const res = await api.delete(`/courses/user-course/${id}`);
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};
