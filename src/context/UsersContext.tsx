import React, { createContext, useState } from 'react';

import {
  CreateUpdateUser,
  createUserServie,
  deleteUserService,
  findAllRoles,
  findAllUsersService,
  updateUserService,
  type Role,
  type User,
} from '../dashboard';

export interface UsersContextValue {
  users(forced?: boolean): User[];
  roles(forced?: boolean): Role[];
  createEditUser(id: number, user: CreateUpdateUser): Promise<boolean | string>;
  deleteUser(id: number): Promise<boolean | string>;
}

export const UsersContext = createContext<UsersContextValue>(
  {} as UsersContextValue,
);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [_users, _setUsers] = useState<User[]>([]);
  const [_roles, _setRoles] = useState<Role[]>([]);

  const users = (forced?: boolean) => {
    if (_users.length === 0 || forced) {
      findAllUsersService().then((u) =>
        u === null ? _setUsers([]) : _setUsers(u),
      );
    }
    return _users;
  };

  const roles = (forced?: boolean) => {
    if (_roles.length === 0 || forced) {
      findAllRoles().then((r) => (r === null ? _setRoles([]) : _setRoles(r)));
    }
    return _roles;
  };

  const createEditUser = async (id: number, user: CreateUpdateUser) => {
    if (id !== -1) {
      return await updateUserService(id, user);
    }
    return await createUserServie(user);
  };

  const deleteUser = async (id: number) => {
    return await deleteUserService(id);
  };

  return (
    <UsersContext.Provider value={{ users, roles, createEditUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};
