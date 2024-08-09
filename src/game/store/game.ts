import { create } from 'zustand';

type State = {
  paused: boolean;
  playing: boolean;
  pause: () => void;
  play: () => void;
  start: () => void;
  finish: () => void;
};
export const useGameStore = create<State>((set) => ({
  paused: false,
  playing: false,
  pause: () => set((state) => ({ ...state, paused: true })),
  play: () => set((state) => ({ ...state, paused: false })),
  start: () => set((state) => ({ ...state, playing: true })),
  finish: () => set((state) => ({ ...state, playing: false, paused: false })),
}));
