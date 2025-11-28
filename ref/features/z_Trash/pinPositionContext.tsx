import { createContext, useContext, useState } from 'react';

interface PinPositionContextType {
    absolutePinPosition: { x: number; y: number } | null;
    setAbsolutePinPosition: (position: { x: number; y: number } | null) => void;
    relativePinPosition: { targetId: string, relativeX: number, relativeY: number } | null;
    setRelativePinPosition: (position: { targetId: string, relativeX: number, relativeY: number } | null) => void;
}

const PinPositionContext = createContext<PinPositionContextType | null>(null);

export const PinPositionProvider = ({ children }: { children: React.ReactNode }) => {

  const [absolutePinPosition, setAbsolutePinPosition] = useState < { x: number; y: number } | null > (null);
  const [relativePinPosition, setRelativePinPosition] = useState < {
        targetId: string,
        relativeX: number,
        relativeY: number,
    } | null > (null);

  return (
    <PinPositionContext.Provider
      value={{
        absolutePinPosition,
        setAbsolutePinPosition,
        relativePinPosition,
        setRelativePinPosition,
      }}>
      {children}
    </PinPositionContext.Provider>
  );
};

export const usePinPosition = () => {
  const context = useContext(PinPositionContext);
  if (!context) {
    throw new Error('usePinPosition must be used within a PinPositionProvider');
  }
  return context;
};
