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

import { Header, Layout, SelectForm, InputForm } from 'components';
import { homeStyles } from 'styles';
import { API } from 'config';

// Estilos
const styles = homeStyles;
const ImgBox = styled('img')(({ theme }) => styles.imgMovie(theme));

const Home = () => {
  // state
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(0);
  const [maxRecords, setMaxRecords] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const [filter, setFilter] = useState({
    quantity: 12,
    currentPage: 0,
    filterText: '',
  });

  const { quantity, currentPage, filterText } = filter;

  // Otros
  const { enqueueSnackbar } = useSnackbar();
  const { control, watch, getValues } = useForm();
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
  }, [filter]);

  useEffect(() => {
    if (!firstTime && watch('searchText') === '') {
      setFilter(prevState => ({
        ...prevState,
        filterText: watch('searchText'),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues('searchText')]);

  useEffect(() => {
    if (!firstTime) {
      setFilter(prevState => ({
        ...prevState,
        quantity: watch('quantityResults'),
        currentPage: 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('quantityResults')]);

  const getAllMovies = async () => {
    try {
      setLoading(true);

      const response = await API.getAllMovies(
        quantity,
        currentPage,
        filterText,
      );

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
        {/* Filtros */}

        <Box mb={4}>
          <Grid container>
            <Grid xs={6} sm={4} md={3} container item>
              <InputForm
                name="searchText"
                control={control}
                fullWidth
                placeholder="Buscar..."
                inputProps={{
                  maxLength: 128,
                }}
                autocomplete="off"
                type="search"
                variant="outlined"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();

                    setFilter(prevState => ({
                      ...prevState,
                      filterText: e.target.value,
                    }));
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
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
          {movies.length === 0 ? (
            <Grid item xs={12}>
              <Typography
                component="p"
                variant="h6"
                textAlign="center"
                sx={{
                  margin: '10px',
                }}>
                No hay registros
              </Typography>
            </Grid>
          ) : null}
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
                  Pagina {currentPage + 1} de {pages}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <IconButton
                  disabled={currentPage === 0}
                  onClick={() =>
                    setFilter(prevState => ({
                      ...prevState,
                      currentPage: 0,
                    }))
                  }>
                  <KeyboardDoubleArrowLeftIcon />
                </IconButton>

                <IconButton
                  disabled={currentPage === 0}
                  onClick={() =>
                    setFilter(prevState => ({
                      ...prevState,
                      currentPage: prevState.currentPage - 1,
                    }))
                  }>
                  <KeyboardArrowLeftIcon />
                </IconButton>

                <IconButton
                  disabled={currentPage === pages - 1}
                  onClick={() =>
                    setFilter(prevState => ({
                      ...prevState,
                      currentPage: prevState.currentPage + 1,
                    }))
                  }>
                  <KeyboardArrowRightIcon />
                </IconButton>

                <IconButton
                  disabled={currentPage === pages - 1}
                  onClick={() =>
                    setFilter(prevState => ({
                      ...prevState,
                      currentPage: pages,
                    }))
                  }>
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
