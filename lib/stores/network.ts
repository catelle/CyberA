"use client";

import { create } from "zustand";

type NetworkState = {
  isOnline: boolean;
  pendingCount: number;
  setOnline: (isOnline: boolean) => void;
  setPendingCount: (pendingCount: number) => void;
};

export const useNetworkStore = create<NetworkState>((set) => ({
  isOnline: true,
  pendingCount: 0,
  setOnline: (isOnline) => set({ isOnline }),
  setPendingCount: (pendingCount) => set({ pendingCount })
}));
