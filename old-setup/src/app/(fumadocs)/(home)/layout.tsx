import React from 'react'

import { HomeLayout } from 'fumadocs-ui/layouts/home';
 import { baseOptions } from '@/app/(fumadocs)/layout.config';

 export default function Layout(props: { children: React.ReactNode }) {
   const { children } = props
   return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
 }

