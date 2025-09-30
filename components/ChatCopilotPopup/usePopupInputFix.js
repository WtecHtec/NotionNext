import { useEffect } from "react";

 function usePopupInputFix() {



  useEffect(() => {
    const textarea = document.querySelector(
      ".copilotKitInput textarea"
    );
    if (!textarea) return;

    // 1. focus 时滚动到视口中间，避免被键盘遮住
    const handleFocus = () => {
      setTimeout(() => {
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    };

    textarea.addEventListener("focus", handleFocus);

    // 2. iOS 13+ 使用 visualViewport 修正 popup 位置
    if (window.visualViewport) {
      const handleResize = () => {
      

        const offset =
          window.innerHeight - (window.visualViewport.height || window.innerHeight);

        if (offset > 0) {
            textarea.style.transform = `translateY(-${offset}px)`;
        } else {
            textarea.style.transform = "";
        }
      };

      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);

      return () => {
        textarea.removeEventListener("focus", handleFocus);
        window.visualViewport?.removeEventListener("resize", handleResize);
        window.visualViewport?.removeEventListener("scroll", handleResize);
      };
    }

    return () => {
      textarea.removeEventListener("focus", handleFocus);
    };
  }, []);
}
export default usePopupInputFix