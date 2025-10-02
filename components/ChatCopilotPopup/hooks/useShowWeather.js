// {
//   type: 'wind',
//   title: '大风',
//   description: '大风呼啸',
//   tempRange: { high: 18, low: 12 }
// }

import { useCopilotAction } from '@copilotkit/react-core'

import WeatherCard from '../components/WeatherCard'

const useShowWeather = () => {
  useCopilotAction({
    name: 'showWeather',
    description: '展示温度、风力等天气信息卡片,将查询到的天气信息展示出来',
    parameters: [
      {
        name: 'type',
        type: 'string',
        description: '天气类型',
        required: true,
        enum: ['wind', 'rain', 'sun', 'snow', 'cloudy']
      },
      {
        name: 'title',
        type: 'string',
        description: '天气标题,描述该天气简短介绍,例如：晴天、多云.不能超出2个字',
        required: true
      },
      {
        name: 'description',
        type: 'string',
        description: '天气描述,描述该天气,不能超出10个字',
        required: true
      },
      {
        name: 'tempRange',
        type: 'object',
        properties: {
        max: {
            type: 'number',
            description: '最高温度',
            required: true
          },
          min: {
            type: 'number',
            description: '最低温度',
            required: true
          }
        }
      }
    ],
    render: (args) => {
        console.log('useShowWeather', args)
        const { type, title, description, tempRange } = args.args || {}
      return  <WeatherCard
          type={type}
          title={title}
          description={description}
          tempRange={ tempRange || {}}
        />
      
    }
  })
}

export default useShowWeather
