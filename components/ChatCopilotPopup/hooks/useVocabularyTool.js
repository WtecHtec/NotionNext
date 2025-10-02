import { useCopilotAction } from '@copilotkit/react-core'

import VocabularyCard from '../components/VocabularyCard'


const useVocabularyTool = () => {
  useCopilotAction({
    name: 'vocabularyWord',
    description: '英语单词查询tool',
    parameters: [
      {
        name: 'word',
        type: 'string',
        description: '英语单词',
        required: true
      },
      {
        name: 'phonetic',
        type: 'string',
        description: '英语单词音标',
        required: true
      },
      {
        name: 'phoneticBreakdown',
        type: 'object[]',
        attributes: [
          {
            name: 'syllable',
            type: 'string'
          },
          {
            name: 'pronunciation',
            type: 'string'
          }
        ],
        description: '英语单词音标拆分',
        required: true
      },
      {
        name: 'chineseDefinition',
        type: 'string',
        description: '中文释义',
        required: true
      },
      {
        name: 'englishDefinition',
        type: 'string',
        description: '英文释义',
        required: true
      },
      {
        name: 'exampleEnglish',
        type: 'string',
        description: '英文句子示例',
        required: true
      },
      {
        name: 'exampleChinese',
        type: 'string',
        description: '中文句子示例',
        required: true
      }
    ],
    render: (args) => {
        const { word, phonetic, phoneticBreakdown, chineseDefinition, englishDefinition, exampleChinese, exampleEnglish } =  args.args || {}
      return (
        <VocabularyCard
          word= { word }
          phonetic={phonetic}
          phoneticBreakdown={Array.isArray(phoneticBreakdown) ? phoneticBreakdown : [] }
          chinesePronunciation=''
          chineseDefinition= {chineseDefinition}
          englishDefinition= {englishDefinition}
          exampleEnglish={exampleEnglish}
          exampleChinese={exampleChinese}
        />
      )
    }
  })
}

export default useVocabularyTool
