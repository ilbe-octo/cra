import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import {
  AddOutlined as AddIcon,
  SearchOutlined as LoopIcon,
} from '@mui/icons-material';
import { WORDINGS } from 'common/constants';
import {
  containerStyles,
  searchHeaderStyles,
  searchWrapperStyles,
  createBtnWrapperStyles,
  circularProgressStyles,
} from './styles';

interface ViewProps {
  loading: boolean;
  errorCode?: string;
  onErrorReset(): void;
  onSubmit(value: string): void;
}

function View({ loading, errorCode, onSubmit, onErrorReset }: ViewProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (errorCode) onErrorReset();
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={createBtnWrapperStyles}>
        <Button variant="outlined" startIcon={<AddIcon />}>
          {WORDINGS.CREATE_PORTFOLIO}
        </Button>
      </Box>
      <Box sx={searchWrapperStyles}>
        <Typography variant="h6" sx={searchHeaderStyles}>
          {WORDINGS.SEARCH_PORTFOLIO}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            autoFocus
            size="small"
            value={value}
            disabled={loading}
            variant="outlined"
            id="portfolio-search"
            error={!!errorCode}
            helperText={errorCode && WORDINGS.ERRORS[errorCode]}
            placeholder={WORDINGS.PORTFOLIO_SEARCH_PLACEHOLDER}
            onChange={handleChange}
            InputProps={{
              startAdornment: <SearchInputIcon loading={loading} />,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function SearchInputIcon({ loading }: { loading: boolean }) {
  return (
    <InputAdornment position="start">
      {loading ? (
        <CircularProgress size={22} sx={circularProgressStyles} />
      ) : (
        <LoopIcon />
      )}
    </InputAdornment>
  );
}

export default View;
