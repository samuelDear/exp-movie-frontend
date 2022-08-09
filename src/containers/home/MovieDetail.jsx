import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Header, Layout } from 'components';
import { homeStyles } from 'styles';
import { API } from 'config';

const MovieDetail = () => {
  // state
  const [loading, setLoading] = useState(false);

  // Estilos
  const styles = homeStyles;

  // Otros
  const { id } = useParams();

  // Funciones
  useEffect(() => {
    console.log(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout isLoading={loading}>
      <Header />
      {id}
    </Layout>
  );
};

export default MovieDetail;
