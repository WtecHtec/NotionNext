
import { CopilotPopup } from '@copilotkit/react-ui'

import { instructions, title, initial} from './config'
import useUserInfoTool from './useUserInfoTool'
import useVocabularyTool from './useVocabularyTool'
const ChatCopilotPopup = () => {
 
  useUserInfoTool();
  useVocabularyTool();
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
  />
}

export default ChatCopilotPopup;