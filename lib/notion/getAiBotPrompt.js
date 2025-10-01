/**
 * 从Notion中读取站点配置;
 * 在Notion模板中创建一个类型为CONFIG的页面，再添加一个数据库表格，即可用于填写配置
 * Notion数据库配置优先级最高，将覆盖vercel环境变量以及blog.config.js中的配置
 * --注意--
 * 数据库请从模板复制 https://www.notion.so/tanghh/287869a92e3d4d598cf366bd6994755e
 *
 */
import { getPost } from './getNotionPost'

function flatten(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val) : val)
  }, [])
}
/**
 * 从Notion中读取Config配置表
 * @param {*} allPages
 * @returns
 */
export async function getConfigAiBotPromptConfigPage(allPages) {
  // 默认返回配置文件
  const notionConfig = {}

  if (!allPages || !Array.isArray(allPages) || allPages.length === 0) {
    console.warn('[Notion配置] 忽略的配置')
    return null
  }
  // 找到Config类
  const configPage = allPages?.find(post => {
    return (
      post &&
      post?.type &&
      (post?.type === 'AI_BOT_PROMPT' ||
        post?.type === 'ai_bot_prompt' ||
        post?.type === 'prompt')
    )
  })

  if (!configPage) {
    // console.warn('[Notion配置] 未找到配置页面')
    return null
  }
  const configPageId = configPage.id
  //   console.log('[Notion配置]请求配置数据 ', configPage.id)
  let pageRecordMap = await getPost(configPageId)



  let content = ''

  try {
    for (let key in pageRecordMap.blockMap.block) {
      const item = pageRecordMap.blockMap.block[key]
      if (item.value.type === 'code') {
        content = flatten(item.value.properties.title).join('')
      }
    }
    return content
  } catch (error) {}
  if (!content) {
    return null
  }
}
