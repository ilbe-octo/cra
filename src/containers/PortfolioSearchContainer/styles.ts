import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  height: '100%',
  minHeight: 500,
  display: 'flex',
  flexDirection: 'column',
};

export const createBtnWrapperStyles: SxProps<Theme> = {
  px: 2,
  py: 4,
  alignSelf: 'flex-end',
};

export const searchWrapperStyles: SxProps<Theme> = {
  flex: 1,
  pt: 12.5,
  width: 450,
  alignSelf: 'center',
};

export const searchHeaderStyles: SxProps<Theme> = {
  mb: 2,
  fontSize: '1.3rem',
  textAlign: 'center',
};

export const circularProgressStyles: SxProps<Theme> = {
  mr: 0.5,
};
