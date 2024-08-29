import React, { createContext, useState } from 'react';

import { CategoryModality, Course, CreateUpdateCourse } from '../dashboard';
import {
  createCourseServie,
  deleteCourseService,
  findAllCategoriesService,
  findAllCoursesService,
  findAllModalitiesService,
  findAllInscriptionStatusService,
  updateCourseService,
} from '../dashboard/services/course.service';

export interface CoursesContextValue {
  courses(forced?: boolean): Course[];
  categories(forced?: boolean): CategoryModality[];
  modalities(forced?: boolean): CategoryModality[];
  inscriptions(forced?: boolean): CategoryModality[];
  createEditCourse(
    id: number,
    user: CreateUpdateCourse,
  ): Promise<boolean | string>;
  deleteCourse(id: number): Promise<boolean | string>;
}

export const CoursesContext = createContext<CoursesContextValue>(
  {} as CoursesContextValue,
);

export const CoursesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [_courses, _setCourses] = useState<Course[]>([]);
  const [_categories, _setCategories] = useState<CategoryModality[]>([]);
  const [_modality, _setModality] = useState<CategoryModality[]>([]);
  const [_inscriptions, _setInscriptions] = useState<CategoryModality[]>([]);

  const courses = (forced?: boolean) => {
    if (_courses.length === 0 || forced) {
      findAllCoursesService().then((c) =>
        c === null ? _setCourses([]) : _setCourses(c),
      );
    }
    return _courses;
  };

  const categories = (forced?: boolean) => {
    if (_categories.length === 0 || forced) {
      findAllCategoriesService().then((c) =>
        c === null ? _setCategories([]) : _setCategories(c),
      );
    }
    return _categories;
  };

  const modalities = (forced?: boolean) => {
    if (_modality.length === 0 || forced) {
      findAllModalitiesService().then((c) =>
        c === null ? _setModality([]) : _setModality(c),
      );
    }
    return _modality;
  };

  const inscriptions = (forced?: boolean) => {
    if (_inscriptions.length === 0 || forced) {
      findAllInscriptionStatusService().then((c) =>
        c === null ? _setInscriptions([]) : _setInscriptions(c),
      );
    }
    return _inscriptions;
  };

  const createEditCourse = async (id: number, course: CreateUpdateCourse) => {
    if (id !== -1) {
      return await updateCourseService(id, course);
    }
    return await createCourseServie(course);
  };

  const deleteCourse = async (id: number) => {
    return await deleteCourseService(id);
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        categories,
        modalities,
        inscriptions,
        createEditCourse,
        deleteCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
