import React from 'react';
import Link from 'next/link';
import { Search, LogOutIcon } from 'lucide-react';
import { FaUser } from "react-icons/fa6";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DesktopNavbarProps {
    selectedCity: string;
    selectedPin: string;
    setDialogOpen: (open: boolean) => void;
    navigationData: any;
    refreshData: any;
    handleLogout: () => void;
    setLoginOpen: (open: boolean) => void;
}

export function DesktopNavbar({
    selectedCity,
    selectedPin,
    setDialogOpen,
    navigationData,
    refreshData,
    handleLogout,
    setLoginOpen
}: DesktopNavbarProps) {
    return (
        <div className="hidden xl:block">
            <div className='flex justify-between py-[13px] h-[59px] pr-[60px] '>
                <div className='flex items-center pl-[60px]'>
                    <Link href='/'>
                        <img className="max-w-[132px] " src="/payrentz-logo.5c7f17d4.svg" alt="logo" />
                    </Link>

                    <button
                        onClick={() => setDialogOpen(true)}
                        className='flex flex-row ml-[20px] items-center bg-transparent border-0 p-0 cursor-pointer'
                    >
                        <img src='/location.8b71f906.svg' className='w-6 h-6' />
                        <div className='text-xs font-semibold text-[13px] pl-2 text-left'>
                            <p className='text-gray-800'>{selectedCity}</p>
                            <p className='text-gray-400'>{selectedPin}</p>
                        </div>
                    </button>

                    <div className="hidden xl:flex items-center">
                        {navigationData?.data?.categories?.map((category: any) => (
                            <Link key={category.id} href={`/${selectedCity.toLowerCase()}/${category.slug}`} className='flex items-center font-semibold pl-[30px] h-[16px] '>
                                <p>{category.identity}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className='flex items-center gap-[30px]'>
                    <div className="relative w-[372px]">
                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-full h-[40px] pl-3 pr-10 rounded-[5px] border border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                            <Search className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                    <div className='flex cursor-pointer'>
                        <img src="/cart.5fa6c9b1.svg" alt='Cart' />
                        <p className='pl-[3px] text-sm font-semibold pl-[8px]'>Cart</p>
                    </div>
                    {refreshData?.data?.first_name ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='destructive' className='px-[15px] py-[6px] rounded-[20px]'><FaUser />{refreshData.data.first_name}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                                    <LogOutIcon />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant='destructive' onClick={() => setLoginOpen(true)}>Login</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
