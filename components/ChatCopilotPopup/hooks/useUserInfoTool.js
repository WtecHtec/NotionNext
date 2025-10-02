import {  useCopilotAction, useCopilotChat } from "@copilotkit/react-core"; 

import ProfileCard from "../components/ProfileCard"
  

const useUserInfoTool = () => {
  useCopilotAction({
    name: "userInfo",
    description: "关于个人、个人介绍",
    render: () => {
      return <ProfileCard />
    }
  });
}

export default  useUserInfoTool