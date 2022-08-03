import { useState, useEffect } from 'react';
import { styled } from '@mui/system';

import { Header, Layout } from 'components';
import { homeStyles } from 'styles';
import { API } from 'config';

const Home = () => {
  // state
  const [loading, setLoading] = useState(false);

  // Estilos
  const styles = homeStyles;

  // Funciones
  useEffect(() => {
    console.log('hey');
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    try {
      setLoading(true);
      const response = await API.getAllMovies(1000, 0);
      console.log(response);

      setLoading(false);
    } catch (e) {
      console.log(e);

      setLoading(false);
    }
  };

  return (
    <Layout isLoading={loading}>
      <Header />
      <p>hidude</p>
    </Layout>
  );
};

export default Home;
