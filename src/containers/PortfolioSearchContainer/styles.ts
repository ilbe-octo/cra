import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '500px',
  height: '100%',
};

export const createBtnWrapperStyles: SxProps<Theme> = theme => ({
  alignSelf: 'flex-end',
  padding: theme.spacing(4, 2),
});

export const searchWrapperStyles: SxProps<Theme> = theme => ({
  flex: 1,
  width: '450px',
  alignSelf: 'center',
  paddingTop: theme.spacing(12.5),
});

export const searchHeaderStyles: SxProps<Theme> = theme => ({
  fontSize: '1.3rem',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
});

export const circularProgressStyles: SxProps<Theme> = theme => ({
  marginRight: theme.spacing(0.5),
});
