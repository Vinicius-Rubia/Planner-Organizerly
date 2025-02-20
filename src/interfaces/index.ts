import { EPlannerStatus, EStudyStatus } from "@/enums";

export interface IPlanner {
  id: string;
  title: string;
  totalHours: number;
  dateCompleted?: Date;
  createdAt: Date;
  totalCompleted: number;
  status: EPlannerStatus;
}

export interface IStudy {
  id: string;
  plannerId: string;
  title: string;
  description: string;
  totalHours: number;
  createdAt: Date;
  dateToStudy: Date;
  status: EStudyStatus;
}

export interface IPlannerLocalStorage {
  planners: IPlanner[];
  studies: IStudy[];
}
