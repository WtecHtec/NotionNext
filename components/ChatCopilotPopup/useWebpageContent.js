import {  useCopilotAction } from "@copilotkit/react-core"; 


  

const useWebpageContent = () => {
  useCopilotAction({
    name: 'getWebpageContent',
    description: 'Fetch and return webpage text',
    parameters: [
      {
        name: 'url',
        type: 'string',
        description: 'web page url',
        required: true
      }
    ],
    handler: async ({url}) => {
      const res = await fetch(url)
      const html = await res.text()
      return html
    },
  });
}

export default  useWebpageContent