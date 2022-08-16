import { loadingStyles } from 'styles';
import { styled } from '@mui/system';

const styles = loadingStyles;

const LoadingBox = styled('div')(styles.loadingBox);
const Spinner = styled('div')(styles.spinner);

const Loading = () => (
  <LoadingBox>
    <Spinner></Spinner>
  </LoadingBox>
);

export default Loading;
