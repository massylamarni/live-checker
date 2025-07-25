'use client';

import handler from './pages/api/checker';

export default function Home() {
  return (
    <>
      <div>INDEX</div>
      <button onClick={handler}>Check</button>
      <button onClick={handler}>Test</button>
    </>
  );
}
