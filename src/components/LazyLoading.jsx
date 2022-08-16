import { lazyLoadingStyles } from 'styles';
import { styled } from '@mui/system';

const styles = lazyLoadingStyles;
const LoadingBox = styled('div')(styles.loadingBox);
const Spinner = styled('div')(styles.spinner);

const LazyLoading = () => (
  <LoadingBox>
    <Spinner></Spinner>
  </LoadingBox>
);

export default LazyLoading;
