import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import {
  PortfolioCard,
  LoadingPortfolioCard,
} from './components/PortfolioCard';
import { Portfolio } from 'common/types';

interface ViewProps {
  page: number;
  pages: number;
  errorCode?: string;
  portfolios?: Portfolio[];
  onErrorReset(): void;
  onPageChange(page: number): void;
}

function View({
  page,
  pages,
  errorCode,
  portfolios,
  onErrorReset,
  onPageChange,
}: ViewProps) {
  return (
    <Box
      sx={{
        p: 2,
        overflow: 'auto',
        maxHeight: '100%',
        boxSizing: 'border-box',
      }}
    >
      {errorCode && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={onErrorReset}>
          {errorCode}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ pb: 2 }}>
        {portfolios ? (
          portfolios.map(portfolio => (
            <Grid item key={portfolio.code} xs={4}>
              <PortfolioCard portfolio={portfolio} />
            </Grid>
          ))
        ) : (
          <>
            <Grid item xs={4}>
              <LoadingPortfolioCard />
            </Grid>
            <Grid item xs={4}>
              <LoadingPortfolioCard />
            </Grid>
            <Grid item xs={4}>
              <LoadingPortfolioCard />
            </Grid>
          </>
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {portfolios && (
          <Pagination
            page={page}
            count={pages}
            shape="rounded"
            color="secondary"
            variant="outlined"
            onChange={(_, value) => onPageChange(value)}
          />
        )}
      </Box>
    </Box>
  );
}

export default View;
