'use client'

import { redirect } from "next/navigation";
export default function Home() {
  const helo = () => {
    redirect('http://localhost:3000')
  }
  return (
    <>
      <button onClick={helo}>go to other route``</button>
    </>
  );
}
