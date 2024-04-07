'use client';

import Link from 'next/link';
import Header from '../components/header'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className='bg-rich_black'>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <main className="flex-grow">
          <section className='text-center min-h-screen flex flex-col justify-center relative'>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 100%)',
                filter: 'blur(160px)',
                width: '770px',
                height: '770px',
              }}
            />
            <div
              className="absolute left-1/2 transform translate-x-40 -translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
                filter: 'blur(140px)',
                width: '550px',
                height: '550px',
              }}
            />
            <div
              className="absolute transform -translate-x-10 -translate-y-80 "
              style={{
                background: 'linear-gradient(to bottom, rgba(83,32,73,1) 30%, rgba(82,55,149,1) 93%)',
                filter: 'blur(160px)',
                width: '550px',
                height: '550px',
              }}
            />
            <div className='relative z-10 mx-auto w-2/3'>
              <h1 className="text-8xl text-lavender font-sans font-bold leading-tight text-center responsive-heading">
                Revolutionizing KYC:
              </h1>
              <h1 className="text-8xl text-white font-sans font-bold leading-tight text-center responsive-heading">
                Effortless and Secure.
              </h1>
              <p className="text-2xl mt-20 text-gray-300 text-center">
                Our platform redefines the KYC process: securely link your bank account once, and you&apos;re set. No more uploading personal ID cards or sensitive documents to every site. Just provide your name on platforms like DYDX, and we handle the rest.
              </p>
              <nav className="flex justify-center mt-20 p-8">
                <Link href="/kyc" className="text-2xl text-black mr-16 bg-white hover:bg-lavender font-bold font-sans py-4 px-14 rounded-lg transition duration-300">
                  Launch
                </Link>
                <Link href="/" className="text-xl text-white font-bold py-4 px-4">
                  Verify a kyc
                </Link>
              </nav>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div >
  );
}