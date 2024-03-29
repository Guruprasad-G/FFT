import { useState } from 'react';
import { AppBar, Button, Box, Container, CssBaseline, createTheme, IconButton, Menu, MenuItem, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/core/Menu'
import LightIcon from '../../light-icon.png'
import DarkIcon from '../../dark-icon.png'

const pages = [];
const darkTheme = createTheme({ palette: { mode: 'dark'}});
const lightTheme = createTheme({ palette: { mode: 'light'}});

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(true);
  const [theme,switchtheme] = useState(lightTheme);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
    <AppBar enableColorOnDark color='primary'>
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
            Butterfly
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="medium" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
              keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
              open={Boolean(anchorElNav)}  onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h5" noWrap component="a" href=""
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',
              color: 'inherit', textDecoration: 'none', }}>
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={() => {theme === darkTheme ? switchtheme(lightTheme) : switchtheme(darkTheme)}} color="inherit">
        {theme.palette.mode === 'dark' ? <img src={DarkIcon} alt="DarkThemeIcon" /> :<img src={LightIcon} alt="LightThemeIcon" />}
      </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    </MuiThemeProvider>
    </>
  );
}
export default NavBar;






