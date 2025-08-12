import { createContext, useContext, useState } from "react";

interface TestGuardContextProps {
  isDoingTest: boolean;
  setIsDoingTest: (v: boolean) => void;
}

const TestGuardContext = createContext<TestGuardContextProps | null>(null);

export const TestGuardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDoingTest, setIsDoingTest] = useState(false);

  return (
    <TestGuardContext.Provider value={{ isDoingTest, setIsDoingTest }}>
      {children}
    </TestGuardContext.Provider>
  );
};

export const useTestGuard = () => {
  const ctx = useContext(TestGuardContext);
  if (!ctx)
    throw new Error("UseTextGuard must be used inside <TextGuardProvider>");
  return ctx;
};
