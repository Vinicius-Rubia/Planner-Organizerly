import { EPlannerStatus } from "@/enums";
import { IPlanner, IPlannerLocalStorage } from "@/interfaces";
import { isAfter } from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface PlannerContextProps {
  planners: IPlanner[];
  createPlanner: (title: string) => void;
  getPlanners: () => IPlanner[];
  updatePlannerTitle: (id: string, newTitle: string) => void;
  removePlanner: (id: string) => void;
  updateDetails: (id: string, totalHours: number, date: Date) => void;
}

interface PlannerProps {
  children: React.ReactNode;
}

const PlannerContext = createContext<PlannerContextProps | undefined>(
  undefined
);

const STORAGE_KEY = "planner-organizerly";

const getStoredPlanners = (): IPlanner[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  const parsedData: IPlannerLocalStorage = JSON.parse(data);
  return parsedData.planners || [];
};

const verifyDateExists = (beforeDate: Date | undefined, afterDate: Date): Date => {
  if (beforeDate) {
    return isAfter(beforeDate, afterDate) ? beforeDate : afterDate;
  }

  return afterDate;
}

export const PlannerProvider = ({ children }: PlannerProps) => {
  const [planners, setPlanners] = useState<IPlanner[]>(getStoredPlanners);

  const savePlanners = (planners: IPlanner[]) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const existingData: IPlannerLocalStorage = data ? JSON.parse(data) : { planners: [], studies: [] };
  
    existingData.planners = planners;
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
  };

  useEffect(() => {
    savePlanners(planners);
  }, [planners]);

  const createPlanner = (title: string) => {
    const newPlanner: IPlanner = {
      id: uuidv4(),
      title: title.trim(),
      createdAt: new Date(),
      totalCompleted: 0,
      totalHours: 0,
      status: EPlannerStatus.PENDING,
    };
    setPlanners((prevPlanners) => [...prevPlanners, newPlanner]);
  };

  const getPlanners = (): IPlanner[] => {
    return planners;
  };

  const updatePlannerTitle = (id: string, newTitle: string) => {
    setPlanners((prevPlanners) =>
      prevPlanners.map((planner) =>
        planner.id === id ? { ...planner, title: newTitle.trim() } : planner
      )
    );
  };

  const updateDetails = (id: string, totalHours: number, date: Date) => {
    setPlanners((prevPlanners) =>
      prevPlanners.map((planner) =>
        planner.id === id ? { ...planner, totalHours: planner.totalHours + totalHours, dateCompleted: verifyDateExists(planner.dateCompleted, date) } : planner
      )
    );
  }

  const removePlanner = (id: string) => {
    setPlanners((prevPlanners) =>
      prevPlanners.filter((planner) => planner.id !== id)
    );
  };

  return (
    <PlannerContext.Provider
      value={{
        planners,
        createPlanner,
        getPlanners,
        updatePlannerTitle,
        removePlanner,
        updateDetails,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = (): PlannerContextProps => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error("usePlanner must be used within a PlannerProvider");
  }
  return context;
};
