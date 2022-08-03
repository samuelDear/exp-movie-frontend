import { loadingStyles } from 'styles';
import { styled } from '@mui/system';

const Loading = () => {
  const styles = loadingStyles;

  const LoadingBox = styled('div')(styles.loadingBox);
  const Spinner = styled('div')(styles.spinner);

  return (
    <LoadingBox>
      <Spinner></Spinner>
    </LoadingBox>
  );
};

export default Loading;
