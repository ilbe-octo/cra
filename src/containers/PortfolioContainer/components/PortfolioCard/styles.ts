import { SxProps, Theme } from '@mui/material/styles';
import { FONT_FAMILY } from 'utils/themes';

export const portfolioContentStyles: SxProps<Theme> = { height: 100 };

export const portfolioCardActionStyles: SxProps<Theme> = { marginLeft: 'auto' };

export const portfolioCardStyles: SxProps<Theme> = {
  boxShadow: 2,
  borderRadius: 2,
};

export const portfolioDetailLabelStyles: SxProps<Theme> = {
  fontFamily: FONT_FAMILY.OPEN_SANS_CONDENSED,
};
