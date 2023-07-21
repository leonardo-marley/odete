import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Typography, Link } from '@mui/material';
import OdeteForm from '../components/OdeteForm';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Odete</title>
        <meta
          name='description'
          content='Text to speech app using the Web Speech API.'
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container component='main' maxWidth='md' sx={{ mt: 4, mb: 8 }}>
        <Typography component='h1' variant='h1' align='center' color='primary'>
          Odete
        </Typography>
        <Typography
          align='center'
          color='textSecondary'
          lineHeight='1.25'
          sx={{ fontSize: 20, mt: 3, mb: 4 }}
        >
          Browser-based text-to-speech app because reading is for nerds.
        </Typography>
        <OdeteForm />
      </Container>
      <Footer>
        
      </Footer>
    </div>
  );
};

export default Home;
