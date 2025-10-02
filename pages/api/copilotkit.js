import BLOG from '@/blog.config'
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSPagesRouterEndpoint
} from '@copilotkit/runtime'
import OpenAI from 'openai'
import { experimental_createMCPClient } from "ai"; 
const apiKey =
  BLOG.ZHIPU_API_KEY || ''
if (!apiKey) {
  throw new Error(
    'The AZURE_OPENAI_API_KEY environment variable is missing or empty.'
  )
}

async function customFetch(url, options) {
  // 你可以根据 url 和 options 自行改造请求，转发到智谱API

  // 这里示范替换 URL 和 headers，假设智谱API地址是 https://api.zhipu.com/v1/chat/completions
  const newUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
  // github model 
  // const newUrl = 'https://models.github.ai/inference/chat/completions'
  const originalBody = JSON.parse(options.body)
  const newBody = { ...originalBody, model: 'glm-4.5-flash' }
  newBody.messages = newBody.messages.map(item => {
    let role = item.role === 'developer' ? 'system' : item.role
    return {
      ...item,
      role
    }
  })
  // 重新构造请求体，headers 等，确保符合智谱API格式
  const newOptions = {
    ...options,
    headers: {
      // ...options.headers,
      Authorization: `Bearer ${apiKey}`, // 智谱token
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBody) // 如果需要，改写body格式
  }

  return fetch(newUrl, newOptions)
}

async function fetchWebContent(url) {
  const res = await fetch(url)
  const html = await res.text()
  return html
}

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
  fetch: customFetch
})
const serviceAdapter = new OpenAIAdapter({ openai })

const handler = async (req, res) => {
  const mcpServers = JSON.parse(BLOG.MCP_SERVERS || '[]')
  const runtime = new CopilotRuntime({
    mcpServers: [
      ...mcpServers
    ],
    async createMCPClient(config) {
      return await experimental_createMCPClient({
        transport: {
          type: "sse",
          url: config.endpoint,
        },
      })
    },
    actions: ({ properties, url }) => {
      return [
        // {
        //   name: 'getWebpageContent',
        //   description: 'Fetch and return webpage text',
        //   parameters: [
        //     {
        //       name: 'url',
        //       type: 'string',
        //       description: 'web page url',
        //       required: true
        //     }
        //   ],
        //   handler: async ({url}) => {
        //     // do something with the userId
        //     // return the user data
        //     return await  fetchWebContent(`https://r.jina.ai/${url}`)
        //   },
        // }
      ]
    }
  })

  const handleRequest = copilotRuntimeNextJSPagesRouterEndpoint({
    endpoint: '/api/copilotkit',
    runtime,
    serviceAdapter
  })

  return await handleRequest(req, res)
}

export default handler
