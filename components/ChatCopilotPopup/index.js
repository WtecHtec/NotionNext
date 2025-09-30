import { useEffect } from 'react'
import { CopilotPopup } from '@copilotkit/react-ui'

import { instructions, title, initial} from './config'
import useUserInfoTool from './useUserInfoTool'
import useVocabularyTool from './useVocabularyTool'
const ChatCopilotPopup = () => {
 
  useUserInfoTool();
  useVocabularyTool();

  useEffect(() => {
    if (window.visualViewport) {
      const onResize = () => {
        document.body.style.height = `${window.visualViewport?.height}px`;
      };
      window.visualViewport.addEventListener("resize", onResize);
      return () => window.visualViewport.removeEventListener("resize", onResize);
    }
  }, []);
  return  <CopilotPopup
  instructions={instructions}
    labels={{
      title,
      initial,
    }}
    suggestions={[{
      title: "关于个人",
      message: "关于个人"
    }]}
    RenderActionExecutionMessage={() => {
      return <>测试</>
    }}
  />
}

export default ChatCopilotPopup;