import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { Header, Layout, SelectForm } from 'components';
import { homeStyles } from 'styles';
import { API } from 'config';

const Home = () => {
  // state
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [quantity, setQuantity] = useState(12);
  const [maxRecords, setMaxRecords] = useState(0);
  const [firstTime, setFirstTime] = useState(true);

  // Estilos
  const styles = homeStyles;
  const ImgBox = styled('img')(({ theme }) => styles.imgMovie(theme));

  // Otros
  const { enqueueSnackbar } = useSnackbar();
  const { control, watch } = useForm();
  const navigate = useNavigate();

  // Funciones
  useEffect(() => {
    getAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstTime) {
      getAllMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!firstTime) {
      if (currentPage === 0) {
        getAllMovies();
      } else {
        setCurrentPage(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  useEffect(() => {
    if (!firstTime) {
      setQuantity(watch('quantityResults'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('quantityResults')]);

  const getAllMovies = async () => {
    try {
      setLoading(true);

      const response = await API.getAllMovies(quantity, currentPage);

      setMovies(response.records);
      setMaxRecords(response.qty);

      // Calculamos las paginas
      const pagesTmp = response.qty / quantity;

      setPages(Math.floor(pagesTmp));

      setLoading(false);
      setFirstTime(false);
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
        <Grid container spacing={2}>
          {movies.map((el, index) => (
            <Grid
              item
              container
              key={`movie-${index}-${el.id}`}
              sx={styles.movieBox}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() => navigate(`/movie/${el.id}`)}>
              <ImgBox src={el.image} alt={el.title} title={el.title} />
              <Typography component="p" variant="p" sx={styles.titleMovie}>
                {el.title}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography variant="p" component="span">
              Mostrar
            </Typography>
            <SelectForm
              name="quantityResults"
              defaultValue={12}
              control={control}
              items={[
                {
                  value: 6,
                  label: '6',
                },
                {
                  value: 12,
                  label: '12',
                },
                {
                  value: 24,
                  label: '24',
                },
              ]}
              className={styles.selectBox}
            />
            <Typography variant="p" component="span">
              Resultados
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            flexDirection="column">
            <Box>
              <Typography variant="p" component="p">
                Resultados desde{' '}
                <b>{currentPage === 0 ? 1 : quantity * currentPage}</b> hasta{' '}
                <b>
                  {quantity * (currentPage + 1) > maxRecords
                    ? quantity * (currentPage + 1) -
                      (quantity * (currentPage + 1) - maxRecords)
                    : quantity * (currentPage + 1)}
                </b>{' '}
                de{' '}
                <b>
                  {quantity * (currentPage + 1) > maxRecords
                    ? quantity * (currentPage + 1) -
                      (quantity * (currentPage + 1) - maxRecords)
                    : maxRecords}
                </b>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box sx={styles.pageTxtBox}>
                <Typography variant="p" component="p">
                  Pagina {currentPage + 1} de {pages + 1}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <IconButton
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(0)}>
                  <KeyboardDoubleArrowLeftIcon />
                </IconButton>

                <IconButton
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(prevState => prevState - 1)}>
                  <KeyboardArrowLeftIcon />
                </IconButton>

                <IconButton
                  disabled={currentPage === pages}
                  onClick={() => setCurrentPage(prevState => prevState + 1)}>
                  <KeyboardArrowRightIcon />
                </IconButton>

                <IconButton
                  disabled={currentPage === pages}
                  onClick={() => setCurrentPage(pages)}>
                  <KeyboardDoubleArrowRightIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
