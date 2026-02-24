import React from 'react'
import { Menu, Search } from 'lucide-react'
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



const Navbar = () => {
  return (
    <div className='w-full mx-auto'>
      <div className="hidden xl:block">
        <div className='flex justify-between py-[13px] h-[59px] pr-[60px] '>
          <div className='flex items-center pl-[60px]'>
            {/* <div className="block xl:hidden mr-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                    <Menu className="w-6 h-6 text-black" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle className="text-left"><img className="max-w-[200px]" src="payrentz-logo.5c7f17d4.svg" alt="logo" /></SheetTitle>
                    <SheetDescription className="hidden">
                      Navigation Menu
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-6 ml-[20px]">
                    <div className="border-b pb-4 ">
                      <p className="font-semibold text-sm text-gray-500 mb-2">Delivery Location</p>
                      <Dialog>
                        <DialogTrigger className='flex flex-row items-center w-full' >
                          <img src='location.8b71f906.svg' className="w-5 h-5" />
                          <div className='text-left pl-2'>
                            <p className='text-sm font-semibold text-gray-800'>Chennai</p>
                            <p className='text-xs text-gray-500'>600001</p>
                          </div>
                        </DialogTrigger>
                        <DialogContent className='w-[1153px] sm:max-w-[1153px] max-w-[95vw] h-[450px] p-0 overflow-hidden rounded-[10px]'>
                          <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                            <div className='flex items-center justify-center hidden md:flex'>
                              <img src="dialogimg.png" alt="Location Illustration" className="max-w-full h-auto object-contain" />
                            </div>

                            <div className='pr-8 flex flex-col justify-center text-center md:text-left p-6 md:p-0'>
                              <DialogHeader>
                                <DialogTitle className='text-[#ED1F28] text-2xl font-bold  text-center md:text-left mb-[20px]'>Choose your location</DialogTitle>
                                <DialogDescription className='hidden'>Select your delivery location</DialogDescription>
                              </DialogHeader>

                              <div className='space-y-6'>

                                <div>
                                  <h3 className='font-bold text-gray-800 text-lg mb-2'>Enter PIN code</h3>
                                  <div className='flex gap-2'>
                                    <Input type='text' placeholder='******' className='flex-1' />
                                    <Button className='bg-[#ED1F28] hover:bg-[#F87171] font-bold text-lg text-white px-6'>Proceed</Button>
                                  </div>
                                  <label className='text-red-500 pt-[10px] text-xs underline  '>Detect my location</label>
                                </div>

                                <hr />

                                <div>
                                  <h3 className='font-bold text-gray-800 mb-4 text-lg'>Pick your City</h3>
                                  <div className='flex gap-4 overflow-x-auto pb-4'>
                                    <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                      <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                        <img src='chennai.svg' className='w-full h-full object-cover' alt="Chennai" />
                                      </div>
                                      <span className='text-xs font-medium  text-gray-600 group-hover:text-[#FF3F3F]'>Chennai</span>
                                    </div>
                                    <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                      <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                        <img src='coimbatore.svg' className='w-full h-full object-cover' alt="Coimbatore" />
                                      </div>
                                      <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Coimbatore</span>
                                    </div>
                                    <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                      <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                        <img src='banglore.svg' className='w-full h-full object-cover' alt="Bengaluru" />
                                      </div>
                                      <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Bengaluru</span>
                                    </div>
                                    <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                      <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                        <img src='hosur.svg' className='w-full h-full object-cover' alt="Hosur" />
                                      </div>
                                      <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Hosur</span>
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
                        <img src='washingmachine.png' className='w-[20px] h-[20px]' />
                        <p className="text-lg">Appliances</p>
                      </a>
                      <a href='' className='flex items-center font-semibold h-[16px] gap-2 mt-2'>
                        <img src='sofa.png' className='w-[20px] h-[20px]' />
                        <p className="text-lg">Furniture</p>
                      </a>
                      <a href='' className='flex items-center font-semibold h-[16px] gap-2 mt-2'>
                        <img src='home-appliances.png' className='w-[20px] h-[20px]' />
                        <p className="text-lg">Packages</p>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div> */}
            <Link href='/'>
              <img className="max-w-[132px] " src="/payrentz-logo.5c7f17d4.svg" alt="logo" />
            </Link>
            <Dialog>
              <DialogTrigger className='flex flex-row ml-[20px]' ><img src='/location.8b71f906.svg' /><div className='text-xs font-semibold text-[13px] pl-2'><p className='text-gray-800'>Chennai</p><p className='text-gray-400'>600001</p></div></DialogTrigger>
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
                        <div className='flex gap-2'>
                          <Input type='text' placeholder='******' className='flex-1' />
                          <Button className='bg-[#ED1F28] hover:bg-[#F87171] font-bold text-lg text-white px-6'>Proceed</Button>
                        </div>
                        <label className='text-red-500 pt-[10px] text-xs underline  '>Detect my location</label>
                      </div>

                      <hr />

                      <div>
                        <h3 className='font-bold text-gray-800 mb-4 text-lg'>Pick your City</h3>
                        <div className='flex gap-8'>
                          <div className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className='w-20 h-20 rounded-full border border-gray-300 overflow-hidden'>
                              <img src='/chennai.svg' className='w-full h-full object-cover' alt="Chennai" />
                            </div>
                            <span className='text-xs font-medium  text-gray-600 group-hover:text-[#FF3F3F]'>Chennai</span>
                          </div>
                          <div className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className='w-20 h-20 rounded-full border border-gray-300 overflow-hidden'>
                              <img src='/coimbatore.svg' className='w-full h-full object-cover' alt="Coimbatore" />
                            </div>
                            <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Coimbatore</span>
                          </div>
                          <div className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className='w-20 h-20 rounded-full border border-gray-300 overflow-hidden'>
                              <img src='/banglore.svg' className='w-full h-full object-cover' alt="Bengaluru" />
                            </div>
                            <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Bengaluru</span>
                          </div>
                          <div className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className='w-20 h-20 rounded-full border border-gray-300 overflow-hidden'>
                              <img src='/hosur.svg' className='w-full h-full object-cover' alt="Hosur" />
                            </div>
                            <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Hosur</span>
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
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className='flex'>
              <img src="cart.5fa6c9b1.svg" alt='' />
              <p className='pl-[3px] text-sm font-semibold pl-[8px]'>Cart</p>
            </div>
            <Button className='bg-red-500'>Login</Button>
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
                    <Dialog>
                      <DialogTrigger className='flex flex-row items-center w-full' >
                        <img src='/location.8b71f906.svg' className="w-5 h-5" />
                        <div className='text-left pl-2'>
                          <p className='text-sm font-semibold text-gray-800'>Chennai</p>
                          <p className='text-xs text-gray-500'>600001</p>
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
                                <div className='flex gap-2'>
                                  <Input type='text' placeholder='******' className='flex-1' />
                                  <Button className='bg-[#ED1F28] hover:bg-[#F87171] font-bold text-lg text-white px-6'>Proceed</Button>
                                </div>
                                <label className='text-red-500 pt-[10px] text-xs underline  '>Detect my location</label>
                              </div>

                              <hr />

                              <div>
                                <h3 className='font-bold text-gray-800 mb-4 text-lg'>Pick your City</h3>
                                <div className='flex gap-4 overflow-x-auto pb-4'>
                                  <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                      <img src='/chennai.svg' className='w-full h-full object-cover' alt="Chennai" />
                                    </div>
                                    <span className='text-xs font-medium  text-gray-600 group-hover:text-[#FF3F3F]'>Chennai</span>
                                  </div>
                                  <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                      <img src='/coimbatore.svg' className='w-full h-full object-cover' alt="Coimbatore" />
                                    </div>
                                    <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Coimbatore</span>
                                  </div>
                                  <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                      <img src='/banglore.svg' className='w-full h-full object-cover' alt="Bengaluru" />
                                    </div>
                                    <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Bengaluru</span>
                                  </div>
                                  <div className='flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]'>
                                    <div className='w-16 h-16 rounded-full border border-gray-300 overflow-hidden'>
                                      <img src='/hosur.svg' className='w-full h-full object-cover' alt="Hosur" />
                                    </div>
                                    <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Hosur</span>
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
            <Button className="bg-[#ED1F28] hover:bg-[#F87171] text-white font-bold h-8 px-4 rounded">Login</Button>
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