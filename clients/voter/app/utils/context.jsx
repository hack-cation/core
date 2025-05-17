import React from "react";
import { uniqueId } from "./uniqueId";

const IdContext = React.createContext(uniqueId());

export const useUniqueId = () => React.useContext(IdContext);

export function ContextProvider({children}) {
  return (
    <IdContext.Provider value={uniqueId()}>
      {children}
    </IdContext.Provider>
  );
}