
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react'
import { CopilotPopup } from '@copilotkit/react-ui'

import { instructions, title, initial } from './config'
import useUserInfoTool from './useUserInfoTool'
import useVocabularyTool from './useVocabularyTool'
import usePopupInputFix from './usePopupInputFix'
import useWebpageContent from './useWebpageContent'
import LoadingDots from './components/LoadingDots'

import ReactMarkdown from 'react-markdown';
import { siteConfig } from '@/lib/config'


const ChatCopilotPopup = ({ children}) => {
 

  useUserInfoTool()
  useVocabularyTool()

  usePopupInputFix()

  useWebpageContent()


  const router = useRouter();
 
  const [currentUrl, setCurrentUrl] = useState("https://xujingyichang.top"); // 初始 URL

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('🔄 路由变更为:', url);
      
      setCurrentUrl(`${window.location.href}`);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // 清除监听器，防止内存泄漏
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  return (
    <CopilotPopup
      instructions={ siteConfig("AI_BOT_PROMPT") || instructions}
      labels={{
        title: siteConfig("AI_BOT_TITLE") || title,
        initial : siteConfig("AI_BOT_INITIAL") || initial,
      }}
      suggestions={[
        {
          title: '关于个人',
          message: '关于个人'
        },
        {
          title: '总结页面',
          message: `总结一下该链接页面: ${currentUrl}`
        },
      ]}
      AssistantMessage={arg => {
        const { message, isLoading, isGenerating } = arg
        let renderDom = <LoadingDots />
        const content = message.content || ''
        const  { toolCalls, id } =  message
        let isShow = content.replaceAll('\n', '') !== ''
        if (isLoading || isGenerating) {
          renderDom = <LoadingDots />
          if (isGenerating && content) {
            renderDom = <ReactMarkdown >{String(content)}</ReactMarkdown>
          }
        } else {
          renderDom = <ReactMarkdown >{String(content)}</ReactMarkdown>
          if (typeof message.generativeUI === 'function') {
            renderDom = message.generativeUI(arg)
          } else if (Array.isArray(toolCalls) && toolCalls.length) {
            renderDom =  toolCalls.map((item) => {
              return  <div key={item?.function?.id} className="flex items-center space-x-1  p-2 border border-gray-300 rounded-lg">
              {/* 绿色的红点 */}
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              
              {/* 灰色字体的名称 */}
              <span className="text-gray-500 text-sm">{item?.function?.name}</span>
            </div>
            })
          }
          else if (!content) {
            renderDom = <div> 暂时无法回答！「不完美，但在成长中」</div>
          } else if (!isShow) {
            return null
          }
         
        }
        return <div key={id} className='my-2 prose prose-neutral dark:prose-invert max-w-none'>{renderDom}</div>
      }}
    >

 </CopilotPopup>
     
  )
}

export default ChatCopilotPopup
