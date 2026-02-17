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



const Navbar = () => {
  return (
    <div className='w-full mx-auto'>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className='flex justify-between py-[13px] h-[59px] pr-[60px] '>
          <div className='flex items-center pl-[60px]'>
            <img className="max-w-[132px] " src="payrentz-logo.5c7f17d4.svg" alt="logo" />
            <Dialog>
              <DialogTrigger className='flex flex-row ml-[20px]' ><img src='location.8b71f906.svg' /><div className='text-xs font-semibold text-[13px] pl-2'><p className='text-gray-800'>Chennai</p><p className='text-gray-400'>600001</p></div></DialogTrigger>
              <DialogContent className='w-[1153px] sm:max-w-[1153px] max-w-[95vw] h-[450px] p-0 overflow-hidden rounded-[10px]'>
                <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                  <div className='flex items-center justify-center'>
                    <img src="dialogimg.png" alt="Location Illustration" className="max-w-full h-auto object-contain" />
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
                              <img src='chennai.svg' className='w-full h-full object-cover' alt="Chennai" />
                            </div>
                            <span className='text-xs font-medium  text-gray-600 group-hover:text-[#FF3F3F]'>Chennai</span>
                          </div>
                          <div className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className='w-20 h-20 rounded-full border border-gray-300 overflow-hidden'>
                              <img src='coimbatore.svg' className='w-full h-full object-cover' alt="Coimbatore" />
                            </div>
                            <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Coimbatore</span>
                          </div>
                          <div className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className='w-20 h-20 rounded-full border border-gray-300 overflow-hidden'>
                              <img src='banglore.svg' className='w-full h-full object-cover' alt="Bengaluru" />
                            </div>
                            <span className='text-xs font-medium text-gray-600 group-hover:text-[#FF3F3F]'>Bengaluru</span>
                          </div>
                          <div className='flex flex-col items-center gap-2 cursor-pointer group'>
                            <div className='w-20 h-20 rounded-full border border-gray-300 overflow-hidden'>
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
            <a href='' className='flex items-center font-semibold pl-[30px] h-[16px] '><img src='washingmachine.png' className='w-[17px] h-[17px]  mr-[5px]' /><p>Appliances</p></a>
            <a href='' className='flex items-center font-semibold pl-[30px] h-[16px] '><img src='sofa.png' className='w-[17px] h-[17px]  mr-[5px]' /><p>Furniture</p></a>
            <a href='' className='flex items-center font-semibold pl-[30px] h-[16px] '><img src='home-appliances.png' className='w-[17px] h-[17px]  mr-[5px]' /><p>Packages</p></a>
          </div>
          <div className='flex items-center gap-[30px]'>
            <Field className='w-[372px] h-[32px]'>
              <ButtonGroup>
                <Input id="input-button-group" className='' placeholder="Search" />
                <Button variant='outline' className='flex items-center'><img src='search.c07cabfa.svg' /></Button>
              </ButtonGroup>
            </Field>
            <div className='flex'>
              <img src="cart.5fa6c9b1.svg" alt='' />
              <p className='pl-[3px] text-sm font-semibold pl-[8px]'>Cart</p>
            </div>
            <Button className='bg-red-500'>Login</Button>
          </div>
        </div>
        <div className='bg-[#2B5CAB] text-white h-[39px] flex  '>
          <div className='font-bold gap-[30px] mx-auto w-full max-w-[1200px] flex justify-center items-center'>
            <a href='/' className=''>Refrigerator </a>
            <a href='/' className=''>Washing Machine</a>
            <a href='/' className=''>Mattresses </a>
            <a href='/' className=''>Cot </a>
            <a href='/' className=''>Air Conditioners </a>
            <a href='/' className=''>Sofas </a>
            <a href='/' className=''>Televisions </a>
            <a href='/' >Laptops </a>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden block bg-white">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-black" />
            <img className="max-w-[100px]" src="payrentz-logo.5c7f17d4.svg" alt="logo" />
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-[#ED1F28] hover:bg-[#F87171] text-white font-bold h-8 px-4 rounded">Login</Button>
            <img src="cart.5fa6c9b1.svg" alt="cart" className="w-6 h-6" />
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
    </div>
  )
}

export default Navbar
