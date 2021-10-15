import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // const history = useHistory()
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // history.push(pathname)
  }, [pathname]);

  return null;
}