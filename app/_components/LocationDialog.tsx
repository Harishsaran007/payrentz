import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface City {
    id: number;
    identity: string;
    pincode_detail: number;
}

interface LocationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isMobile?: boolean; // Default to false
    pinInput: string;
    pinError: string;
    handlePinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePinVerify: (isMobile: boolean) => void;
    citiesLoading: boolean;
    cities: City[];
    selectedCity: string;
    handleCitySelect: (city: string, pin: string, isMobile: boolean) => void;
    getCityImage: (cityIdentity: string) => string;
}

export function LocationDialog({
    open,
    onOpenChange,
    isMobile = false,
    pinInput,
    pinError,
    handlePinChange,
    handlePinVerify,
    citiesLoading,
    cities,
    selectedCity,
    handleCitySelect,
    getCityImage,
}: LocationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className={`w-[1153px] p-0 overflow-hidden rounded-[10px] h-[450px] ${isMobile ? 'lg:max-w-[1153px] max-w-[95vw]' : 'sm:max-w-[1153px] max-w-[95vw]'}`}>
                <div className={`grid grid-cols-1 h-full ${isMobile ? 'lg:grid-cols-2' : 'md:grid-cols-2'}`}>
                    <div className={`items-center justify-center ${isMobile ? 'hidden lg:flex' : 'flex'}`}>
                        <img src="/dialogimg.png" alt="Location Illustration" className="max-w-full h-auto object-contain" />
                    </div>

                    <div className={`pr-8 flex flex-col justify-center text-center ${isMobile ? 'lg:text-left p-6 lg:p-0' : 'md:text-left'}`}>
                        <DialogHeader>
                            <DialogTitle className={`text-[#ED1F28] text-2xl font-bold text-center ${isMobile ? 'lg:text-left' : 'md:text-left'} mb-[20px]`}>
                                Choose your location
                            </DialogTitle>
                            <DialogDescription className='hidden'>Select your delivery location</DialogDescription>
                        </DialogHeader>

                        <div className='space-y-6'>
                            <div>
                                <h3 className='font-bold text-gray-800 text-lg mb-2'>Enter PIN code</h3>
                                <div className='flex gap-2 relative'>
                                    <Input
                                        type='text'
                                        placeholder='******'
                                        className={`flex-1 ${pinError ? 'border-red-500' : ''}`}
                                        value={pinInput}
                                        onChange={handlePinChange}
                                    />
                                    <Button
                                        className='bg-[#ED1F28] hover:bg-[#F87171] font-bold text-lg text-white px-6 disabled:opacity-50'
                                        disabled={pinInput.length !== 6}
                                        onClick={() => handlePinVerify(isMobile)}
                                    >
                                        Proceed
                                    </Button>
                                </div>
                                {pinError ? (
                                    <p className={`text-red-500 pt-[10px] text-xs font-medium ${isMobile ? 'text-left' : ''}`}>{pinError}</p>
                                ) : (
                                    <div className={`${isMobile ? 'text-left pt-[10px]' : ''}`}>
                                        <label className={`text-red-500 text-xs underline cursor-pointer ${!isMobile ? 'pt-[10px]' : ''}`}>Detect my location</label>
                                    </div>
                                )}
                            </div>

                            <hr />

                            <div>
                                <h3 className='font-bold text-gray-800 mb-4 text-lg'>Pick your City</h3>
                                <div className={`flex ${isMobile ? 'gap-4 overflow-x-auto pb-4' : 'gap-8'}`}>
                                    {citiesLoading ? (
                                        <div className="text-gray-500 text-sm">Loading cities...</div>
                                    ) : (
                                        cities.map((city) => (
                                            <div key={city.id} onClick={() => handleCitySelect(city.identity, city.pincode_detail.toString(), isMobile)} className={`flex flex-col items-center gap-2 cursor-pointer group ${isMobile ? 'min-w-[70px]' : ''}`}>
                                                <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-full border overflow-hidden ${selectedCity === city.identity ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                                                    <img src={getCityImage(city.identity)} className='w-full h-full object-cover' alt={city.identity} onError={(e) => { e.currentTarget.src = '/location.svg'; }} />
                                                </div>
                                                <span className={'text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'}>{city.identity}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
