//  create a dashboard context

import React, { createContext, useEffect, useReducer } from 'react';

const DashboardContext = createContext();

const initialState = {
  dashboard: {},
  isLoading: true,
  error: null,
};

const reducer = (state, action) => {

  switch (action.type) {
      case 'GET_DASHBOARD':
        return {
          ...state,
          isLoading: true,
        };
      case 'GET_DASHBOARD_SUCCESS':
        return {
          ...state,
          dashboard: action.payload,
          isLoading: false,
        };
      case 'GET_DASHBOARD_ERROR':
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
};

const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };