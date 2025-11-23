"use client";

import { Provider } from "react-redux";
import { store } from "../store"; // adjust path

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
