import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';
import { Button, Box, Typography, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { commentSectionStyles } from 'styles';
import { TextAreaForm, SelectForm, SoloLoading, ModalStyled } from 'components';
import { API, getSessionId } from 'config';

const CommentSection = ({ movieid, setMainLoading, ...props }) => {
  // state
  const [comments, setComments] = useState([]);
  const [sessionid] = useState(getSessionId());
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [editCommentId, setEditCommentId] = useState('');
  const [order, setOrder] = useState({
    orderby: 'created_at',
    dir: 'desc',
  });

  const { orderby, dir } = order;

  // Estilos
  const styles = commentSectionStyles;
  const CommentBox = styled(Box)(({ theme, classbox }) => ({
    ...classbox(theme),
  }));
  const ButtonPost = styled(Button)(({ theme, classbox }) => ({
    ...classbox(theme),
  }));
  const BoxLoggedRequired = styled(Box)(props => ({ ...props.classbox }));
  const ButtonLogin = styled(Button)(props => ({ ...props.classbox }));
  const CommentDate = styled(Typography)(props => ({ ...props.classbox }));
  const IconUser = styled(AccountBoxIcon)(({ theme, classbox }) => ({
    ...classbox(theme),
  }));
  const PostCommentBox = styled(Box)(({ theme, classbox }) => ({
    ...classbox(theme),
  }));
  const ButtonSectionModal = styled(Box)(({ theme, classbox }) => ({
    ...classbox(theme),
  }));
  const ModalDeleteIcon = styled(DeleteForeverIcon)(({ theme, classbox }) =>
    classbox(theme),
  );
  const ButtonEditBox = styled(Box)(({ theme, classbox }) => classbox(theme));

  // Others
  const { enqueueSnackbar } = useSnackbar();
  const { control, getValues, setError, setValue, watch } = useForm({
    orderComments: 0,
  });
  const navigate = useNavigate();

  // Funciones
  useEffect(() => {
    getCommentsByMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      getCommentsByMovie();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    if (comments.length > 0) {
      if (watch('orderComments') === 0 && dir !== 'desc') {
        setOrder(prevState => ({
          ...prevState,
          dir: 'desc',
        }));
      } else if (watch('orderComments') === 1 && dir !== 'asc') {
        setOrder(prevState => ({
          ...prevState,
          dir: 'asc',
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('orderComments')]);

  const getCommentsByMovie = async () => {
    try {
      setLoading(true);

      const response = await API.getCommentsByMovie(
        movieid,
        9999,
        0,
        orderby,
        dir,
      );

      setComments(response.records);

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

  const postComment = async () => {
    try {
      const values = getValues();

      if (!values.commentInput) {
        setError('commentInput', {
          type: 'custom',
          message: 'Campo es requerido',
        });
        return;
      }

      setLoading(true);
      const params = {
        dsc: values.commentInput,
        movie: movieid,
      };

      await API.postComment(params);

      // Si todo salio bien recargamos los comentarios y limpiamos el input
      setValue('commentInput', '');

      setLoading(false);

      getCommentsByMovie();
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

  const deleteComment = async () => {
    try {
      setMainLoading(true);

      await API.deleteComment(commentId);

      setMainLoading(false);

      enqueueSnackbar('Comentario eliminado con exito', {
        variant: 'success',
      });

      setOpenModal(false);
      getCommentsByMovie();
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

  const editComment = async () => {
    try {
      setLoading(true);

      const values = getValues();

      if (!values.editComment) {
        setError('editComment', {
          type: 'custom',
          message: 'Campo es requerido',
        });
        return;
      }

      const params = {
        dsc: values.editComment,
      };

      await API.editComment(editCommentId, params);

      setLoading(false);

      enqueueSnackbar('Comentario editado con exito', {
        variant: 'success',
      });

      setEditCommentId('');
      setOpenModal(false);
      getCommentsByMovie();
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
    <CommentBox classbox={theme => styles.mainBox(theme)}>
      <PostCommentBox
        classbox={styles.postCommentBox}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start">
        <Box position="relative" sx={{ width: '100%' }}>
          <TextAreaForm
            name="commentInput"
            control={control}
            placeholder="Comentar..."
            inputProps={{
              maxLength: 1000,
            }}
            disabled={!sessionid}
            fullWidth
            rows={2}
            variant="outlined"
          />

          {!sessionid ? (
            <BoxLoggedRequired classbox={styles.loginRequired}>
              <Typography variant="p2" component="p">
                Para comentar debe iniciar sesión
              </Typography>
              <ButtonLogin
                variant="primary"
                onClick={() => navigate('/login')}
                classbox={styles.btnLoginRequired}>
                Iniciar sesión
              </ButtonLogin>
            </BoxLoggedRequired>
          ) : null}
        </Box>

        <ButtonPost
          variant="primary"
          classbox={styles.postCommentBtn}
          onClick={() => postComment()}
          disabled={!sessionid}>
          Responder
        </ButtonPost>
      </PostCommentBox>

      {/**Filtros de comentarios */}
      <Box my={2} display="flex" alignItems="center">
        <Typography variant="p" component="p">
          Order por:
        </Typography>
        <SelectForm
          name="orderComments"
          defaultValue={0}
          control={control}
          items={[
            {
              value: 0,
              label: 'Mas reciente',
            },
            {
              value: 1,
              label: 'Mas antiguo',
            },
          ]}
          className={styles.orderSelect}
        />
      </Box>

      <Box position="relative">
        {loading ? (
          <Box sx={styles.loadingBox}>
            <SoloLoading />
          </Box>
        ) : (
          <>
            {comments.map((el, index) => (
              <Box
                key={`comment-${el.id}-${index}`}
                display="flex"
                alignItems="flex-start"
                mt={2}>
                <IconUser classbox={styles.iconUser} />
                <Box sx={styles.commentBox}>
                  <Box sx={styles.commentTitle}>
                    <Typography variant="h6" component="h6">
                      Nombre
                    </Typography>
                    <Box mx={1}>-</Box>

                    <CommentDate
                      variant="p2"
                      component="p"
                      classbox={styles.commentDateTxt}>
                      {el.created_date.formatted}
                    </CommentDate>
                  </Box>

                  {editCommentId === el.id ? (
                    <PostCommentBox
                      classbox={styles.postCommentBox}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start">
                      <TextAreaForm
                        name="editComment"
                        defaultValue={el.dsc}
                        control={control}
                        placeholder="Comentar..."
                        inputProps={{
                          maxLength: 1000,
                        }}
                        fullWidth
                        rows={2}
                        variant="outlined"
                      />
                      <ButtonEditBox classbox={styles.editButtonBox}>
                        <ButtonPost
                          variant="primary"
                          classbox={styles.editCommentBtn}
                          onClick={() => editComment()}>
                          Editar
                        </ButtonPost>

                        <ButtonPost
                          variant="secondary"
                          classbox={styles.editCancelBtn}
                          onClick={() => setEditCommentId('')}>
                          Cancelar
                        </ButtonPost>
                      </ButtonEditBox>
                    </PostCommentBox>
                  ) : (
                    <Typography variant="2" component="p">
                      {el.dsc}
                    </Typography>
                  )}

                  {editCommentId !== el.id ? (
                    <>
                      {el.canDelete || el.candEdit ? (
                        <Box sx={styles.actionBox}>
                          {el.canDelete ? (
                            <IconButton
                              onClick={() => {
                                setOpenModal(true);
                                setCommentId(el.id);
                              }}>
                              <DeleteIcon />
                            </IconButton>
                          ) : null}
                          {el.canEdit ? (
                            <IconButton onClick={() => setEditCommentId(el.id)}>
                              <EditIcon />
                            </IconButton>
                          ) : null}
                        </Box>
                      ) : null}
                    </>
                  ) : null}
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
      <ModalStyled
        open={openModal}
        handleClose={() => setOpenModal(false)}
        showCloseButton
        maxWidth="md">
        <Box display="flex" my={3} mx={1} justifyContent="center">
          <Box sx={styles.deleteModalIconBox}>
            <ModalDeleteIcon classbox={styles.deleteModalIcon} />
          </Box>
        </Box>
        <Typography variant="h6" component="p" textAlign="center">
          ¿Seguro que desea eliminar el comentario?
        </Typography>
        <ButtonSectionModal classbox={styles.modalBtnSection}>
          <Button variant="secondary" onClick={() => setOpenModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => deleteComment()}>
            Si
          </Button>
        </ButtonSectionModal>
      </ModalStyled>
    </CommentBox>
  );
};

export default CommentSection;
