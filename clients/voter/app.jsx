import React from 'react';
import ReactDOM from 'react-dom/client';
import {Text} from '@phxjs/ui/Text/Text';

const root = ReactDOM.createRoot(document.body);
root.render(<App />);

export function App() {
  return (
    <>
      <h1>test me</h1>
      <marquee>nice</marquee>
      <Text content="banana" />
    </>
  );
}