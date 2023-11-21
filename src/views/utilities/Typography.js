import { Grid } from '@mui/material';
// import MuiTypography from '@mui/material/Typography';

// project imports
// import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import Users from './users.js'

// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => (
  <MainCard title="Muse Users Data" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
    <Grid container spacing={gridSpacing}>
      <Users />
    </Grid>
  </MainCard>
);

export default Typography;
