import "./styles/global.css";
import "./styles/themes.css";

import { TaskContextProvider } from "./contexts/TaskContext";
import { Home } from "./page/Home";

function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}

export default App;
