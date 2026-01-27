import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Users from "./components/Users";
import { ErrorBoundary } from "react-error-boundary";
import FileDownload from "./components/fileDownload";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <>
      <div>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
            <FileDownload />
          </Suspense>
        </ErrorBoundary>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
