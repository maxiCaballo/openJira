import { FC, ReactElement } from 'react';
import Head from 'next/head';

import { Box } from '@mui/material';
import { Navbar, Sidebar } from '../ui';

type Props = {
  title?: string;
  children: ReactElement;
};

export const Layouts: FC<Props> = ({ title = 'Openjira App', children }) => {
  //sx es una prop parecida al style={{}} lo unico que me permite acceder al theme de @mui.
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Box sx={{ padding: '10px 20px' }}>{children}</Box>
    </Box>
  );
};
