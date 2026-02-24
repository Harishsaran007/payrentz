import React from 'react' 
import Link from 'next/link'
import { TiTick } from 'react-icons/ti'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const AC = () => {
  return (
    <div className='max-w-[1301px] mx-auto'>
        <div className='flex flex-row gap-[30px] my-[20px] overflow-x-auto whitespace-nowrap scrollbar-hide px-[20px]'>
                <Link href="/appliances" className='flex flex-col items-center shrink-0 cursor-pointer relative'>
                    <img src="/allfilter.jpg" alt="" className='w-[52px] h-[52px] rounded-[50px] object-cover'/>
                    <p className='text-xs sm:text-sm font-bold text-black mt-[16px]'>All</p>
                </Link>
                <Link href='/appliances/ac-on-rent' className='flex flex-col items-center shrink-0 cursor-pointer'>
                    <div className='relative'>
                         <img src="/acfilter.png" alt="" className='w-[52px] h-[52px] rounded-[50px] object-cover' />
                        <div className="absolute inset-0 bg-[#ED1F28]/40 flex justify-center items-center rounded-[50px]"><TiTick className='text-white text-4xl' /></div>
                    </div>
                    <p className='text-xs sm:text-sm font-bold text-[#ED1F28] mt-[16px]'>ACs</p>
                </Link>
                <Link href='/appliances/refrigerator-on-rent' className='flex flex-col items-center shrink-0 cursor-pointer'>
                    <img src="/fridgefilter.png" alt="" className='w-[52px] h-[52px] rounded-[50px] object-cover' />
                    <p className='text-xs sm:text-sm font-bold text-black mt-[16px]'>Refrigerators</p>
                </Link>
                <Link href='/appliances/tv-on-rent' className='flex flex-col items-center shrink-0 cursor-pointer'>
                    <img src="/tvfilter.jpg" alt="" className='w-[52px] h-[52px] rounded-[50px] object-cover' />
                    <p className='text-xs sm:text-sm font-bold text-black mt-[16px]'>Televisions</p>
                </Link>
                <Link href='/appliances/laptop-on-rent' className='flex flex-col items-center shrink-0 cursor-pointer'>
                    <img src="/lapfilter.jpg" alt="" className='w-[52px] h-[52px] rounded-[50px] object-cover' />
                    <p className='text-xs sm:text-sm font-bold text-black mt-[16px]'>Laptops</p>
                </Link>
                <div className='flex flex-col items-center shrink-0 cursor-pointer'>
                    <img src="/seeallfilter.jpg" alt="" className='w-[52px] h-[52px] rounded-[50px] object-cover' />
                    <p className='text-xs sm:text-sm font-bold text-black mt-[16px]'>See All</p>
                </div>
            </div>
            <hr className='py-[20px]'/>
            <div className='mx-[20px]'>
                <Card className="relative mr-[40px]  w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md mb-[20px]">
                        <img
                            src="/AC.png"
                            alt="Front Load Washing Machine"
                            className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                        />
                        <CardHeader className="px-1 pt-3">
                            <Badge variant="secondary" className="w-fit  text-[#ed1f28] font-bold  hover:text-red-500 rounded-md px-2 py-0.5 text-[7.2px] md:text-sm font-semibold mb-1 bg-blue-50">
                                Newly Added
                            </Badge>
                            <CardTitle className="text-[10px] md:text-lg font-bold">Blue Star AC (1.5 ton)</CardTitle>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm md:text-xl font-extrabold">₹999</span>
                                <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                            </div>
                        </CardHeader>
                    </Card>
            </div>
    </div>
  )
}

export default AC