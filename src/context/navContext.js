import React, { useState, useContext } from "react";

const NavContext = React.createContext();
const NavProvider = ({ children }) => {
  const [selectOther, setSelectOther] = useState("other-1");
  const [mouseOver, setMouseOver] = useState(null);
  const [selectLinks, setSelectLinks] = useState(null);
  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (selectOther === id) {
      setSelectOther("other-1");
    } else {
      setSelectOther(id);
    }
  };
  const handleMouse = (e) => {
    const id = e.currentTarget.id;
    if (mouseOver === id) {
      setMouseOver(null);
    } else {
      setMouseOver(id);
    }
  };

  return (
    <NavContext.Provider
      value={{
        handleClick,
        handleMouse,
        mouseOver,
        selectOther,
        setMouseOver,
        selectLinks,
        setSelectLinks,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
const useNavContext = () => {
  return useContext(NavContext);
};
export { NavProvider, NavContext, useNavContext };
