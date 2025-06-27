'use client';

import NavLinks from '@/app/ui/dashboard/nav-links';
import {AcmeLogo} from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
const drawerWidth = 200;

interface Props {
  window?: () => Window;
}


export default function SideNav(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);  //mobileOpen用于控制侧边栏的开关状态，setMobileOpen用于更新这个状态
  const [isClosing, setIsClosing] = React.useState(false);    // isClosing用于控制侧边栏是否正在关闭，setIsClosing用于更新这个状态
  const [desktopOpen, setDesktopOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column',  }}>
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
          height: '64px', 
          bgcolor: 'primary.main',
          borderRadius: 2,
          marginLeft:0.25,
          marginRight:0.25,
          marginTop: 0.1,
        }}
      >
        <AcmeLogo />
      </Box>
      <Divider />
      <NavLinks />
      <Divider />
      <Box sx={{ flexGrow: 1 }} /> 
      <Box 
        sx={{ 
          margin: 1, 
          mt: 'auto', 
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md w-full bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 flex-none p-2 px-3'">
          <PowerIcon className="w-6" />
          <div className="block">Sign Out</div>
        </button>
      </Box>
    </Box>
);

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
  //   <div className="flex h-full flex-col px-3 py-4 md:px-2">
  //     <Link
  //       className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
  //       href="/"
  //     >
  //       <div className="w-32 text-white md:w-40">
  //         <AcmeLogo />
  //       </div>
  //     </Link>
  //     <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
  //       <NavLinks />
  //       <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
  //       <form
  //         action={async () => {
  //           'use server';
  //           await signOut({ redirectTo: '/' });
  //         }}
  //       >
  //         <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
  //           <PowerIcon className="w-6" />
  //           <div className="hidden md:block">Sign Out</div>
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
        enableColorOnDark
        sx={{
          width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          ml: { sm: `${desktopOpen ? drawerWidth : 0}px` },
          transition: 'width 0.3s, margin-left 0.3s',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none', xs: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDesktopDrawerToggle}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* 这里可以插入appbar内容 */}

          {/* 插入居右侧的AcmeLogo */}
          <Box sx={{ flexGrow: 1 }} />
          <AcmeLogo />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: desktopOpen ? drawerWidth : 0 },
          flexShrink: { sm: 0 },
          transition: 'width 0.3s',
        }}
        aria-label="manu folders"
      >
        {/* 小屏drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* 大屏drawer */}
        <Drawer
          variant="persistent"
          open={desktopOpen}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              transition: 'width 0.3s',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
     
      
    </Box>
  );
}
