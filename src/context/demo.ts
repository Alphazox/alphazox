import { createContext, useContext } from 'react';

export const DemoContext = createContext<{ openDemo: () => void }>({ openDemo: () => {} });

export const useDemo = () => useContext(DemoContext);
