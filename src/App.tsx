import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import { config } from "./lib/config";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://vite.dev"
            target="_blank"
            className="hover:opacity-80"
          >
            <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="hover:opacity-80"
          >
            <img src={reactLogo} className="h-16 w-16" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Vite + React
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <Button
            onClick={() => setCount((count) => count + 1)}
            className="w-full"
          >
            count is {count}
          </Button>
          <p className="mt-4 text-gray-600 text-center">
            Edit{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code>{" "}
            and save to test HMR
          </p>
        </div>
        <p className="text-center text-gray-500 mt-8">
          Click on the Vite and React logos to learn more
          config.gofastApi.baseUrl: {config.gofastApi.baseUrl}
        </p>
      </div>
    </div>
  );
}

export default App;
