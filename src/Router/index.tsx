import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "../page/Home";
import { AboutPomodoro } from "../page/AboutPomodoro";
import { NotFound } from "../page/NotFound";
import { useEffect } from "react";
import { History } from "../page/History";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/about-pomodoro" element={<AboutPomodoro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
