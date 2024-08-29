import React, { createContext, useState } from 'react';

import { CreateUpdateUserCourse, UserCourse } from '../dashboard';
import { deleteCourseService } from '../dashboard/services/course.service';
import {
  createUserCourseServie,
  findAllUserCoursesService,
  updateUserCourseService,
} from '../dashboard/services/user-course.service';

export interface UserCoursesContextValue {
  userCourses(forced?: boolean): UserCourse[];
  createEditUserCourse(
    id: number,
    user: CreateUpdateUserCourse,
  ): Promise<boolean | string>;
  deleteUserCourse(id: number): Promise<boolean | string>;
}

export const UserCoursesContext = createContext<UserCoursesContextValue>(
  {} as UserCoursesContextValue,
);

export const UserCoursesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [_usersCourses, _setUsersCourses] = useState<UserCourse[]>([]);

  const userCourses = (forced?: boolean) => {
    if (_usersCourses.length === 0 || forced) {
      findAllUserCoursesService().then((c) =>
        c === null ? _setUsersCourses([]) : _setUsersCourses(c),
      );
    }
    return _usersCourses;
  };

  const createEditUserCourse = async (
    id: number,
    course: CreateUpdateUserCourse,
  ) => {
    if (id !== -1) {
      return await updateUserCourseService(id, course);
    }
    return await createUserCourseServie(course);
  };

  const deleteUserCourse = async (id: number) => {
    return await deleteCourseService(id);
  };

  return (
    <UserCoursesContext.Provider
      value={{
        userCourses,
        createEditUserCourse,
        deleteUserCourse,
      }}
    >
      {children}
    </UserCoursesContext.Provider>
  );
};
