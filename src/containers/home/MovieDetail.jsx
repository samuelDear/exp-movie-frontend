import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Breadcrumbs, Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Header, Layout } from 'components';
import { movieDetailStyles } from 'styles';
import { API } from 'config';

const MovieDetail = () => {
  // state
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  // Estilos
  const styles = movieDetailStyles;
  const LinkList = styled(Link)(styles.linkList);
  const MovieBox = styled(Box)(({ theme }) => styles.movieMainBox(theme));
  const ImageBox = styled(Box)(({ theme }) => styles.imageMovie(theme));
  const DscMovieBox = styled(Box)(({ theme }) => styles.dscMovieBox(theme));
  const MovieImage = styled('img')(({ theme }) => styles.movieImage(theme));

  // Otros
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  // Funciones
  useEffect(() => {
    getMovieDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovieDetail = async id => {
    try {
      setLoading(true);

      const response = await API.getMovieById(id);
      setMovie(response);

      setLoading(false);
    } catch (e) {
      const { status, data } = e;

      switch (status) {
        case 400:
          enqueueSnackbar(data.msg, {
            variant: 'error',
          });
          break;
        case 500:
          enqueueSnackbar('Error Interno', {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar('Error Interno', {
            variant: 'error',
          });
      }

      setLoading(false);
    }
  };

  return (
    <Layout isLoading={loading}>
      <Header />
      <Box sx={styles.mainBox}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="p" component="p">
            <LinkList to="/">Listado</LinkList>
          </Typography>

          <Typography variant="p" component="p" sx={styles.titleMovieLink}>
            {movie.title}
          </Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" sx={styles.titleMovie}>
          {movie.title}
        </Typography>

        <MovieBox>
          <ImageBox>
            <MovieImage
              src={movie.image}
              title={movie.title}
              alt={movie.title}
            />
          </ImageBox>

          <DscMovieBox>
            <Typography variant="h6" component="h6" sx={styles.creatorText}>
              Creador: {movie.director}
            </Typography>
            <Typography variant="p" component="p">
              {movie.dsc}
            </Typography>
          </DscMovieBox>
        </MovieBox>
      </Box>
    </Layout>
  );
};

export default MovieDetail;
