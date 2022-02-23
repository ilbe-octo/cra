import { Link, Route, Routes } from 'react-router-dom';
import { Box, SxProps, Theme } from '@mui/material';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PortfolioSearch = lazy(() => import('./pages/PortfolioSearch'));
const PortfolioDetails = lazy(() => import('./pages/PortfolioDetails'));

const routesDef = [
  { path: '/', title: 'Home', Component: Home },
  {
    path: 'search-portfolio',
    title: 'Portfolio Search',
    Component: PortfolioSearch,
  },
  {
    path: 'portfolio',
    title: 'Portfolio',
    Component: Portfolio,
  },
  {
    path: 'portfolio/:portfolioCode',
    title: 'Portfolio Details',
    Component: PortfolioDetails,
  },
];

const mainStyles: SxProps<Theme> = {
  padding: '80px 120px',
  height: '610px',
};

const wrapperStyles: SxProps<Theme> = {
  height: '100%',
  backgroundColor: 'white',
};

function AppRoutes() {
  return (
    <Box>
      <Box component="nav">
        {routesDef.map(({ path, title }) => (
          <Box component="span" key={path} pr={1}>
            <Link to={path}>{title}</Link>
          </Box>
        ))}
      </Box>
      <Box component="main" sx={mainStyles}>
        <Box sx={wrapperStyles}>
          <Routes>
            {routesDef.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default AppRoutes;
