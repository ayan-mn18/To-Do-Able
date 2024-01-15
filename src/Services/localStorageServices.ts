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
    }
  };
  
  export default localStorageService;