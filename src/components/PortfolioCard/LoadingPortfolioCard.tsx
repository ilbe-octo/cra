import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';
import {
  portfolioCardActionStyles,
  portfolioCardStyles,
  portfolioContentStyles,
} from './styles';

function LoadingPortfolioCard() {
  return (
    <Card variant="elevation" sx={portfolioCardStyles}>
      <CardHeader
        title={
          <Skeleton width="80%" height={30} animation="wave" sx={{ mb: 0.5 }} />
        }
        subheader={<Skeleton width="40%" height={20} animation="wave" />}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={portfolioContentStyles}
      />
      <CardActions disableSpacing>
        <Skeleton
          width={40}
          height={40}
          animation="wave"
          variant="circular"
          sx={portfolioCardActionStyles}
        />
      </CardActions>
    </Card>
  );
}

export default LoadingPortfolioCard;
