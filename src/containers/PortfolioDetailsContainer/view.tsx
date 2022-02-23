import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import {
  CheckCircle as CheckedIcon,
  CheckCircleOutline as NonCheckdIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { PortfolioCard, LoadingPortfolioCard } from 'components/PortfolioCard';
import { Portfolio, PortfolioManager } from 'common/types';
import { WORDINGS } from 'common/constants';

interface ViewProps {
  errorCodes: string[];
  portfolio?: Portfolio;
  managers?: PortfolioManager[];
  isDeleting: boolean;
  isLoadingManagers: boolean;
  isLoadingPortfolio: boolean;
  onErrorReset(index: number): void;
  onPortfolioDelete(code: string): void;
}

function View({
  errorCodes,
  portfolio,
  managers,
  isDeleting,
  isLoadingManagers,
  isLoadingPortfolio,
  onErrorReset,
  onPortfolioDelete,
}: ViewProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 2, maxHeight: 580, overflow: 'auto' }}>
      {errorCodes.map((code, index) => (
        <Alert
          key={index}
          sx={{ mb: 2 }}
          severity="error"
          onClose={() => onErrorReset(index)}
        >
          {WORDINGS.ERRORS[code]}
        </Alert>
      ))}
      <Grid container mb={2}>
        <Grid item xs={6}>
          {isLoadingPortfolio ? (
            <LoadingPortfolioCard />
          ) : (
            portfolio && (
              <PortfolioCard
                enableActions
                loading={isDeleting}
                portfolio={portfolio}
                onDelete={() => setOpen(true)}
              />
            )
          )}
        </Grid>
      </Grid>

      {/* START -- to be replaced */}
      {isLoadingManagers && <h1>Loading managers...</h1>}
      {managers && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {managers.map(({ username, fullName, primary }) => (
                <TableRow
                  key={username}
                  sx={{
                    '&:last-child td': { border: 0 },
                  }}
                >
                  <TableCell>{username}</TableCell>
                  <TableCell>{fullName}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      {primary ? <CheckedIcon /> : <NonCheckdIcon />}
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* END -- to be replaced */}

      {portfolio && (
        <ConfirmationDialog
          id="delete-portfolio-confirmation"
          open={open}
          title={WORDINGS.DELETION_CONFIRMATION}
          confirmationMessage={WORDINGS.PORTFOLIO_DELETION_MESSAGE}
          onClose={() => setOpen(false)}
          onConfirm={() => onPortfolioDelete(portfolio.code)}
        />
      )}
    </Box>
  );
}

export default View;
