import { useAuthStore } from '../hooks/useAuthStore';
import { 
  Box, 
  CardContent, 
  Typography, 
  IconButton, 
  Card, 
  FormControlLabel, 
  Checkbox, 
  Avatar,
  Stack,
  Chip,
  Divider,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarIcon from '@mui/icons-material/Star';

export const UserItem = ({_id, first_name, last_name, role, email}) => {
  const { startDeleteUser, startSwitchRole } = useAuthStore();

  const onDeleteUser = async (e) => {
    e.stopPropagation();
    await startDeleteUser(_id);
  };
  
  const onSwitchRole = async (newRole, e) => {
    e.stopPropagation();
    const roleToSet = role === newRole ? 'user' : newRole;
    await startSwitchRole(_id, roleToSet);
  };

  const getRoleColor = () => {
    switch(role) {
      case 'admin': return 'error';
      case 'premium': return 'warning';
      default: return 'primary';
    }
  };

  const getRoleIcon = () => {
    switch(role) {
      case 'admin': return <AdminPanelSettingsIcon fontSize="small" />;
      case 'premium': return <StarIcon fontSize="small" />;
      default: return <PersonIcon fontSize="small" />;
    }
  };

  return (
    <Card 
      sx={{ 
        minWidth: 300, 
        borderRadius: 2, 
        boxShadow: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              {first_name?.charAt(0)}{last_name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" component="div">
                {first_name} {last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Eliminar usuario">
            <IconButton 
              onClick={onDeleteUser}
              size="small"
              sx={{ alignSelf: 'flex-start' }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            icon={getRoleIcon()}
            label={role.toUpperCase()}
            color={getRoleColor()}
            variant="outlined"
            size="small"
          />
        </Stack>
        
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <FormControlLabel
            control={
              <Checkbox
                checked={role === 'admin'}
                onChange={(e) => onSwitchRole('admin', e)}
                color="error"
                size="small"
              />
            }
            label="Admin"
            componentsProps={{
              typography: { variant: 'body2' }
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={role === 'premium'}
                onChange={(e) => onSwitchRole('premium', e)}
                color="secondary"
                size="small"
              />
            }
            label="Premium"
            componentsProps={{
              typography: { variant: 'body2' }
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserItem;