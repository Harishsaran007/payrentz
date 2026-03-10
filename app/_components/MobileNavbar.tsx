import React from 'react';
import Link from 'next/link';
import { Menu, Search, LogOutIcon } from 'lucide-react';
import { FaUser } from "react-icons/fa6";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MobileNavbarProps {
    selectedCity: string;
    selectedPin: string;
    setMobileDialogOpen: (open: boolean) => void;
    navigationData: any;
    refreshData: any;
    handleLogout: () => void;
    setLoginOpen: (open: boolean) => void;
}

export function MobileNavbar({
    selectedCity,
    selectedPin,
    setMobileDialogOpen,
    navigationData,
    refreshData,
    handleLogout,
    setLoginOpen
}: MobileNavbarProps) {
    return (
        <div className="xl:hidden block bg-white">
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                                <Menu className="w-6 h-6 text-black" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[540px]">
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    <img className="max-w-[200px]" src="/payrentz-logo.5c7f17d4.svg" alt="logo" />
                                </SheetTitle>
                                <SheetDescription className="hidden">
                                    Navigation Menu
                                </SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 mt-6 ml-[20px]">
                                <div className="border-b pb-4 ">
                                    <p className="font-semibold text-sm text-gray-500 mb-2">Delivery Location</p>
                                    <button onClick={() => setMobileDialogOpen(true)} className='flex flex-row items-center w-full bg-transparent border-0 p-0 cursor-pointer text-left'>
                                        <img src='/location.8b71f906.svg' className="w-5 h-5" alt="Location" />
                                        <div className='text-left pl-2'>
                                            <p className='text-sm font-semibold text-gray-800'>{selectedCity}</p>
                                            <p className='text-xs text-gray-500'>{selectedPin}</p>
                                        </div>
                                    </button>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {navigationData?.data?.categories?.map((category: any, index: number) => (
                                        <Link key={category.id} href={`/${selectedCity.toLowerCase()}/${category.slug}`} className={`flex items-center font-semibold h-[16px] gap-2 ${index > 0 ? 'mt-2' : ''}`}>
                                            <p className="text-lg">{category.identity}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link href="/">
                        <img className="max-w-[100px]" src="/payrentz-logo.5c7f17d4.svg" alt="logo" />
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {refreshData?.data?.first_name ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='destructive' className='px-[15px] py-[6px] rounded-[20px]'>
                                    <FaUser />{refreshData.data.first_name}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                                    <LogOutIcon className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant='destructive' onClick={() => setLoginOpen(true)}>Login</Button>
                    )}
                    <img src="/cart.5fa6c9b1.svg" alt="cart" className="w-6 h-6" />
                </div>
            </div>
            <div className="px-4 pb-4">
                <div className="relative w-full">
                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Search className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
