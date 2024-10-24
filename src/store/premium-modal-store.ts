import { create } from "zustand";

interface PremiumModalState {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const usePremiumModal = create<PremiumModalState>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default usePremiumModal;
