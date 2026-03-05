'use client'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Menu, Search, Pencil, LogOutIcon } from 'lucide-react'
import { FaUser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

interface City {
  id: number;
  identity: string;
  pincode_detail: number;
}



const Navbar = () => {
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

  useEffect(() => {
    if (window.innerWidth < 1280) {
      setMobileDialogOpen(true);
    } else {
      setDialogOpen(true);
    }
  }, []);

  const [loginOpenDesktop, setLoginOpenDesktop] = useState(false);
  const [loginStepDesktop, setLoginStepDesktop] = useState<'phone' | 'otp' | 'name'>('phone');

  const [loginOpenMobile, setLoginOpenMobile] = useState(false);
  const [loginStepMobile, setLoginStepMobile] = useState<'phone' | 'otp' | 'name'>('phone');

  const { data: citiesResponse, isLoading: citiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const res = await fetch('https://staging-v2-api.payrentz.com/web/home/city/');
      if (!res.ok) throw new Error('Failed to fetch cities');
      return res.json();
    }
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
          pincode: pincode
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
    }
  });

  const handleProceed = async (isMobile: boolean) => {
    if (pinInput.length === 6) {
      if (cities.length > 0) {
        const cityObj = cities.find((city) => city.pincode_detail.toString() === pinInput);
        if (cityObj) {
          try {
            await createGuestMutation(pinInput);
          } catch (e) {
            console.error('Guest creation failed', e);
          }
          setSelectedCity(cityObj.identity);
          setSelectedPin(cityObj.pincode_detail.toString());
          setPinInput('');
          router.push(`/${cityObj.identity.toLowerCase()}/`);
          if (isMobile) setMobileDialogOpen(false);
          else setDialogOpen(false);
        } else {
          setPinError('Currently not serviced');
        }
      } else {
        setPinError('Currently not serviced');
      }
    }
  };

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
          phone_number: `${code}${phoneNumber}`
        })
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
    }
  });

  const { mutateAsync: sendOTP, isPending: isSendingOTP } = useMutation({
    mutationFn: async (uuid: string) => {
      const sendResponse = await fetch(`https://staging-v2-api.payrentz.com/access/customer/send-otp/${uuid}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!sendResponse.ok) {
        throw new Error('Failed to send OTP');
      }

      const sendData = await sendResponse.json();
      console.log('Send OTP Response:', sendData); // Requested log
      return sendData;
    }
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
      phone_number: string
      otp: string
      guest_uuid: string
    }) => {
      const validateResponse = await fetch('https://staging-v2-api.payrentz.com/access/customer/validate-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: `${countryCode}${phone_number}`,
          otp: otp,
          guest_uuid: guest_uuid
        })
      });

      if (!validateResponse.ok) {
        throw new Error('Failed to validate OTP');
      }

      const data = await validateResponse.json();
      if (data.status !== 'success') {
        throw new Error(data?.data?.detail || 'Invalid OTP');
      }

      return data;
    }
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
        // Existing User Flow
        Cookies.set('token', token, { expires: 365, path: '/' });
        queryClient.invalidateQueries({ queryKey: ['refresh'] });

        setLoginOpenDesktop(false);
        setLoginStepDesktop('phone');
        setOtpInput('');
      } else {
        // New User Flow
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number,
          guest_uuid,
          first_name,
          email,
          referral_code
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save customer details');
      }

      const data = await response.json();
      if (data.status !== 'success') {
        throw new Error(data?.data?.detail || 'Failed to save details');
      }

      return data;
    }
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
        referral_code: ''
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
        referral_code: ''
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
          'Authorization': `Token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to refresh customer Details')
      }
      return response.json();
    }
  })

  const { mutateAsync: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: async () => {
      const token = Cookies.get('token')
      if (token) {
        const response = await fetch('https://staging-v2-api.payrentz.com/access/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to logout')
        }
      }
    }, onSuccess() {
      Cookies.remove('token')
      Cookies.remove('guest_uuid')
      queryClient.setQueryData(['refresh'], null)
    },
  })

  const handleLogout = async () => {
    try {
      await logout()
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className='w-full mx-auto'>
      <div className="hidden xl:block">
        <div className='flex justify-between py-[13px] h-[59px] pr-[60px] '>
          <div className='flex items-center pl-[60px]'>
            <Link href='/'>
              <img className="max-w-[132px] " src="/payrentz-logo.5c7f17d4.svg" alt="logo" />
            </Link>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger className='flex flex-row ml-[20px] items-center' >
                <img src='/location.8b71f906.svg' className='w-6 h-6' />
                <div className='text-xs font-semibold text-[13px] pl-2 text-left'>
                  <p className='text-gray-800'>{selectedCity}</p>
                  <p className='text-gray-400'>{selectedPin}</p>
                </div>
              </DialogTrigger>
              <DialogContent className='w-[1153px] sm:max-w-[1153px] max-w-[95vw] h-[450px] p-0 overflow-hidden rounded-[10px]'>
                <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                  <div className='flex items-center justify-center'>
                    <img src="/dialogimg.png" alt="Location Illustration" className="max-w-full h-auto object-contain" />
                  </div>

                  <div className='pr-8 flex flex-col justify-center text-center md:text-left'>
                    <DialogHeader>
                      <DialogTitle className='text-[#ED1F28] text-2xl font-bold  text-center md:text-left mb-[20px]'>Choose your location</DialogTitle>
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
                            onClick={() => handleProceed(false)}
                          >
                            Proceed
                          </Button>
                        </div>
                        {pinError ? (
                          <p className='text-red-500 pt-[10px] text-xs font-medium'>{pinError}</p>
                        ) : (
                          <label className='text-red-500 pt-[10px] text-xs underline cursor-pointer'>Detect my location</label>
                        )}
                      </div>

                      <hr />

                      <div>
                        <h3 className='font-bold text-gray-800 mb-4 text-lg'>Pick your City</h3>
                        <div className='flex gap-8'>
                          {citiesLoading ? (
                            <div className="text-gray-500 text-sm">Loading cities...</div>
                          ) : (
                            cities.map((city) => (
                              <div key={city.id} onClick={() => handleCitySelect(city.identity, city.pincode_detail.toString(), false)} className='flex flex-col items-center gap-2 cursor-pointer group'>
                                <div className={`w-20 h-20 rounded-full border overflow-hidden ${selectedCity === city.identity ? ' border-2 shadow-sm' : 'border-gray-300'}`}>
                                  <img src={getCityImage(city.identity)} className='w-full h-full object-cover' alt={city.identity} onError={(e) => { e.currentTarget.src = '/location.svg'; }} />
                                </div>
                                <span className={`text-xs font-medium ${selectedCity === city.identity ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>{city.identity}</span>
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
            <div className="hidden xl:flex items-center">
              <a href='/appliances' className='flex items-center font-semibold pl-[30px] h-[16px] '><img src='/washingmachine.png' className='w-[17px] h-[17px]  mr-[5px]' /><p>Appliances</p></a>
              <a href='' className='flex items-center font-semibold pl-[30px] h-[16px] '><img src='/sofa.png' className='w-[17px] h-[17px]  mr-[5px]' /><p>Furniture</p></a>
              <a href='' className='flex items-center font-semibold pl-[30px] h-[16px] '><img src='/home-appliances.png' className='w-[17px] h-[17px]  mr-[5px]' /><p>Packages</p></a>
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
            <div className='flex'>
              <img src="/cart.5fa6c9b1.svg" alt='' />
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
              <Dialog open={loginOpenDesktop} onOpenChange={(open) => {
                setLoginOpenDesktop(open);
                if (!open) setLoginStepDesktop('phone');
              }}>
                <DialogTrigger asChild>
                  <Button variant='destructive'>Login</Button>
                </DialogTrigger>
                <DialogContent className="flex justify-center items-center w-full max-w-[790px] sm:max-w-[790px] h-[462px] rounded-[20px] p-0 overflow-hidden">
                  <img src="/loginimg.png" className='w-[295px] h-[295px]' alt="logoimg" />
                  <div className="w-[495px] px-8">
                    {loginStepDesktop === 'phone' ? (
                      <>
                        <DialogHeader>
                          <DialogTitle className='text-2xl font-bold text-red-600'>Let's get you started!</DialogTitle>
                          <DialogDescription className="hidden">
                            Login to your account to get started.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='mt-[30px] w-full max-w-[350px]'>
                          <p className='text-[18px] font-semibold text-[#3a3a3a] mb-[15px]'>Enter your mobile number</p>
                          <div className='flex items-center h-[50px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                            <NativeSelect value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className='border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent text-base text-gray-500 font-medium h-[48px] rounded-none pl-[15px]'>
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
                              className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-base text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                              maxLength={10}
                              value={mobileInput}
                              onChange={handleMobileChange}
                            />
                          </div>
                          {mobileError && <p className='text-red-500 text-xs mt-2'>{mobileError}</p>}
                          <Button variant="destructive" className='mt-[30px] w-full max-w-[160px] h-[50px] text-lg font-bold rounded-[8px]' disabled={isGeneratingOTP || isSendingOTP || mobileInput.length !== 10} onClick={handleLoginDesktop}>
                            {(isGeneratingOTP || isSendingOTP) ? 'Sending...' : 'Send OTP'}
                          </Button>
                        </div>
                      </>
                    ) : loginStepDesktop === 'otp' ? (
                      <>
                        <DialogHeader>
                          <DialogTitle className='text-2xl font-bold text-[#ED1F28]'>Verify with OTP</DialogTitle>
                          <DialogDescription className="text-gray-500 mt-2 text-sm">
                            We have sent 6 digit OTP on your mobile number for verification.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='mt-[30px] w-full max-w-[380px]'>
                          <div className="flex justify-between items-center mb-[15px]">
                            <p className='text-[18px] font-semibold text-[#3a3a3a]'>Enter OTP</p>
                            <button onClick={() => setLoginStepDesktop('phone')} className="text-sm text-[#2B5CAB] font-medium flex items-center hover:underline">
                              Sent to +91 {mobileInput || '9876543210'} <Pencil className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className='h-[50px] w-full rounded-[8px] border border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 text-base px-[15px]'
                            maxLength={6}
                            value={otpInput}
                            onChange={(e) => {
                              setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                              setOtpError('');
                            }}
                          />
                          {otpError && <p className='text-red-500 text-xs mt-2'>{otpError}</p>}
                          <p className="text-sm text-gray-500 mt-3">Resend OTP in 00:45</p>
                          <Button variant="destructive" className='mt-[30px] w-full max-w-[160px] h-[50px] text-lg font-bold rounded-[8px]' disabled={isValidatePending || otpInput.length !== 6} onClick={handleValidateDesktop}>
                            {isValidatePending ? 'Validating...' : 'Submit'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <DialogHeader className='mt-[20px]'>
                          <DialogTitle className='text-2xl font-bold text-red-600'>Almost there!</DialogTitle>
                          <DialogDescription className="hidden">
                            Login to your account to get started.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='mt-[30px] w-full max-w-[350px]'>
                          <p className='text-[18px] font-semibold text-[#3a3a3a] mb-[15px]'>Enter your name<span className='text-red-600'>*</span></p>
                          <div className='flex items-center h-[50px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                            <Input
                              type="text"
                              placeholder="John Doe"
                              required
                              value={nameInput}
                              onChange={(e) => {
                                setNameInput(e.target.value);
                                setDetailsError('');
                              }}
                              className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-base text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                            />
                          </div>
                          <p className='text-[18px] font-semibold text-[#3a3a3a] mb-[15px] mt-[20px]'>Enter your email<span className='text-red-600'>*</span></p>
                          <div className='flex items-center h-[50px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                            <Input
                              type="email"
                              required
                              placeholder="hello@johndoe.com"
                              value={emailInput}
                              onChange={(e) => {
                                setEmailInput(e.target.value);
                                setDetailsError('');
                              }}
                              className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-base text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                            />
                          </div>
                          {detailsError && <p className='text-red-500 text-xs mt-2'>{detailsError}</p>}
                          <Button variant="destructive" className='mt-[30px] w-full max-w-[160px] h-[50px] text-lg font-bold rounded-[8px]' disabled={isCustomerDetails} onClick={handleCustomerDetailsDesktop}>
                            {isCustomerDetails ? 'Saving...' : 'Continue'}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

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
                  <SheetTitle className="text-left"><img className="max-w-[200px]" src="/payrentz-logo.5c7f17d4.svg" alt="logo" /></SheetTitle>
                  <SheetDescription className="hidden">
                    Navigation Menu
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-6 ml-[20px]">
                  <div className="border-b pb-4 ">
                    <p className="font-semibold text-sm text-gray-500 mb-2">Delivery Location</p>
                    <Dialog open={mobileDialogOpen} onOpenChange={setMobileDialogOpen}>
                      <DialogTrigger className='flex flex-row items-center w-full' >
                        <img src='/location.8b71f906.svg' className="w-5 h-5" />
                        <div className='text-left pl-2'>
                          <p className='text-sm font-semibold text-gray-800'>{selectedCity}</p>
                          <p className='text-xs text-gray-500'>{selectedPin}</p>
                        </div>
                      </DialogTrigger>
                      <DialogContent className='w-[1153px] lg:max-w-[1153px] max-w-[95vw] h-[450px] p-0 overflow-hidden rounded-[10px]'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 h-full'>
                          <div className='flex items-center justify-center hidden lg:flex'>
                            <img src="/dialogimg.png" alt="Location Illustration" className="max-w-full h-auto object-contain" />
                          </div>

                          <div className='pr-8 flex flex-col justify-center text-center lg:text-left p-6 lg:p-0'>
                            <DialogHeader>
                              <DialogTitle className='text-[#ED1F28] text-2xl font-bold  text-center lg:text-left mb-[20px]'>Choose your location</DialogTitle>
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
                                    onClick={() => handleProceed(true)}
                                  >
                                    Proceed
                                  </Button>
                                </div>
                                {pinError ? (
                                  <p className='text-red-500 pt-[10px] text-xs font-medium text-left'>{pinError}</p>
                                ) : (
                                  <div className='text-left pt-[10px]'>
                                    <label className='text-red-500 text-xs underline cursor-pointer'>Detect my location</label>
                                  </div>
                                )}
                              </div>

                              <hr />

                              <div>
                                <h3 className='font-bold text-gray-800 mb-4 text-lg'>Pick your City</h3>
                                <div className='flex gap-4 overflow-x-auto pb-4'>
                                  {citiesLoading ? (
                                    <div className="text-gray-500 text-sm">Loading cities...</div>
                                  ) : (
                                    cities.map((city) => (
                                      <div key={city.id} onClick={() => handleCitySelect(city.identity, city.pincode_detail.toString(), true)} className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                        <div className={`w-16 h-16 rounded-full border overflow-hidden ${selectedCity === city.identity ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                                          <img src={getCityImage(city.identity)} className='w-full h-full object-cover' alt={city.identity} onError={(e) => { e.currentTarget.src = '/location.svg'; }} />
                                        </div>
                                        <span className={`text-xs font-medium ${selectedCity === city.identity ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>{city.identity}</span>
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
                  </div>

                  <div className="flex flex-col gap-4">
                    <a href='/appliances' className='flex items-center font-semibold h-[16px] gap-2'>
                      <img src='/washingmachine.png' className='w-[20px] h-[20px]' />
                      <p className="text-lg">Appliances</p>
                    </a>
                    <a href='' className='flex items-center font-semibold h-[16px] gap-2 mt-2'>
                      <img src='/sofa.png' className='w-[20px] h-[20px]' />
                      <p className="text-lg">Furniture</p>
                    </a>
                    <a href='' className='flex items-center font-semibold h-[16px] gap-2 mt-2'>
                      <img src='/home-appliances.png' className='w-[20px] h-[20px]' />
                      <p className="text-lg">Packages</p>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <img className="max-w-[100px]" src="/payrentz-logo.5c7f17d4.svg" alt="logo" />
          </div>
          <div className="flex items-center gap-4">
            {refreshData?.data?.first_name ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='destructive' className='px-[15px] py-[6px] rounded-[20px]'><FaUser />{refreshData.data.first_name}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem variant="destructive">
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog open={loginOpenMobile} onOpenChange={(open) => {
                setLoginOpenMobile(open);
                if (!open) setLoginStepMobile('phone');
              }}>
                <DialogTrigger asChild>
                  <Button variant='destructive'>Login</Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col justify-center  pt-[40px] items-center w-full max-w-[390px] sm:max-w-[490px] h-[482px] rounded-[20px] p-0 overflow-hidden">
                  <img src="/loginimg.png" className='w-[140px] h-[140px] mb-2' alt="loginimg" />
                  <div className="w-full px-6">
                    {loginStepMobile === 'phone' ? (
                      <>
                        <div className="pl-[20px] lg:pl-0">
                          <DialogHeader className="text-left sm:text-left">
                            <DialogTitle className='text-xl flex justify-center sm:justify-start font-bold text-red-600'>Let's get you started!</DialogTitle>
                            <DialogDescription className="hidden">
                              Login to your account to get started.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='mt-[15px] w-full max-w-[350px] mx-auto sm:mx-0'>
                            <p className='text-sm font-semibold text-[#3a3a3a] mb-[10px] text-center sm:text-left'>Enter your mobile number</p>
                            <div className='flex items-center h-[40px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                              <NativeSelect value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className='border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent text-sm text-gray-500 font-medium h-[38px] rounded-none pl-[10px]'>
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
                                className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-sm text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                                maxLength={10}
                                value={mobileInput}
                                onChange={handleMobileChange}
                              />
                            </div>
                            {mobileError && <p className='text-red-500 text-xs mt-2 text-center sm:text-left'>{mobileError}</p>}
                            <Button variant="destructive" className='mt-[20px] w-full max-w-[140px] h-[40px] text-base font-bold rounded-[8px] mx-auto sm:mx-0 block' disabled={isGeneratingOTP || isSendingOTP || mobileInput.length !== 10} onClick={handleLoginMobile}>
                              {(isGeneratingOTP || isSendingOTP) ? 'Sending...' : 'Send OTP'}
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : loginStepMobile === 'otp' ? (
                      <>
                        <DialogHeader className="text-center sm:text-left">
                          <DialogTitle className='text-xl flex justify-center sm:justify-start font-bold text-[#ED1F28]'>Verify with OTP</DialogTitle>
                          <DialogDescription className="text-gray-500 mt-2 text-sm text-center sm:text-left">
                            We have sent 6 digit OTP on your mobile number for verification.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='mt-[20px] w-full max-w-[350px] mx-auto sm:mx-0'>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-[10px] gap-1 sm:gap-0">
                            <p className='text-base font-semibold text-[#3a3a3a] text-center sm:text-left'>Enter OTP</p>
                            <button onClick={() => setLoginStepMobile('phone')} className="text-xs text-[#2B5CAB] font-medium flex items-center justify-center sm:justify-start hover:underline">
                              Sent to +91 {mobileInput || '9876543210'} <Pencil className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className='h-[40px] w-full rounded-[8px] border border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 text-sm px-[15px]'
                            maxLength={6}
                            value={otpInput}
                            onChange={(e) => {
                              setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                              setOtpError('');
                            }}
                          />
                          {otpError && <p className='text-red-500 text-xs mt-2 text-center sm:text-left'>{otpError}</p>}
                          <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">Resend OTP in 00:45</p>
                          <Button variant="destructive" className='mt-[20px] w-full max-w-[140px] h-[40px] text-base font-bold rounded-[8px] mx-auto sm:mx-0 block' disabled={isValidatePending || otpInput.length !== 6} onClick={handleValidateMobile}>
                            {isValidatePending ? 'Validating...' : 'Submit'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <DialogHeader className='mt-[10px]'>
                          <DialogTitle className='text-xl font-bold text-red-600'>Almost there!</DialogTitle>
                          <DialogDescription className="hidden">
                            Login to your account to get started.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='mt-[20px] w-full max-w-[350px]'>
                          <p className='text-sm font-semibold text-[#3a3a3a] mb-[10px]'>Enter your name<span className='text-red-600'>*</span></p>
                          <div className='flex items-center h-[40px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                            <Input
                              type="text"
                              placeholder="John Doe"
                              required
                              value={nameInput}
                              onChange={(e) => {
                                setNameInput(e.target.value);
                                setDetailsError('');
                              }}
                              className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-sm text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                            />
                          </div>
                          <p className='text-sm font-semibold text-[#3a3a3a] mb-[10px] mt-[20px]'>Enter your email<span className='text-red-600'>*</span></p>
                          <div className='flex items-center h-[40px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                            <Input
                              type="email"
                              required
                              placeholder="hello@johndoe.com"
                              value={emailInput}
                              onChange={(e) => {
                                setEmailInput(e.target.value);
                                setDetailsError('');
                              }}
                              className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-sm text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                            />
                          </div>
                          {detailsError && <p className='text-red-500 text-xs mt-2'>{detailsError}</p>}
                          <Button variant="destructive" className='mt-[15px] w-full max-w-[120px] h-[40px] text-base font-bold rounded-[8px]' disabled={isCustomerDetails} onClick={handleCustomerDetailsMobile}>
                            {isCustomerDetails ? 'Saving...' : 'Continue'}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
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
      <div className=" bg-[#2B5CAB] text-white">
        <div className="flex gap-6 overflow-x-auto px-4 py-3 whitespace-nowrap scrollbar-hide justify-start sm:justify-center">
          <a href='/' className='text-xs xl:text-sm font-bold'>Refrigerator</a>
          <a href='/' className='text-xs xl:text-sm font-bold'>Washing Machine</a>
          <a href='/' className='text-xs xl:text-sm font-bold'>Mattresses</a>
          <a href='/' className='text-xs xl:text-sm font-bold'>Cot</a>
          <a href='/' className='text-xs xl:text-sm font-bold'>Air Conditioners</a>
          <a href='/' className='text-xs xl:text-sm font-bold'>Sofas</a>
          <a href='/' className='text-xs xl:text-sm font-bold'>Televisions</a>
          <a href='/' className='text-xs xl:text-sm font-bold'>Laptops</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar