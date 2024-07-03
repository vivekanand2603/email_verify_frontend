//  create a dashboard context

import React, { createContext, useReducer } from 'react';

const DashboardContext = createContext();

const initialState = {
  dashboard: {},
  isLoading: true,
  error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DASHBOARD':
        return { ...state, ...action.payload };
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