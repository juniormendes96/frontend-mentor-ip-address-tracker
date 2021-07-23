import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { ComponentType, FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import arrowIcon from '../assets/icons/icon-arrow.svg';
import { GeolocationInfo } from '../models/geolocation-info';
import { MapProps } from '../components/map';
import isValidDomain from '../validators/domain-validator';
import { getGeolocationInfoByDomain, getGeolocationInfoByIpAddress } from '../services/geolocation';
import isValidIpAddress from '../validators/ip-address-validator';

type Props = {
  initialGeolocationInfo: GeolocationInfo;
};

const MapWithNoSSR: ComponentType<MapProps> = dynamic(() => import('../components/map'), {
  ssr: false
});

const Home: React.FC<Props> = ({ initialGeolocationInfo }) => {
  const [info, setInfo] = useState(initialGeolocationInfo);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    ip,
    isp,
    location: { city, region, postalCode, timezone, lng, lat }
  } = info;

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      if (isValidDomain(text)) {
        setInfo(await getGeolocationInfoByDomain(text));
      } else if (isValidIpAddress(text)) {
        setInfo(await getGeolocationInfoByIpAddress(text));
      } else {
        throw new Error('Please enter a valid domain or IP address');
      }

      setText('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>IP Address Tracker</title>
      </Head>
      <main className="h-screen w-screen flex flex-col">
        <header className="h-72 bg-header-pattern bg-cover bg-no-repeat bg-center relative">
          <div className="w-11/12 h-full flex flex-col items-center mt-7 mx-auto">
            <h1 className="text-white text-3xl md:text-4xl font-medium mb-4 lg:mb-8">IP Address Tracker</h1>
            <form className="flex w-full sm:w-2/3 lg:w-1/3 mb-5 lg:mb-14" onSubmit={onSubmit}>
              <input
                type="text"
                autoComplete="off"
                className="py-4 px-5 rounded-l-xl outline-none flex-grow"
                placeholder="Search for any IP address or domain"
                value={text}
                onChange={event => setText(event.target.value)}
              />
              <button
                className="bg-black py-4 px-5 rounded-r-xl hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                disabled={isLoading}
              >
                <Image src={arrowIcon} alt="Arrow icon" />
              </button>
            </form>
            <div className="w-full sm:w-2/3 lg:w-max mx-auto rounded-xl bg-white shadow-2xl grid lg:grid-cols-4 lg:divide-x py-6 lg:py-8 z-500">
              <section className="flex flex-col w-full lg:w-64 lg:text-left text-center lg:px-8 mb-5 lg:mb-0">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">IP ADDRESS</h3>
                <span className="font-medium text-xl">{ip}</span>
              </section>
              <section className="flex flex-col w-full lg:w-64 lg:text-left text-center lg:px-8 mb-5 lg:mb-0">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">LOCATION</h3>
                <span className="font-medium text-xl">
                  {city}, {region} {postalCode}
                </span>
              </section>
              <section className="flex flex-col w-full lg:w-64 lg:text-left text-center lg:px-8 mb-5 lg:mb-0">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">TIMEZONE</h3>
                <span className="font-medium text-xl">{timezone}</span>
              </section>
              <section className="flex flex-col w-full lg:w-64 lg:text-left text-center lg:px-8">
                <h3 className="font-bold tracking-widest text-xs text-gray-500 mb-2">ISP</h3>
                <span className="font-medium text-xl">{isp}</span>
              </section>
            </div>
          </div>
        </header>
        <div className="flex-grow">
          <MapWithNoSSR lng={lng} lat={lat} />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const initialGeolocationInfo: GeolocationInfo = {
    ip: '142.250.72.132',
    isp: 'Google LLC',
    location: {
      country: 'US',
      region: 'California',
      city: 'Los Angeles',
      lat: 34.05223,
      lng: -118.24368,
      postalCode: '90001',
      timezone: '-07:00'
    }
  };

  return {
    props: {
      initialGeolocationInfo
    }
  };
};
