'use client';

import Link from 'next/link';
import Header from '../../components/header'
import PowensConnection from '../../components/PowensConnection'

export default function Home() {
  return (
    <div className='bg-zinc-900'>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <main className="flex-grow">
          <section className='text-center min-h-screen flex flex-col justify-center relative'>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                filter: 'blur(180px)',
                width: '550px',
                height: '550px',
              }}
            />
            <div
              className="absolute left-1/2 transform translate-x-40 -translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
                filter: 'blur(80px)',
                width: '330px',
                height: '330px',
              }}
            />
            <div
              className="absolute transform -translate-x-10 -translate-y-80 "
              style={{
                background: 'linear-gradient(to bottom, rgba(83,32,73,1) 30%, rgba(82,55,149,1) 93%)',
                filter: 'blur(80px)',
                width: '330px',
                height: '330px',
              }}
            />
            <PowensConnection />
          </section>
        </main>
      </div>
    </div >
  );
}