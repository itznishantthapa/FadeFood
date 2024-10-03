import React, { useState } from 'react';
import { createContext } from 'react';

// Create the context
const MyContext = createContext();
// Context Provider component
export const AppProvider = ({ children }) => {
  const [numberOfItemOrdered, setnumberOfItemOrdered] = useState(null)
 

  return (
    <MyContext.Provider value={{numberOfItemOrdered,setnumberOfItemOrdered}}>
      {children}
    </MyContext.Provider>
  );
};

// Exporting context for use in other components
export { MyContext };
