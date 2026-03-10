'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';
import { LocationDialog, City } from './LocationDialog';
import { LoginDialog } from './LoginDialog';
import { METHODS } from 'http';

interface NavbarClientProps { }

export function NavbarClient({ }: NavbarClientProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [pinInput, setPinInput] = useState('');
    const [pinError, setPinError] = useState('');
    const [selectedCity, setSelectedCity] = useState('Chennai');
    const [selectedPin, setSelectedPin] = useState('600001');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
    const [mobileInput, setMobileInput] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [otpInput, setOtpInput] = useState('');
    const [otpError, setOtpError] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [detailsError, setDetailsError] = useState('');

    const [loginOpenDesktop, setLoginOpenDesktop] = useState(false);
    const [loginStepDesktop, setLoginStepDesktop] = useState<'phone' | 'otp' | 'name'>('phone');

    const [loginOpenMobile, setLoginOpenMobile] = useState(false);
    const [loginStepMobile, setLoginStepMobile] = useState<'phone' | 'otp' | 'name'>('phone');

    useEffect(() => {
        if (window.innerWidth < 1280) {
            setMobileDialogOpen(true);
        } else {
            setDialogOpen(true);
        }
    }, []);

    const { data: citiesResponse, isLoading: citiesLoading } = useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await fetch('https://staging-v2-api.payrentz.com/web/home/city/');
            if (!res.ok) throw new Error('Failed to fetch cities');
            return res.json();
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const { data: navigationData, isLoading: navigationLoading } = useQuery({
        queryKey: ['navigation'],
        queryFn: async () => {
            const token = Cookies.get('token');
            const response = await fetch(
                'https://staging-v2-api.payrentz.com/web/navigation/',
                {
                    headers: {
                        ...(token && { Authorization: `Token ${token}` }),
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch navigation data');
            }
            return response.json();
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const cities: City[] = citiesResponse?.data?.results || [];

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setPinInput(value);
        setPinError('');
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setMobileInput(value);
        setMobileError('');
    };

    const getBrowserId = () => {
        let browserId = localStorage.getItem('browser_id');
        if (!browserId) {
            browserId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('browser_id', browserId);
        }
        return browserId;
    };

    const { mutateAsync: createGuestMutation } = useMutation({
        mutationFn: async (pincode: string) => {
            const browserId = getBrowserId();
            const response = await fetch('https://staging-v2-api.payrentz.com/web/guest/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    browser_id: browserId,
                    pincode: pincode,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create guest');
            }
            return response.json();
        },
        onSuccess: (data) => {
            if (data.status === 'success' && data.data?.guest_uuid) {
                Cookies.set('guest_uuid', data.data.guest_uuid, { expires: 365, path: '/' });
            }
        },
        onError: (error) => {
            console.error('Error creating guest:', error);
        },
    });

    const handleCitySelect = async (city: string, pin: string, isMobile: boolean) => {
        try {
            await createGuestMutation(pin);
        } catch (e) {
            console.error('Guest creation failed', e);
        }
        setSelectedCity(city);
        setSelectedPin(pin);
        router.push(`/${city.toLowerCase()}/`);
        if (isMobile) setMobileDialogOpen(false);
        else setDialogOpen(false);
    };

    const getCityImage = (cityIdentity: string) => {
        const lower = cityIdentity.toLowerCase();
        if (lower === 'bengaluru' || lower === 'bangalore') return '/banglore.svg';
        return `/${lower}.svg`;
    };

    const { mutateAsync: generateOTP, isPending: isGeneratingOTP } = useMutation({
        mutationFn: async ({ phoneNumber, code }: { phoneNumber: string; code: string }) => {
            const vashResponse = await fetch('https://staging-v2-api.payrentz.com/access/customer/vash-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: `${code}${phoneNumber}`,
                }),
            });

            if (!vashResponse.ok) {
                throw new Error('Failed to generate OTP reference');
            }

            const vashData = await vashResponse.json();
            const uuid = vashData?.data?.detail;

            if (!uuid || vashData.status !== 'success') {
                throw new Error('Invalid response from OTP generation');
            }
            return uuid;
        },
    });

    const { mutateAsync: sendOTP, isPending: isSendingOTP } = useMutation({
        mutationFn: async (uuid: string) => {
            const sendResponse = await fetch(`https://staging-v2-api.payrentz.com/access/customer/send-otp/${uuid}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!sendResponse.ok) {
                throw new Error('Failed to send OTP');
            }

            const sendData = await sendResponse.json();
            console.log('Send OTP Response:', sendData);
            return sendData;
        },
    });

    const handleLoginDesktop = async () => {
        if (mobileInput.length !== 10) {
            setMobileError('Please enter a valid 10-digit mobile number');
            return;
        }
        try {
            const uuid = await generateOTP({ phoneNumber: mobileInput, code: countryCode });
            await sendOTP(uuid);
            setLoginStepDesktop('otp');
        } catch (error) {
            console.error('OTP flow failed:', error);
            setMobileError('Failed to send OTP. Please try again.');
        }
    };

    const handleLoginMobile = async () => {
        if (mobileInput.length !== 10) {
            setMobileError('Please enter a valid 10-digit mobile number');
            return;
        }
        try {
            const uuid = await generateOTP({ phoneNumber: mobileInput, code: countryCode });
            await sendOTP(uuid);
            setLoginStepMobile('otp');
        } catch (error) {
            console.error('OTP flow failed:', error);
            setMobileError('Failed to send OTP. Please try again.');
        }
    };

    const { mutateAsync: validateOTP, isPending: isValidatePending } = useMutation({
        mutationFn: async ({ phone_number, otp, guest_uuid }: {
            phone_number: string;
            otp: string;
            guest_uuid: string;
        }) => {
            const validateResponse = await fetch('https://staging-v2-api.payrentz.com/access/customer/validate-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: `${countryCode}${phone_number}`,
                    otp: otp,
                    guest_uuid: guest_uuid,
                }),
            });

            if (!validateResponse.ok) {
                throw new Error('Failed to validate OTP');
            }

            const data = await validateResponse.json();
            if (data.status !== 'success') {
                throw new Error(data?.data?.detail || 'Invalid OTP');
            }

            return data;
        },
    });

    const handleValidateDesktop = async () => {
        if (otpInput.length !== 6) {
            setOtpError('Please enter a valid 6-digit OTP');
            return;
        }
        setOtpError('');
        const guestUuid = Cookies.get('guest_uuid');
        if (!guestUuid) {
            setOtpError('Session expired. Please start over.');
            return;
        }
        try {
            const data = await validateOTP({ phone_number: mobileInput, otp: otpInput, guest_uuid: guestUuid });
            const token = data?.data?.token;

            if (token) {
                Cookies.set('token', token, { expires: 365, path: '/' });
                queryClient.invalidateQueries({ queryKey: ['refresh'] });

                setLoginOpenDesktop(false);
                setLoginStepDesktop('phone');
                setOtpInput('');
            } else {
                setLoginStepDesktop('name');
                setOtpInput('');
            }
        } catch (error: any) {
            console.error('OTP validation failed:', error);
            setOtpError(error.message || 'Invalid OTP. Please try again.');
        }
    };

    const handleValidateMobile = async () => {
        if (otpInput.length !== 6) {
            setOtpError('Please enter a valid 6-digit OTP');
            return;
        }
        setOtpError('');
        const guestUuid = Cookies.get('guest_uuid');
        if (!guestUuid) {
            setOtpError('Session expired. Please start over.');
            return;
        }
        try {
            const data = await validateOTP({ phone_number: mobileInput, otp: otpInput, guest_uuid: guestUuid });
            const token = data?.data?.token;

            if (token) {
                Cookies.set('token', token, { expires: 365, path: '/' });
                queryClient.invalidateQueries({ queryKey: ['refresh'] });

                setLoginOpenMobile(false);
                setLoginStepMobile('phone');
                setOtpInput('');
            } else {
                setLoginStepMobile('name');
                setOtpInput('');
            }
        } catch (error: any) {
            console.error('OTP validation failed:', error);
            setOtpError(error.message || 'Invalid OTP. Please try again.');
        }
    };

    const { mutateAsync: customerDetails, isPending: isCustomerDetails } = useMutation({
        mutationFn: async ({ phone_number, guest_uuid, first_name, email, referral_code }: {
            phone_number: string;
            guest_uuid: string;
            first_name: string;
            email: string;
            referral_code: string;
        }) => {
            const response = await fetch('https://staging-v2-api.payrentz.com/access/customer/details/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number,
                    guest_uuid,
                    first_name,
                    email,
                    referral_code,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save customer details');
            }

            const data = await response.json();
            if (data.status !== 'success') {
                throw new Error(data?.data?.detail || 'Failed to save details');
            }

            return data;
        },
    });

    const handleCustomerDetailsDesktop = async () => {
        if (!nameInput.trim()) {
            setDetailsError('Name is required');
            return;
        }
        if (!emailInput.trim()) {
            setDetailsError('Email is required');
            return;
        }
        setDetailsError('');
        const guestUuid = Cookies.get('guest_uuid');
        if (!guestUuid) {
            setDetailsError('Session expired. Please start over.');
            return;
        }
        try {
            const data = await customerDetails({
                phone_number: `${countryCode}${mobileInput}`,
                guest_uuid: guestUuid,
                first_name: nameInput,
                email: emailInput,
                referral_code: '',
            });

            const token = data?.data?.token;
            if (token) {
                Cookies.set('token', token, { expires: 365, path: '/' });
                queryClient.invalidateQueries({ queryKey: ['refresh'] });
            }

            setLoginOpenDesktop(false);
            setLoginStepDesktop('phone');
            setNameInput('');
            setEmailInput('');
            setMobileInput('');
        } catch (error: any) {
            console.error('Customer details failed:', error);
            setDetailsError(error.message || 'Failed to save details. Please try again.');
        }
    };

    const handleCustomerDetailsMobile = async () => {
        if (!nameInput.trim()) {
            setDetailsError('Name is required');
            return;
        }
        if (!emailInput.trim()) {
            setDetailsError('Email is required');
            return;
        }
        setDetailsError('');
        const guestUuid = Cookies.get('guest_uuid');
        if (!guestUuid) {
            setDetailsError('Session expired. Please start over.');
            return;
        }
        try {
            const data = await customerDetails({
                phone_number: `${countryCode}${mobileInput}`,
                guest_uuid: guestUuid,
                first_name: nameInput,
                email: emailInput,
                referral_code: '',
            });

            const token = data?.data?.token;
            if (token) {
                Cookies.set('token', token, { expires: 365, path: '/' });
                queryClient.invalidateQueries({ queryKey: ['refresh'] });
            }

            setLoginOpenMobile(false);
            setLoginStepMobile('phone');
            setNameInput('');
            setEmailInput('');
            setMobileInput('');
        } catch (error: any) {
            console.error('Customer details failed:', error);
            setDetailsError(error.message || 'Failed to save details. Please try again.');
        }
    };

    const { data: refreshData, isPending: isRefreshPending } = useQuery({
        queryKey: ['refresh'],
        queryFn: async () => {
            const token = Cookies.get('token');
            if (!token) return null;
            const response = await fetch('https://staging-v2-api.payrentz.com/access/customer/refresh/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to refresh customer Details');
            }
            return response.json();
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const { mutateAsync: logout, isPending: isLogoutPending } = useMutation({
        mutationFn: async () => {
            const token = Cookies.get('token');
            if (token) {
                const response = await fetch('https://staging-v2-api.payrentz.com/access/logout/', {
                    method: 'POST',
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to logout');
                }
            }
        },
        onSuccess() {
            Cookies.remove('token');
            Cookies.remove('guest_uuid');
            queryClient.setQueryData(['refresh'], null);
        },
    });

    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const { mutateAsync: pinVerify, isPending: isPinVerify } = useMutation({
        mutationFn: async (pin: string) => {
            const response = await fetch('https://staging-v2-api.payrentz.com/web/pincode/verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pincode: pin,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to verify pincode');
            }
            return response.json();
        },
    });

    const handlePinVerify = async (isMobile: boolean = false) => {
        try {
            const data = await pinVerify(pinInput);
            if (data.status === 'success') {
                try {
                    await createGuestMutation(pinInput);
                } catch (e) {
                    console.error('Guest creation failed', e);
                }
                if (isMobile) {
                    setMobileDialogOpen(false);
                } else {
                    setDialogOpen(false);
                }
                setSelectedPin(pinInput);
                setSelectedCity(data.data.city_name);
                router.push(`/${data.data.city_name.toLowerCase()}/`);
                setPinInput('');
            }
        } catch (error) {
            console.error('Pin verify failed:', error);
        }
    };

    return (
        <div className='w-full mx-auto'>
            <DesktopNavbar
                selectedCity={selectedCity}
                selectedPin={selectedPin}
                setDialogOpen={setDialogOpen}
                navigationData={navigationData}
                refreshData={refreshData}
                handleLogout={handleLogout}
                setLoginOpen={setLoginOpenDesktop}
            />

            <MobileNavbar
                selectedCity={selectedCity}
                selectedPin={selectedPin}
                setMobileDialogOpen={setMobileDialogOpen}
                navigationData={navigationData}
                refreshData={refreshData}
                handleLogout={handleLogout}
                setLoginOpen={setLoginOpenMobile}
            />

            <div className="bg-[#2B5CAB] text-white">
                <div className="flex gap-6 overflow-x-auto px-4 py-3 whitespace-nowrap scrollbar-hide justify-start sm:justify-center">
                    {navigationData?.data?.sub_category?.map((sub: any) => (
                        <Link
                            key={sub.id}
                            href={`/${selectedCity.toLowerCase()}/${sub.category_detail?.slug || 'appliances'}/${sub.slug}`}
                            className='text-xs xl:text-sm font-bold'
                        >
                            {sub.identity}
                        </Link>
                    ))}
                </div>
            </div>

            <LocationDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                isMobile={false}
                pinInput={pinInput}
                pinError={pinError}
                handlePinChange={handlePinChange}
                handlePinVerify={handlePinVerify}
                citiesLoading={citiesLoading}
                cities={cities}
                selectedCity={selectedCity}
                handleCitySelect={handleCitySelect}
                getCityImage={getCityImage}
            />

            <LocationDialog
                open={mobileDialogOpen}
                onOpenChange={setMobileDialogOpen}
                isMobile={true}
                pinInput={pinInput}
                pinError={pinError}
                handlePinChange={handlePinChange}
                handlePinVerify={handlePinVerify}
                citiesLoading={citiesLoading}
                cities={cities}
                selectedCity={selectedCity}
                handleCitySelect={handleCitySelect}
                getCityImage={getCityImage}
            />

            <LoginDialog
                open={loginOpenDesktop}
                onOpenChange={(open) => {
                    setLoginOpenDesktop(open);
                    if (!open) setLoginStepDesktop('phone');
                }}
                isMobile={false}
                loginStep={loginStepDesktop}
                setLoginStep={setLoginStepDesktop}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                mobileInput={mobileInput}
                handleMobileChange={handleMobileChange}
                mobileError={mobileError}
                isGeneratingOTP={isGeneratingOTP}
                isSendingOTP={isSendingOTP}
                handleLogin={handleLoginDesktop}
                otpInput={otpInput}
                setOtpInput={setOtpInput}
                setOtpError={setOtpError}
                otpError={otpError}
                isValidatePending={isValidatePending}
                handleValidate={handleValidateDesktop}
                nameInput={nameInput}
                setNameInput={setNameInput}
                emailInput={emailInput}
                setEmailInput={setEmailInput}
                detailsError={detailsError}
                setDetailsError={setDetailsError}
                isCustomerDetails={isCustomerDetails}
                handleCustomerDetails={handleCustomerDetailsDesktop}
            />

            <LoginDialog
                open={loginOpenMobile}
                onOpenChange={(open) => {
                    setLoginOpenMobile(open);
                    if (!open) setLoginStepMobile('phone');
                }}
                isMobile={true}
                loginStep={loginStepMobile}
                setLoginStep={setLoginStepMobile}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                mobileInput={mobileInput}
                handleMobileChange={handleMobileChange}
                mobileError={mobileError}
                isGeneratingOTP={isGeneratingOTP}
                isSendingOTP={isSendingOTP}
                handleLogin={handleLoginMobile}
                otpInput={otpInput}
                setOtpInput={setOtpInput}
                setOtpError={setOtpError}
                otpError={otpError}
                isValidatePending={isValidatePending}
                handleValidate={handleValidateMobile}
                nameInput={nameInput}
                setNameInput={setNameInput}
                emailInput={emailInput}
                setEmailInput={setEmailInput}
                detailsError={detailsError}
                setDetailsError={setDetailsError}
                isCustomerDetails={isCustomerDetails}
                handleCustomerDetails={handleCustomerDetailsMobile}
            />
        </div>
    );
}
