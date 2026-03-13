import { Outlet } from "react-router-dom";
import GoldCursor from "./components/GoldCursor";
import StickyNav from "./components/StickyNav";

export default function App() {
  return (
    <>
      <GoldCursor />
      <StickyNav />

      {/* Rainbow top bar */}
      <div className="fixed top-0 left-0 right-0 z-[1000] h-1 rainbow-bar animate-gradient-shift" />

      <Outlet />
    </>
  );
}
