export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verifiedEmailAt: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUpdateUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  role: number;
}

export interface Course {
  id: number;
  name: string;
  duration: number;
  couta: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryModality;
  modality: CategoryModality;
}

export interface CategoryModality {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUpdateCourse {
  name: string;
  duration: number;
  couta: number;
  category: number;
  modality: number;
}

export interface UserCourse {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  course: Course;
  inscriptionStatus: InscriptionStatus;
}

export interface InscriptionStatus {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUpdateUserCourse {
  user: number;
  course: number;
  inscriptionStatus: number;
}
