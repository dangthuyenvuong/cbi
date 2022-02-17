import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { router } from "routers"

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname !== router.myOrder) window.scrollTo({
            top: 0,
            behavior: router.packageDetail? 'smooth' : undefined
        });
    }, [pathname]);
    return null;
}

export default ScrollToTop
