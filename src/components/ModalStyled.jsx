import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import { ModalStyledStyles } from 'styles';

const DialogTop = styled(DialogTitle)(({ theme, classbox }) => classbox(theme));
const DialogBody = styled(DialogContent)(({ theme, classbox }) =>
  classbox(theme),
);

const ModalStyled = ({
  open = false,
  title = '',
  handleClose,
  showCloseButton = false,
  children = '',
  fullWidth = true,
  maxWidth = 'sm',
  onAccept,
  acceptTitle = 'Aceptar',
  onCancel,
  cancelTitle = 'Cancelar',
  closeButtonColor = '#000',
  ...props
}) => {
  const classes = ModalStyledStyles;

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      classes={{
        paper: `${classes.mainBox}`,
      }}
      {...props}>
      {title || (handleClose && showCloseButton) ? (
        <DialogTop classbox={classes.rootTitle}>
          {title}
          {handleClose && showCloseButton ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: closeButtonColor,
              }}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTop>
      ) : null}
      <DialogBody classbox={classes.content}>{children}</DialogBody>
      {(onCancel || onAccept) && (
        <DialogActions sx={classes.rootActions}>
          {onCancel && (
            <Button variant="contained" size="small" onClick={onCancel}>
              {cancelTitle}
            </Button>
          )}
          {onAccept && (
            <Button
              autoFocus
              onClick={onAccept}
              size="small"
              color="primary"
              variant="primary">
              {acceptTitle}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalStyled;
