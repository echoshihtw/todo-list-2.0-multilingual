import ToDoList from "./pages/ToDoList/ToDoList";
import { TodoProvider } from "./context/TodoContext";
import GlobalCSS from "./styles/global.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/global.css";
import { Suspense } from "react";
function App() {
  return (
    <>
      <Suspense fallback={null}>
        <TodoProvider>
          <ThemeProvider theme={theme}>
            <GlobalCSS />
            <ToDoList />
          </ThemeProvider>
        </TodoProvider>
      </Suspense>
    </>
  );
}
export default App;
