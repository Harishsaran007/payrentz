'use client'
import React, { useState } from 'react'
import { Menu, Search, Pencil } from 'lucide-react'
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
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"





const Navbar = () => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [selectedPin, setSelectedPin] = useState('600001');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
  const [mobileInput, setMobileInput] = useState('');
  const [mobileError, setMobileError] = useState('');

  const [loginOpenDesktop, setLoginOpenDesktop] = useState(false);
  const [loginStepDesktop, setLoginStepDesktop] = useState<'phone' | 'otp' | 'name'>('phone');

  const [loginOpenMobile, setLoginOpenMobile] = useState(false);
  const [loginStepMobile, setLoginStepMobile] = useState<'phone' | 'otp' | 'name'>('phone');

  const cityPinMap = {
    'Chennai': '600001',
    'Coimbatore': '641035',
    'Bengaluru': '560017',
    'Hosur': '635109'
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPinInput(value);
    setPinError('');
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileInput(value);
    setMobileError('');
  }

  const handleProceed = (isMobile: boolean) => {
    if (pinInput.length === 6) {
      if (Object.values(cityPinMap).includes(pinInput)) {
        const cityObj = Object.entries(cityPinMap).find(([_, pin]) => pin === pinInput);
        if (cityObj) {
          setSelectedCity(cityObj[0]);
          setSelectedPin(cityObj[1]);
          setPinInput('');
          if (isMobile) setMobileDialogOpen(false);
          else setDialogOpen(false);
        }
      } else {
        setPinError('Currently not serviced');
      }
    }
  };

  const handleCitySelect = (city: string, isMobile: boolean) => {
    setSelectedCity(city);
    setSelectedPin(cityPinMap[city as keyof typeof cityPinMap]);
    if (isMobile) setMobileDialogOpen(false);
    else setDialogOpen(false);
  };

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
                          <div onClick={() => handleCitySelect('Chennai', false)} className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className={`w-20 h-20 rounded-full border overflow-hidden ${selectedCity === 'Chennai' ? ' border-2 shadow-sm' : 'border-gray-300'}`}>
                              <img src='/chennai.svg' className='w-full h-full object-cover' alt="Chennai" />
                            </div>
                            <span className={`text-xs font-medium ${selectedCity === 'Chennai' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Chennai</span>
                          </div>
                          <div onClick={() => handleCitySelect('Coimbatore', false)} className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className={`w-20 h-20 rounded-full border overflow-hidden ${selectedCity === 'Coimbatore' ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                              <img src='/coimbatore.svg' className='w-full h-full object-cover' alt="Coimbatore" />
                            </div>
                            <span className={`text-xs font-medium ${selectedCity === 'Coimbatore' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Coimbatore</span>
                          </div>
                          <div onClick={() => handleCitySelect('Bengaluru', false)} className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className={`w-20 h-20 rounded-full border overflow-hidden ${selectedCity === 'Bengaluru' ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                              <img src='/banglore.svg' className='w-full h-full object-cover' alt="Bengaluru" />
                            </div>
                            <span className={`text-xs font-medium ${selectedCity === 'Bengaluru' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Bengaluru</span>
                          </div>
                          <div onClick={() => handleCitySelect('Hosur', false)} className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className={`w-20 h-20 rounded-full border overflow-hidden ${selectedCity === 'Hosur' ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                              <img src='/hosur.svg' className='w-full h-full object-cover' alt="Hosur" />
                            </div>
                            <span className={`text-xs font-medium ${selectedCity === 'Hosur' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Hosur</span>
                          </div>
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
                          <NativeSelect className='border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent text-base text-gray-500 font-medium h-[48px] rounded-none pl-[15px]'>
                            <NativeSelectOption value="india">+91</NativeSelectOption>
                            <NativeSelectOption value="srilanka">+92</NativeSelectOption>
                            <NativeSelectOption value="malaysia">+93</NativeSelectOption>
                            <NativeSelectOption value="singapore">+94</NativeSelectOption>
                            <NativeSelectOption value="uae">+95</NativeSelectOption>
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
                        <Button variant="destructive" className='mt-[30px] w-full max-w-[160px] h-[50px] text-lg font-bold rounded-[8px]' onClick={() => setLoginStepDesktop('otp')}>Send OTP</Button>
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
                        />
                        <p className="text-sm text-gray-500 mt-3">Resend OTP in 00:45</p>
                        <Button variant="destructive" className='mt-[30px] w-full max-w-[160px] h-[50px] text-lg font-bold rounded-[8px]' onClick={() => { setLoginStepDesktop('name'); }}>Submit</Button>
                      </div>
                    </>
                  ):(
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
                            className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-base text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                          />
                        </div>
                        <p className='text-[18px] font-semibold text-[#3a3a3a] mb-[15px] mt-[20px]'>Enter your email<span className='text-red-600'>*</span></p>
                        <div className='flex items-center h-[50px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                          <Input
                            type="email"
                            required
                            placeholder="hello@johndoe.com"
                            className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-base text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                          />
                        </div>
                        <Button variant="destructive" className='mt-[30px] w-full max-w-[160px] h-[50px] text-lg font-bold rounded-[8px]' onClick={() => {setLoginOpenDesktop(false); setLoginStepDesktop('phone');}}>Continue</Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
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
                      <DialogContent className='w-[1153px] sm:max-w-[1153px] max-w-[95vw] h-[450px] p-0 overflow-hidden rounded-[10px]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                          <div className='flex items-center justify-center hidden md:flex'>
                            <img src="/dialogimg.png" alt="Location Illustration" className="max-w-full h-auto object-contain" />
                          </div>

                          <div className='pr-8 flex flex-col justify-center text-center md:text-left p-6 md:p-0'>
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
                                  <div onClick={() => handleCitySelect('Chennai', true)} className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className={`w-16 h-16 rounded-full border overflow-hidden ${selectedCity === 'Chennai' ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                                      <img src='/chennai.svg' className='w-full h-full object-cover' alt="Chennai" />
                                    </div>
                                    <span className={`text-xs font-medium ${selectedCity === 'Chennai' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Chennai</span>
                                  </div>
                                  <div onClick={() => handleCitySelect('Coimbatore', true)} className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className={`w-16 h-16 rounded-full border overflow-hidden ${selectedCity === 'Coimbatore' ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                                      <img src='/coimbatore.svg' className='w-full h-full object-cover' alt="Coimbatore" />
                                    </div>
                                    <span className={`text-xs font-medium ${selectedCity === 'Coimbatore' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Coimbatore</span>
                                  </div>
                                  <div onClick={() => handleCitySelect('Bengaluru', true)} className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className={`w-16 h-16 rounded-full border overflow-hidden ${selectedCity === 'Bengaluru' ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                                      <img src='/banglore.svg' className='w-full h-full object-cover' alt="Bengaluru" />
                                    </div>
                                    <span className={`text-xs font-medium ${selectedCity === 'Bengaluru' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Bengaluru</span>
                                  </div>
                                  <div onClick={() => handleCitySelect('Hosur', true)} className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className={`w-16 h-16 rounded-full border overflow-hidden ${selectedCity === 'Hosur' ? 'border-2 shadow-sm' : 'border-gray-300'}`}>
                                      <img src='/hosur.svg' className='w-full h-full object-cover' alt="Hosur" />
                                    </div>
                                    <span className={`text-xs font-medium ${selectedCity === 'Hosur' ? 'text-[#FF3F3F]' : 'text-gray-600 group-hover:text-[#FF3F3F]'}`}>Hosur</span>
                                  </div>
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
                          <NativeSelect className='border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent text-sm text-gray-500 font-medium h-[38px] rounded-none pl-[10px]'>
                            <NativeSelectOption value="india">+91</NativeSelectOption>
                            <NativeSelectOption value="srilanka">+92</NativeSelectOption>
                            <NativeSelectOption value="malaysia">+93</NativeSelectOption>
                            <NativeSelectOption value="singapore">+94</NativeSelectOption>
                            <NativeSelectOption value="uae">+95</NativeSelectOption>
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
                        <Button variant="destructive" className='mt-[20px] w-full max-w-[140px] h-[40px] text-base font-bold rounded-[8px] mx-auto sm:mx-0 block' onClick={() => setLoginStepMobile('otp')}>Send OTP</Button>
                      </div>
                      </div>
                    </>
                  ) : loginStepMobile === 'otp' ?(
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
                        />
                        <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">Resend OTP in 00:45</p>
                        <Button variant="destructive" className='mt-[20px] w-full max-w-[140px] h-[40px] text-base font-bold rounded-[8px] mx-auto sm:mx-0 block' onClick={() => { setLoginStepMobile('name'); }}>Submit</Button>
                      </div>
                    </>
                  ) :(
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
                            className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-sm text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                          />
                        </div>
                        <p className='text-sm font-semibold text-[#3a3a3a] mb-[10px] mt-[20px]'>Enter your email<span className='text-red-600'>*</span></p>
                        <div className='flex items-center h-[40px] w-full rounded-[8px] border border-gray-300 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors'>
                          <Input
                            type="email"
                            required
                            placeholder="hello@johndoe.com"
                            className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-sm text-gray-800 placeholder:text-gray-300 px-[15px] h-full rounded-none'
                          />
                        </div>
                        <Button variant="destructive" className='mt-[15px] w-full max-w-[120px] h-[40px] text-base font-bold rounded-[8px]' onClick={() => {setLoginOpenMobile(false);  setLoginStepMobile('phone');}}>Continue</Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
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