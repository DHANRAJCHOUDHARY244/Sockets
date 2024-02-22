import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';
import { Link, NavLink } from 'react-router-dom';

const pages = [
    {
        id: 0,
        link: '/',
        name: 'Home'
    },
    {
        id: 1,
        link: '/web-sockets',
        name: 'WebSockets'
    },
    {
        id: 2,
        link: '/dept-sockets',
        name: 'DeptWebSockets'
    },
    {
        id: 3,
        link: '/kline-sockets',
        name: 'KlineWebSockets'
    },
];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PublicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
 {pages.map((page) => (
    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
        <NavLink to={page.link} className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
        }>
            <Typography textAlign="center">{page.name}</Typography>
        </NavLink>
    </MenuItem>
))}



                        </Menu>
                    </Box>
                    <PublicIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    {pages.map((page) => (
        <Button
            key={page.id}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
        >
           <NavLink to={page.link} 
           className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""}
            style={{textDecoration:'none'}}
        >
            <Typography textAlign="center">{page.name}</Typography>
        </NavLink>
        </Button>

    ))}
</Box>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}><SignedOut>
                                <Button variant="contained" startIcon={<AccountCircleIcon />}>
                                    <Link to="/sign-in" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Sign In</Link>
                                </Button>
                            </SignedOut></IconButton>
                            <IconButton sx={{ p: 0 }}>
                                <SignedIn>
                                    <UserButton afterSignOutUrl='/sign-in' />
                                </SignedIn>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
