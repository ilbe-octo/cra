import { ComponentType, useState } from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface DropDownMenuItem {
  label: string;
  Icon: SvgIconComponent;
  onClick(): void;
}

interface DropDownMenuProps {
  id: string;
  loading?: boolean;
  Element: ComponentType;
  items: DropDownMenuItem[];
}

function DropDownMenu({ id, loading, Element, items }: DropDownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="settings"
        onClick={handleClick}
        disabled={loading}
      >
        <Element />
      </IconButton>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {items.map(({ label, Icon, onClick }) => (
          <MenuItem key={label} onClick={onClick}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default DropDownMenu;
