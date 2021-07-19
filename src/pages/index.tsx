import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import arrowIcon from '../assets/icons/icon-arrow.svg';

export default function Home() {
  const MapWithNoSSR = dynamic(() => import('../components/map'), {
    ssr: false
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className="h-screen w-screen flex flex-col">
        <header className="h-72 bg-header-pattern bg-cover bg-no-repeat bg-center relative">
          <div className="w-11/12 h-full flex flex-col items-center mt-7 mx-auto">
            <h1 className="text-white text-3xl md:text-4xl font-medium mb-6 lg:mb-8">IP Address Tracker</h1>
            <form className="flex w-full sm:w-2/3 lg:w-1/3 mb-6 lg:mb-14">
              <input
                type="text"
                autoComplete="off"
                className="py-4 px-5 rounded-l-xl outline-none flex-grow"
                placeholder="Search for any IP address or domain"
              />
              <button type="button" className="bg-black py-4 px-5 rounded-r-xl hover:bg-gray-800">
                <Image src={arrowIcon} alt="Arrow icon" />
              </button>
            </form>
            <div className="w-full sm:w-2/3 lg:w-max mx-auto rounded-xl bg-white shadow-2xl grid lg:grid-cols-4 lg:divide-x py-8 z-500">
              <section className="flex flex-col w-full lg:w-56 lg:text-left text-center lg:px-8 mb-5 lg:mb-0">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">IP ADDRESS</h3>
                <span className="font-medium text-xl">192.212.174.101</span>
              </section>
              <section className="flex flex-col w-full lg:w-56 lg:text-left text-center lg:px-8 mb-5 lg:mb-0">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">LOCATION</h3>
                <span className="font-medium text-xl">Brooklyn, NY 10001</span>
              </section>
              <section className="flex flex-col w-full lg:w-56 lg:text-left text-center lg:px-8 mb-5 lg:mb-0">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">TIMEZONE</h3>
                <span className="font-medium text-xl">UTC -05:00</span>
              </section>
              <section className="flex flex-col w-full lg:w-56 lg:text-left text-center lg:px-8">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">ISP</h3>
                <span className="font-medium text-xl">SpaceX Starlink</span>
              </section>
            </div>
          </div>
        </header>
        <div className="flex-grow">
          <MapWithNoSSR />
        </div>
      </main>
    </>
  );
}
