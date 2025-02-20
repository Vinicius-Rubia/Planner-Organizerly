import { EStudyStatus } from "@/enums";
import { IPlannerLocalStorage, IStudy } from "@/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface StudyContextProps {
  studies: IStudy[];
  createStudy: (study: Omit<IStudy, "id" | "createdAt" | "status">) => void;
  getStudiesByPlanner: (plannerId: string) => IStudy[];
  removeStudy: (id: string) => void;
}

interface StudyProps {
  children: React.ReactNode;
}

const StudyContext = createContext<StudyContextProps | undefined>(
  undefined
);

const STORAGE_KEY = "planner-organizerly";

const getStoredStudies = (): IStudy[] => {
  const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
  
    const parsedData: IPlannerLocalStorage = JSON.parse(data);
    return parsedData.studies || [];
};

export const StudyProvider = ({ children }: StudyProps) => {
  const [studies, setStudies] = useState<IStudy[]>(getStoredStudies);

  const saveStudies = (studies: IStudy[]) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const existingData: IPlannerLocalStorage = data ? JSON.parse(data) : { planners: [], studies: [] };

    existingData.studies = studies;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
  };

  useEffect(() => {
    saveStudies(studies);
  }, [studies]);

  const createStudy = (study: Omit<IStudy, "id" | "createdAt" | "status">) => {
    const newStudy: IStudy = {
      id: uuidv4(),
      title: study.title.trim(),
      createdAt: new Date(),
      dateToStudy: study.dateToStudy,
      description: study.description.trim(),
      plannerId: study.plannerId,
      status: EStudyStatus.PENDING,
      totalHours: study.totalHours
    };
    setStudies((prevStudies) => [...prevStudies, newStudy]);
  };

  const getStudiesByPlanner = (plannerId: string): IStudy[] => {
    return studies.filter((study) => study.plannerId === plannerId);
  };

  const removeStudy = (id: string) => {
    setStudies((prevStudies) =>
      prevStudies.filter((study) => study.id !== id)
    );
  };

  return (
    <StudyContext.Provider
      value={{
        studies,
        createStudy,
        getStudiesByPlanner,
        removeStudy,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = (): StudyContextProps => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error("useStudy must be used within a StudyProvider");
  }
  return context;
};
