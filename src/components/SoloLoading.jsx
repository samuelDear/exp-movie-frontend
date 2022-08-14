import { SoloLoadingStyles } from 'styles';
import { styled } from '@mui/system';

const SoloLoading = () => {
  const styles = SoloLoadingStyles;

  const Spinner = styled('div')(styles.spinner);

  return <Spinner></Spinner>;
};

export default SoloLoading;
