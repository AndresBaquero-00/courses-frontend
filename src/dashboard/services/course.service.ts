import { AxiosError } from 'axios';
import api from '../../api';
import { CategoryModality, Course, CreateUpdateCourse } from '../interfaces';

export const findAllCoursesService = async () => {
  try {
    const res = await api.get<Course[]>('/courses');
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const findAllCategoriesService = async () => {
  try {
    const res = await api.get<CategoryModality[]>('/courses/categories');
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const findAllModalitiesService = async () => {
  try {
    const res = await api.get<CategoryModality[]>('/courses/modalities');
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const findAllInscriptionStatusService = async () => {
  try {
    const res = await api.get<CategoryModality[]>(
      '/courses/inscription-status',
    );
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const createCourseServie = async (user: CreateUpdateCourse) => {
  try {
    await api.post<{ id: number }>('/courses', user);
    return true;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};

export const updateCourseService = async (
  id: number,
  user: CreateUpdateCourse,
) => {
  try {
    await api.patch(`/courses/${id}`, user);
    return true;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};

export const deleteCourseService = async (id: number) => {
  try {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    const err = e as AxiosError;
    return (err.response?.data as { message: string }).message as string;
  }
};
