import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Typography, Link } from '@mui/material';
import OdeteForm from '../components/OdeteForm';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Odete</title>
        <meta
          name='description'
          content='Sua assistente Odete.'
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container component='main' maxWidth='md' sx={{ mt: 2, mb: 8 }}>
        <Typography component='h1' variant='h1' align='center' color='warning.main'>
          Odete
        </Typography>
        <Typography
          align='center'
          color='textSecondary'
          lineHeight='1.25'
          sx={{ fontSize: 20, mt: 0, mb: 4 }}
        >
          Tire suas dúvidas comigo, jovem.
        </Typography>

        <OdeteForm />
        
      </Container>
    </div>
  );
};

export default Home;
