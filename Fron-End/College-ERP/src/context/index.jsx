import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }

    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "SET_THEME": {
      return { ...state, theme: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "dark",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    theme: localStorage.theme || "light",
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export const setTheme = (dispatch, value) => {
  localStorage.setItem("theme", value);
  dispatch({ type: "SET_THEME", value });
};

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });

// -----login context---------------

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState  (null);
//   const navigate = useNavigate();

//   const login = (email, password) => {

//     setUser({ email });
//     navigate("/");
//   };

//   const logout = () => {
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
