import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';


import styles from '@styles/Home.module.scss';
import useGeoLocation from 'src/hooks/useGeolocation';
import { useState, useRef } from 'react';

const DEFAULT_CENTER = [38.907132, -77.036546]
// [51.505, -0.09]

export default function Home() {
  
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  
  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.leafletElement.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location?.error?.message);
    }
  };
  


  return (
    <Layout>
      <Head>
        <title>Frost tracker</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>
            Frost tracker
          </h1>

          <Map className={styles.homeMap} width="600" height="300"  center={center} zoom={ZOOM_LEVEL} >
       
             
          </Map>
          <p className={styles.description}>
            Your location:
            {location.loaded
                                    ? JSON.stringify(location.coordinates.lat)
                                    : "Location data not available yet."}
          </p>

     
         

          {/* <p className={styles.view}>
            <Button href="https://github.com/colbyfayock/next-leaflet-starter">Vew on GitHub</Button>
          </p> */}
        </Container>
      </Section>
    </Layout>
  )
}
