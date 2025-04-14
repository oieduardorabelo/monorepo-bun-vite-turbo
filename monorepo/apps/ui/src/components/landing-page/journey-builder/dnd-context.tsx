import { createContext, useContext, useState } from "react";
import type React from "react";
import type { DnDContextType } from "./types";

export const DnDContext = createContext<DnDContextType>([
  null,
  (_) => {
    //keeping empty block for now as following docs
  },
]);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};

export const useDnD = (): DnDContextType => {
  return useContext(DnDContext);
};
