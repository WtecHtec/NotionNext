
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react'
import { CopilotPopup } from '@copilotkit/react-ui'

import { instructions, title, initial } from './config'
import useUserInfoTool from './useUserInfoTool'
import useVocabularyTool from './useVocabularyTool'
import usePopupInputFix from './usePopupInputFix'
import LoadingDots from './components/LoadingDots'

import ReactMarkdown from 'react-markdown';
const ChatCopilotPopup = ({ children}) => {
 
  useUserInfoTool()
  useVocabularyTool()

  usePopupInputFix()


  // const router = useRouter();
 
  // const [currentUrl, setCurrentUrl] = useState(router.asPath); // 初始 URL

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     console.log('🔄 路由变更为:', url);
      
  //     setCurrentUrl(url);
  //   };

  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   // 清除监听器，防止内存泄漏
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

 

  return (
    <CopilotPopup
      instructions={instructions}
      labels={{
        title,
        initial
      }}
      suggestions={[
        {
          title: '关于个人',
          message: '关于个人'
        },
      ]}
      AssistantMessage={arg => {
        const { message, isLoading, isGenerating } = arg
        let renderDom = <LoadingDots />
        const content = message.content || ''
        let isShow = content.replaceAll('\n', '') !== ''
        if (isLoading || isGenerating) {
          renderDom = <LoadingDots />
        } else {
          renderDom = <ReactMarkdown >{String(content)}</ReactMarkdown>
          if (typeof message.generativeUI === 'function') {
            renderDom = message.generativeUI(arg)
          } else if (!content) {
            renderDom = <div> 暂时无法回答！「不完美，但在成长中」</div>
          } else if (!isShow) {
            return null
          }
         
        }
        return <div className='my-2 prose prose-neutral dark:prose-invert max-w-none'>{renderDom}</div>
      }}
    >

 </CopilotPopup>
     
  )
}

export default ChatCopilotPopup
