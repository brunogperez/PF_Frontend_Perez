import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import geometricBg from '../assets/backgrounds/geometric-bg.svg';

export const BackgroundWithSVG = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${geometricBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        opacity: 0.9,
      },
    }}>
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default BackgroundWithSVG;
