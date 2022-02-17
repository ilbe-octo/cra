import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  ArrowForwardIosOutlined as ArrowForwardIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Portfolio } from 'common/types';
import { WORDINGS, PATHS } from 'common/constants';
import { formatDate } from 'utils';
import {
  portfolioCardActionStyles,
  portfolioCardStyles,
  portfolioContentStyles,
  portfolioDetailLabelStyles,
} from './styles';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const { code, type, parentCode, creationDate, division, manager } = portfolio;

  const portfolioDetailsContent = [
    {
      label: `${WORDINGS.DIVISION}: `,
      content: division.title,
    },

    { label: `${WORDINGS.PORTFOLIO_TYPE}: `, content: type },

    {
      label: `${WORDINGS.PORTFOLIO_PARENT}: `,
      content: parentCode || WORDINGS.NOT_SPECIFIED,
    },

    {
      label: `${WORDINGS.PORTFOLIO_MANAGER}: `,
      content: manager.fullName
        ? `${manager.fullName} (${manager.username})`
        : manager.username,
    },
  ];

  return (
    <Card variant="elevation" sx={portfolioCardStyles}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={code}
        subheader={formatDate(creationDate, "'Crée le' dd MMMM yyyy")}
      />
      <PortfolioDetailsCardContent items={portfolioDetailsContent} />
      <CardActions disableSpacing>
        <IconButton
          size="small"
          aria-label="show more"
          sx={portfolioCardActionStyles}
          href={PATHS.portfolioDetail.to(code)}
        >
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function PortfolioDetailsCardContent({
  items,
}: {
  items: {
    label: string;
    content: string;
  }[];
}) {
  return (
    <CardContent sx={portfolioContentStyles}>
      {items.map(({ label, content }, index) => (
        <Typography key={index} variant="body2">
          <Typography variant="caption" sx={portfolioDetailLabelStyles}>
            {label}
          </Typography>
          {content}
        </Typography>
      ))}
    </CardContent>
  );
}

export default PortfolioCard;
