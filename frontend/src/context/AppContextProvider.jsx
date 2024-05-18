import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  const { loginUser, logout, updateTasks, user, tasks } =
    useContext(AppContext);

  return { loginUser, logout, updateTasks, user, tasks };
};

function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const loginUser = (userVal) => {
    setUser(userVal);
  };

  const logout = () => {
    setUser(null);
  };

  const updateTasks = (task) => {
    setTasks(task);
  };

  return (
    <AppContext.Provider
      value={{
        loginUser,
        logout,
        updateTasks,
        user,
        tasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
