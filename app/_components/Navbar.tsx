import React from 'react';
import { cookies } from 'next/headers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NavbarClient } from './NavbarClient';

async function fetchCities() {
  try {
    const res = await fetch('https://staging-v2-api.payrentz.com/web/home/city/', { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch cities Server Side', error);
    return null;
  }
}

async function fetchNavigation(token: string | undefined) {
  try {
    const res = await fetch('https://staging-v2-api.payrentz.com/web/navigation/', {
      headers: { ...(token && { Authorization: `Token ${token}` }) },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch navigation Server Side', error);
    return null;
  }
}

async function fetchRefreshDetails(token: string | undefined) {
  if (!token) return null;
  try {
    const res = await fetch('https://staging-v2-api.payrentz.com/access/customer/refresh/', {
      headers: { Authorization: `Token ${token}` },
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch refresh details Server Side', error);
    return null;
  }
}

const Navbar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['cities'],
      queryFn: () => fetchCities(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['navigation'],
      queryFn: () => fetchNavigation(token),
    }),
    queryClient.prefetchQuery({
      queryKey: ['refresh'],
      queryFn: () => fetchRefreshDetails(token),
    }),
  ]);

  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavbarClient />
    </HydrationBoundary>
  );
};

export default Navbar;