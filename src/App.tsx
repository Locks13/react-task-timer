import "./styles/global.css";
import "./styles/themes.css";

import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { MessagersContainer } from "./components/MessagersContainer";
import { Router } from "./Router";

function App() {
  return (
    <TaskContextProvider>
      <MessagersContainer>
        <Router />
      </MessagersContainer>
    </TaskContextProvider>
  );
}

export default App;
