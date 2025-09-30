import { useEffect } from "react";

 function usePopupInputFix() {

    useEffect(() => {
        const textarea = document.querySelector<HTMLTextAreaElement>(
          ".copilotKitInput textarea"
        );
        if (!textarea) return;
    
        const handleFocus = () => {
          // 如果是空内容，就自动填一个空格
          if (!textarea.value) {
            textarea.value = " ";
          }
        };
    
        textarea.addEventListener("focus", handleFocus);
        return () => textarea.removeEventListener("focus", handleFocus);
      }, []);
      
  useEffect(() => {
    const textarea = document.querySelector(
      ".copilotKitInput textarea"
    );
    console.log("textarea:::", textarea)
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
        const popup = textarea.closest(".copilotKitWindow")
        console.log("popup::", popup)
        if (!popup) return;

        const offset =
          window.innerHeight - (window.visualViewport.height || window.innerHeight);

        if (offset > 0) {
          popup.style.transform = `translateY(-${offset}px)`;
        } else {
          popup.style.transform = "";
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