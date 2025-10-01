import { useEffect } from "react";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isIOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 检查是否为 iOS 设备，并排除 macOS 系统
  return /iPhone|iPad|iPod/.test(userAgent) && !/Macintosh/.test(userAgent) && !window.MSStream;
}

 function usePopupInputFix() {



  useEffect(() => {
    const textarea = document.querySelector(
      ".copilotKitInput textarea"
    );
    console.log("window.visualViewport:::", textarea)
    if (!textarea) return;

    // 1. focus 时滚动到视口中间，避免被键盘遮住
    const handleFocus = () => {
      setTimeout(() => {
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    };

    textarea.addEventListener("focus", handleFocus);

    // 2. iOS 13+ 使用 visualViewport 修正 popup 位置
    if (window.visualViewport && isIOS()) {
     
      const handleResize = async () => {
        
        await delay(1000 * 0.2)
        const popup = document.querySelector(
            ".copilotKitWindow"
          );

          console.log("window.visualViewport:::", popup)
          console.log("window.visualViewport:::----", popup.offsetHeight)
        if (!popup) return;
       
        const isScrolled = window.visualViewport ? window.visualViewport.offsetTop > 0 : window.pageYOffset > 0;
        let  offset = window.innerHeight - (window.visualViewport.height || window.innerHeight);

        console.log("isScrolled:::", isScrolled)
    
          console.log("window.visualViewport offset :::", window.innerHeight, offset, window.visualViewport.height )
        if (offset > 0 ) {
          console.log("window.visualViewport offset 修改 :::", offset, window.visualViewport.height )
          popup.style.top = '0'
          popup.style.transform = `translateY(${offset}px)`;
        } else {

          if (popup.classList.contains('open') && isScrolled) {
            console.log('元素包含类名 open');
            offset = popup.offsetHeight
            popup.style.top = '0'
            popup.style.transform = `translateY(${offset * 0.8}px)`;
          } else {
            console.log('元素不包含类名 open');
            popup.style.transform = "";
            popup.style.top = '0'
          }
        }
      };

      const handleInitResize = () => {
        const popup = document.querySelector(
          ".copilotKitWindow"
        );

        
      if (!popup) return;
        popup.style.transform = "";
      }

      // textarea.addEventListener("focus", handleResize);
      textarea.addEventListener("blur", handleInitResize);
      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);

      return () => {
        textarea.removeEventListener("focus", handleResize);
        textarea.removeEventListener("blur", handleInitResize);
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