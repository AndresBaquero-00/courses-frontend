import api from '../../api';
import { Role } from '../interfaces';

export const findAllRoles = async () => {
  try {
    const res = await api.get<Role[]>('/roles');
    return res.data;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
