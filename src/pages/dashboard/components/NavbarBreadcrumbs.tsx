import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from '@mui/material';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function NavbarBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean); 
    const createBreadcrumb = (path: string, label: string): BreadcrumbItem => ({
      href: `/${path}`, 
      label,
    });

    const newBreadcrumbs: BreadcrumbItem[] = [];
    newBreadcrumbs.push(createBreadcrumb('/', 'Dashboard'));
    pathSegments.forEach((segment, index) => {
      const path = pathSegments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize first letter
      newBreadcrumbs.push(createBreadcrumb(path, label));
    });

    setBreadcrumbs(newBreadcrumbs);
  }, [location.pathname]);
  return (

    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((item, index) => (
        index === breadcrumbs.length - 1 ? 
          <Typography key={index} variant="body2" sx={{ color: 'text.primary', fontWeight: '500' }}> {item.label} </Typography>
          : <Typography key={index} variant="body2" > {item.label} </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
