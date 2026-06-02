import { Outlet, useLocation } from "react-router-dom";
import GoldCursor from "./components/GoldCursor";
import StickyNav from "./components/StickyNav";

export default function App() {
  const { pathname } = useLocation();
  // Single post pages use the editorial chrome (green brand bar + progress bar),
  // so the global rainbow bar and floating StickyNav are suppressed there.
  const isPost = pathname.startsWith("/blog/");

  return (
    <>
      <GoldCursor />
      {!isPost && <StickyNav />}

      {/* Rainbow top bar */}
      {!isPost && (
        <div className="fixed top-0 left-0 right-0 z-[1000] h-1 rainbow-bar animate-gradient-shift" />
      )}

      <Outlet />
    </>
  );
}
