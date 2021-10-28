import React, { useContext, createContext } from "react";

const MainContext = createContext();
const MainProvider = ({ children, profile, mainID }) => {
  return (
    <MainContext.Provider
      value={{
        profile,
        mainID,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => {
  return useContext(MainContext);
};
export { MainContext, MainProvider, useMainContext };
