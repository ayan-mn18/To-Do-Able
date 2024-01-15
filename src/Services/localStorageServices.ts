import { Column, Task } from "../types";

const localStorageService = {
    setItem: <T>(key: string, value: T): void => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: <T>(key: string): T | null => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    removeItem: (key: string): void => {
      localStorage.removeItem(key);
    },
    isLoggedIn: (): boolean => {
      let user =  localStorage.getItem("user");
      user = user ? JSON.parse(user) : null;
      if(user)  return true;
      return false;
    },
    logout: (): void => {
      localStorage.removeItem("user");
      localStorage.removeItem("columns");
      localStorage.removeItem("tasks");      
    },
    columnMapper: (data: any): Column => {
      return {
        title: data.name,
        id: data._id
      }
    },
    taskMapper: (data: any): Task => {
      return {
        id: data._id,
        columnId: data.columnId,
        content: data.content,
        originalContent: data.originalContent
      }
    },
    getColumns: (): Column[] => {
      let columns: any = localStorageService.getItem("columns");
      if(!columns)  return [];
      columns = columns.map((col: any) =>  localStorageService.columnMapper(col));
      return columns;
    },
    getTasks: (): Task[] => {
      let tasks: any = localStorageService.getItem("tasks");
      if(!tasks)  return [];
      tasks = tasks.map((t: any) => localStorageService.taskMapper(t));
      return tasks;
    }
  };
  
  export default localStorageService;