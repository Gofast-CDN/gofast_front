import { useState, useEffect } from "react";

const SIDEBAR_KEY = "sidebar:state";

export const useSidebarState = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_KEY);
    return savedState !== "false";
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_KEY, String(isOpen));
  }, [isOpen]);

  return [isOpen, setIsOpen] as const;
};
