import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  ArrowForwardIosOutlined as ArrowForwardIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import DropDownMenu from 'components/DropDownMenu';
import { Portfolio } from 'common/types';
import { WORDINGS, PATHS } from 'common/constants';
import { formatDate } from 'utils';
import {
  portfolioCardActionStyles,
  portfolioCardStyles,
  portfolioContentStyles,
  portfolioDetailLabelStyles,
} from './styles';

type PortfolioCardProps = {
  loading?: boolean;
  portfolio: Portfolio;
} & (
  | {
      enableActions: true;
      onDelete(): void;
    }
  | { enableActions?: false; onDelete?: never }
);

function PortfolioCard({
  loading,
  portfolio,
  enableActions,
  onDelete,
}: PortfolioCardProps) {
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
      content: manager
        ? `${manager.fullName} (${manager.username})`
        : WORDINGS.NOT_SPECIFIED,
    },
  ];

  const items = [
    {
      label: 'Delete',
      Icon: DeleteIcon,
      onClick: () => {
        onDelete && onDelete();
      },
    },
  ];

  return (
    <Card variant="elevation" sx={portfolioCardStyles}>
      <CardHeader
        action={
          enableActions && (
            <DropDownMenu
              id={`menu-${code}`}
              loading={loading}
              Element={MoreVertIcon}
              items={items}
            />
          )
        }
        title={code}
        subheader={formatDate(creationDate, "'Crée le' dd MMMM yyyy")}
      />
      <PortfolioDetailsCardContent items={portfolioDetailsContent} />
      <CardActions disableSpacing>
        <Button
          size="small"
          aria-label="show more"
          disabled={loading}
          component={Link}
          sx={portfolioCardActionStyles}
          to={PATHS.portfolioDetail.to(code)}
        >
          <ArrowForwardIcon />
        </Button>
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
