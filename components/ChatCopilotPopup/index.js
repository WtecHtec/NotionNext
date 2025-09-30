import { useEffect } from 'react'
import { CopilotPopup } from '@copilotkit/react-ui'

import { instructions, title, initial } from './config'
import useUserInfoTool from './useUserInfoTool'
import useVocabularyTool from './useVocabularyTool'
import usePopupInputFix from './usePopupInputFix'
import LoadingDots from './components/LoadingDots'

import ReactMarkdown from 'react-markdown';
const ChatCopilotPopup = () => {
  useUserInfoTool()
  useVocabularyTool()

  usePopupInputFix()

  // useEffect(() => {
  //   if (window.visualViewport) {
  //     const onResize = () => {
  //       document.body.style.height = `${window.visualViewport?.height}px`
  //     }
  //     window.visualViewport.addEventListener('resize', onResize)
  //     return () => window.visualViewport.removeEventListener('resize', onResize)
  //   }
  // }, [])
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
        }
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
    />
  )
}

export default ChatCopilotPopup
