

import {
  useCopilotAction,
} from "@copilotkit/react-core";
import McpToolCall from "../components/MCPToolCall";

 function useToolRenderer() {
  useCopilotAction({
    /**
     * The asterisk (*) matches all tool calls
     */
    name: "*",
    render: ({ name, status, args, result }) => (
      <McpToolCall status={status} name={name} args={args} result={result} />
    ),
  });
  return null;
}
export default useToolRenderer