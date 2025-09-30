import {  useCopilotAction } from "@copilotkit/react-core"; 

import ProfileCard from "./components/ProfileCard"
  

const useUserInfoTool = () => {
     // 个人心心
  useCopilotAction({
    name: "userInfo",
    description: "个人介绍tool",
    render: () => {
      return <ProfileCard />
    }
  });
}

export default  useUserInfoTool