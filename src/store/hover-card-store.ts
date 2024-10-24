import { create } from "zustand";

interface HoverCardProps {
  hovered: string | null;
  setHovered: (id: string|null) => void;
}

export const useHoverStore = create<HoverCardProps>((set) => ({
  hovered: null,
  setHovered: (id: string|null) => set({ hovered: id }),
}));
