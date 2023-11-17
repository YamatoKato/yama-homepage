import { FC, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Skeleton,
  Grid,
} from '@mui/material';
import { OgData } from '@/pages/api/ogdata';

type OgState = {
  ogData?: OgData;
  isCompleted: boolean;
};

const LinkCard: FC<any> = ({ url }) => {
  const [state, setState] = useState<OgState>({
    ogData: undefined,
    isCompleted: false,
  });

  useEffect(() => {
    fetch(`/api/ogdata?url=${encodeURIComponent(url)}`)
      .then((payload) => payload.json())
      .then((data) => {
        setState({
          ogData: data,
          isCompleted: true,
        });
      });
  }, [url]);

  return !state.isCompleted ? (
    <LinkCardLoading />
  ) : (
    <LinkCardCompleted ogData={state.ogData as OgData} />
  );
};

export default LinkCard;

const LinkCardLoading = () => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Grid container spacing={2} direction='column'>
          {[0, 1, 2, 3].map((index) => (
            <Grid item key={index}>
              <Skeleton height='20px' />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const LinkCardCompleted: React.FC<any> = ({ ogData }) => {
  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        height: 'auto',
        transition: 'box-shadow 0.3s ease',
        marginY: 2,
      }}
    >
      <Link href={ogData.url} target='_blank' rel='noopener noreferrer'>
        <Grid container spacing={2}>
          {ogData.image && (
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <img
                  src={ogData.image}
                  alt={ogData.siteName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    maxWidth: '100%',
                  }}
                />
              </Box>
            </Grid>
          )}
          <Grid item xs={12} sm={8} md={9} lg={9} container direction='column'>
            <CardContent>
              <Typography variant='subtitle1' fontWeight='bold' paragraph>
                {ogData.title}
              </Typography>
              <Typography variant='body2' paragraph>
                {ogData.description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Link>
    </Card>
  );
};
