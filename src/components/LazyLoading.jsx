import { lazyLoadingStyles } from 'styles';
import { styled } from '@mui/system';

const LazyLoading = () => {
  const styles = lazyLoadingStyles;
  const LoadingBox = styled('div')(styles.loadingBox);
  const Spinner = styled('div')(styles.spinner);

  return (
    <LoadingBox>
      <Spinner></Spinner>
    </LoadingBox>
  );
};

export default LazyLoading;
