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
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { Pencil } from 'lucide-react';

interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isMobile?: boolean; // Default to false
    loginStep: 'phone' | 'otp' | 'name';
    setLoginStep: (step: 'phone' | 'otp' | 'name') => void;
    countryCode: string;
    setCountryCode: (code: string) => void;
    mobileInput: string;
    handleMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    mobileError: string;
    isGeneratingOTP: boolean;
    isSendingOTP: boolean;
    handleLogin: () => void;
    otpInput: string;
    setOtpInput: (otp: string) => void;
    setOtpError: (err: string) => void;
    otpError: string;
    isValidatePending: boolean;
    handleValidate: () => void;
    nameInput: string;
    setNameInput: (val: string) => void;
    emailInput: string;
    setEmailInput: (val: string) => void;
    detailsError: string;
    isCustomerDetails: boolean;
    handleCustomerDetails: () => void;
    setDetailsError: (err: string) => void;
}

export function LoginDialog({
    open,
    onOpenChange,
    isMobile = false,
    loginStep,
    setLoginStep,
    countryCode,
    setCountryCode,
    mobileInput,
    handleMobileChange,
    mobileError,
    isGeneratingOTP,
    isSendingOTP,
    handleLogin,
    otpInput,
    setOtpInput,
    setOtpError,
    otpError,
    isValidatePending,
    handleValidate,
    nameInput,
    setNameInput,
    emailInput,
    setEmailInput,
    detailsError,
    isCustomerDetails,
    handleCustomerDetails,
    setDetailsError,
}: LoginDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={isMobile
                ? "flex flex-col justify-center pt-[40px] items-center w-full max-w-[390px] sm:max-w-[490px] h-[482px] rounded-[20px] p-0 overflow-hidden"
                : "flex justify-center items-center w-full max-w-[790px] sm:max-w-[790px] h-[462px] rounded-[20px] p-0 overflow-hidden"}>

                <img src="/loginimg.png" className={isMobile ? 'w-[140px] h-[140px] mb-2' : 'w-[295px] h-[295px]'} alt="loginimg" />

                <div className={isMobile ? "w-full px-6" : "w-[495px] px-8"}>
                    {loginStep === 'phone' ? (
                        <div className={isMobile ? "pl-[20px] lg:pl-0" : ""}>
                            <DialogHeader className={isMobile ? "text-left sm:text-left" : ""}>
                                <DialogTitle className={`text-${isMobile ? 'xl' : '2xl'} ${isMobile ? 'flex justify-center sm:justify-start' : ''} font-bold text-red-600`}>
                                    Let's get you started!
                                </DialogTitle>
                                <DialogDescription className="hidden">
                                    Login to your account to get started.
                                </DialogDescription>
                            </DialogHeader>
                            <div className={`mt-[${isMobile ? '15px' : '30px'}] w-full max-w-[350px] ${isMobile ? 'mx-auto sm:mx-0' : ''}`}>
                                <p className={`text-${isMobile ? 'sm' : '[18px]'} font-semibold text-[#3a3a3a] mb-[${isMobile ? '10px' : '15px'}] ${isMobile ? 'text-center sm:text-left' : ''}`}>
                                    Enter your mobile number
                                </p>
                                <div className={`flex items-center h-[${isMobile ? '40px' : '50px'}] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors`}>
                                    <NativeSelect value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className={`border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent text-${isMobile ? 'sm' : 'base'} text-gray-500 font-medium h-[${isMobile ? '38px' : '48px'}] rounded-none pl-[${isMobile ? '10px' : '15px'}]`}>
                                        <NativeSelectOption value="+91">+91</NativeSelectOption>
                                        <NativeSelectOption value="+92">+92</NativeSelectOption>
                                        <NativeSelectOption value="+93">+93</NativeSelectOption>
                                        <NativeSelectOption value="+94">+94</NativeSelectOption>
                                        <NativeSelectOption value="+95">+95</NativeSelectOption>
                                    </NativeSelect>
                                    <div className='h-[28px] w-[1px] bg-gray-300 shrink-0'></div>
                                    <Input
                                        type="text"
                                        placeholder="9876543210"
                                        className={`flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-${isMobile ? 'sm' : 'base'} text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none`}
                                        maxLength={10}
                                        value={mobileInput}
                                        onChange={handleMobileChange}
                                    />
                                </div>
                                {mobileError && <p className={`text-red-500 text-xs mt-2 ${isMobile ? 'text-center sm:text-left' : ''}`}>{mobileError}</p>}
                                <Button variant="destructive" className={`mt-[${isMobile ? '20px' : '30px'}] w-full max-w-[${isMobile ? '140px' : '160px'}] h-[${isMobile ? '40px' : '50px'}] text-${isMobile ? 'base' : 'lg'} font-bold rounded-[8px] ${isMobile ? 'mx-auto sm:mx-0 block' : ''}`} disabled={isGeneratingOTP || isSendingOTP || mobileInput.length !== 10} onClick={handleLogin}>
                                    {(isGeneratingOTP || isSendingOTP) ? 'Sending...' : 'Send OTP'}
                                </Button>
                            </div>
                        </div>
                    ) : loginStep === 'otp' ? (
                        <>
                            <DialogHeader className={isMobile ? "text-center sm:text-left" : ""}>
                                <DialogTitle className={`text-${isMobile ? 'xl flex justify-center sm:justify-start' : '2xl'} font-bold text-[#ED1F28]`}>
                                    Verify with OTP
                                </DialogTitle>
                                <DialogDescription className={`text-gray-500 mt-2 text-sm ${isMobile ? 'text-center sm:text-left' : ''}`}>
                                    We have sent 6 digit OTP on your mobile number for verification.
                                </DialogDescription>
                            </DialogHeader>
                            <div className={`mt-[${isMobile ? '20px' : '30px'}] w-full max-w-[${isMobile ? '350px' : '380px'}] ${isMobile ? 'mx-auto sm:mx-0' : ''}`}>
                                <div className={`flex ${isMobile ? 'flex-col sm:flex-row' : 'justify-between'} justify-between items-center mb-[${isMobile ? '10px' : '15px'}] ${isMobile ? 'gap-1 sm:gap-0' : ''}`}>
                                    <p className={`text-${isMobile ? 'base' : '[18px]'} font-semibold text-[#3a3a3a] ${isMobile ? 'text-center sm:text-left' : ''}`}>
                                        Enter OTP
                                    </p>
                                    <button onClick={() => setLoginStep('phone')} className={`text-${isMobile ? 'xs' : 'sm'} text-[#2B5CAB] font-medium flex items-center ${isMobile ? 'justify-center sm:justify-start' : ''} hover:underline`}>
                                        Sent to +91 {mobileInput || '9876543210'} <Pencil className="w-3 h-3 ml-1" />
                                    </button>
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    className={`h-[${isMobile ? '40px' : '50px'}] w-full rounded-[8px] border border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 text-${isMobile ? 'sm' : 'base'} px-[15px]`}
                                    maxLength={6}
                                    value={otpInput}
                                    onChange={(e) => {
                                        setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                                        setOtpError('');
                                    }}
                                />
                                {otpError && <p className={`text-red-500 text-xs mt-2 ${isMobile ? 'text-center sm:text-left' : ''}`}>{otpError}</p>}
                                <p className={`text-${isMobile ? 'xs' : 'sm'} text-gray-500 mt-${isMobile ? '2' : '3'} ${isMobile ? 'text-center sm:text-left' : ''}`}>Resend OTP in 00:45</p>
                                <Button variant="destructive" className={`mt-[${isMobile ? '20px' : '30px'}] w-full max-w-[${isMobile ? '140px' : '160px'}] h-[${isMobile ? '40px' : '50px'}] text-${isMobile ? 'base' : 'lg'} font-bold rounded-[8px] ${isMobile ? 'mx-auto sm:mx-0 block' : ''}`} disabled={isValidatePending || otpInput.length !== 6} onClick={handleValidate}>
                                    {isValidatePending ? 'Validating...' : 'Submit'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <DialogHeader className={`mt-[${isMobile ? '10px' : '20px'}]`}>
                                <DialogTitle className={`text-${isMobile ? 'xl' : '2xl'} font-bold text-red-600`}>Almost there!</DialogTitle>
                                <DialogDescription className="hidden">
                                    Login to your account to get started.
                                </DialogDescription>
                            </DialogHeader>
                            <div className={`mt-[${isMobile ? '20px' : '30px'}] w-full max-w-[350px]`}>
                                <p className={`text-${isMobile ? 'sm' : '[18px]'} font-semibold text-[#3a3a3a] mb-[${isMobile ? '10px' : '15px'}]`}>
                                    Enter your name<span className='text-red-600'>*</span>
                                </p>
                                <div className={`flex items-center h-[${isMobile ? '40px' : '50px'}] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors`}>
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        value={nameInput}
                                        onChange={(e) => {
                                            setNameInput(e.target.value);
                                            setDetailsError('');
                                        }}
                                        className={`flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-${isMobile ? 'sm' : 'base'} text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none`}
                                    />
                                </div>
                                <p className={`text-${isMobile ? 'sm' : '[18px]'} font-semibold text-[#3a3a3a] mb-[${isMobile ? '10px' : '15px'}] mt-[20px]`}>
                                    Enter your email<span className='text-red-600'>*</span>
                                </p>
                                <div className={`flex items-center h-[${isMobile ? '40px' : '50px'}] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors`}>
                                    <Input
                                        type="email"
                                        required
                                        placeholder="hello@johndoe.com"
                                        value={emailInput}
                                        onChange={(e) => {
                                            setEmailInput(e.target.value);
                                            setDetailsError('');
                                        }}
                                        className={`flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-${isMobile ? 'sm' : 'base'} text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none`}
                                    />
                                </div>
                                {detailsError && <p className='text-red-500 text-xs mt-2'>{detailsError}</p>}
                                <Button variant="destructive" className={`mt-[${isMobile ? '15px' : '30px'}] w-full max-w-[${isMobile ? '120px' : '160px'}] h-[${isMobile ? '40px' : '50px'}] text-${isMobile ? 'base' : 'lg'} font-bold rounded-[8px]`} disabled={isCustomerDetails} onClick={handleCustomerDetails}>
                                    {isCustomerDetails ? 'Saving...' : 'Continue'}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
