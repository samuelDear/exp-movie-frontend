import { SoloLoadingStyles } from 'styles';
import { styled } from '@mui/system';

const styles = SoloLoadingStyles;
const Spinner = styled('div')(styles.spinner);

const SoloLoading = () => <Spinner></Spinner>;

export default SoloLoading;
