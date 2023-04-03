import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}

const rootElement = document.getElementById('main');

// Using createRoot from react-dom/client to render the app
const root = createRoot(rootElement);
root.render(<App />);
