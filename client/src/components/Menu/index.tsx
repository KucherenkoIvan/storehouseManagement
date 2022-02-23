import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CentredTypography } from '../CentredTypography';
import { useAuth } from '../../hooks/auth.hook';


const MenuRow = styled(Toolbar)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const Nowrap = styled(Container)`
  display: flex !important;
  flex-flow: raw nowrap;
  gap: 40px;
  display: inline;
`

const AppMenu: React.FC<{ title: string }> = ({ title }) => {
  const [userElemenr, setUserElement] = React.useState<null | HTMLElement>(null);

  const { userInfo: { role }, logout } = useAuth();

  const userClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setUserElement(event.currentTarget);
  };

  const closeMenu = () => {
    setUserElement(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <MenuRow disableGutters>
          <Nowrap>
            <Link
              to="/"
              style={{textDecoration: 'none'}}
            >
              <CentredTypography
                color="white"
                variant="button"
              >
                Главная
              </CentredTypography>
            </Link>

            {role === 1 && (
              <Link
                to="/products"
                style={{textDecoration: 'none'}}
              >
                <CentredTypography
                  color="white"
                  variant="button"
                >
                  Управление продуктами
                </CentredTypography>
              </Link>
            )}
          </Nowrap>



          <Nowrap>
            <Typography variant='h4'>{title}</Typography>
          </Nowrap>

          <Box>
            <IconButton onClick={userClickHandler}>
              <Avatar />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={userElemenr}
              open={!!userElemenr}
              onClose={closeMenu}
            >
              <MenuItem onClick={closeMenu}>
                <Link to='/lk' style={{ textDecoration: 'none' }}>
                  <Typography>Личный кабинет</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography>Выйти</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </MenuRow>
      </Container>
    </AppBar>
  );
};

export default AppMenu;
