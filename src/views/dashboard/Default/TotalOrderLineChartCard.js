import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
// import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// import ChartDataMonth from './chart-data/total-order-month-line-chart';
// import ChartDataYear from './chart-data/total-order-year-line-chart';

import axios from 'axios';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
  const [freeUsersCount, setFreeUsersCount] = useState(null);
  const [totalPostsCount, setTotalPostsCount] = useState(null);

  useEffect(() => {
    // Make a request to the server to get subscription data
    axios.get('http://localhost:3005/api/subscriptions')
      .then(response => {
        const subscriptions = response.data;

        // Filter subscriptions to get only free subscriptions
        const freeSubscriptions = subscriptions.filter(sub => sub.type === 'free');

        // Count the number of free users
        const freeUsersCount = freeSubscriptions.length;

        // Set the state with the count of free users
        setFreeUsersCount(freeUsersCount);
      })
      .catch(error => {
        console.error('Error fetching subscription data:', error);
      });

    // Make a request to the server to get posts data
    axios.get('http://localhost:3005/api/posts')
      .then(response => {
        const posts = response.data;

        // Count the number of posts
        const totalPostsCount = posts.length;

        // Set the state with the count of total posts
        setTotalPostsCount(totalPostsCount);
      })
      .catch(error => {
        console.error('Error fetching posts data:', error);
      });
  }, []);

  const theme = useTheme();

  // const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button

                    >
                    </Button>
                    <Button

                    >
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                          {freeUsersCount !== null ? `${freeUsersCount} Free` : "Loading..."}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            backgroundColor: theme.palette.primary[200],
                            color: theme.palette.primary.dark
                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: theme.palette.primary[200]
                          }}
                        >
                          Free Users
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={6}>
                    {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}


      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false} style={{ marginTop: 10 }}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button

                    >
                    </Button>
                    <Button
                      // disableElevation
                      // variant={!timeValue ? 'contained' : 'text'}
                      // size="small"
                      // sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      .
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                          {totalPostsCount !== null ? `${totalPostsCount} Posts` : "Loading..."}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            backgroundColor: theme.palette.primary[200],
                            color: theme.palette.primary.dark
                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: theme.palette.primary[200]
                          }}
                        >
                          Number of posts on Muse
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={6}>
                    {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
