'use client';

export default function Home() {

  const handleClick = async (test = false) => {
    const res = await fetch(`/api/checker${test ? '?test=true' : ''}`);
    const data = await res.json();
  };

  return (
    <>
      <div>INDEX</div>
      <button onClick={() => handleClick()}>Check</button>
      <button onClick={() => handleClick(true)}>Test</button>
    </>
  );
}
