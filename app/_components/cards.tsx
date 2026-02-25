import React from 'react'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

const Cards = () => {
  return (
    <>
        <Link href='/appliances/laptop-view'>
            <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                <img
                    src="/card1.png"
                    alt="Front Load Washing Machine"
                    className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                />
                <CardHeader className="px-1 pt-3">
                    <Badge variant="secondary" className="w-fit  text-[#ed1f28] font-bold  hover:text-red-500 rounded-md px-2 py-0.5 text-[7.2px] md:text-sm font-semibold mb-1 bg-blue-50">
                        Newly Added
                    </Badge>
                    <CardTitle className="text-[10px] md:text-lg font-bold">Front Load Washing Machine (6kg)</CardTitle>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm md:text-xl font-extrabold">₹650</span>
                        <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                    </div>
                </CardHeader>
            </Card>
        </Link>
        <Link href='/appliances/laptop-view'>
            <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                <img
                    src="/card2.png"
                    alt="Front Load Washing Machine"
                    className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                />
                <CardHeader className="px-1 pt-3">
                    <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-[7.2px] md:text-sm font-bold mb-1">
                        Limited time offer
                    </Badge>
                    <CardTitle className="text-[10px] md:text-lg font-bold"> Double Door Fridge (240L)</CardTitle>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm md:text-xl font-extrabold">₹650</span>
                        <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                    </div>
                </CardHeader>
            </Card>
        
        </Link>
        <Link href='/appliances/laptop-view'>
            <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                <img
                    src="/card3.png"
                    alt="Front Load Washing Machine"
                    className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                />
                <CardHeader className="px-1 pt-3">
                    <Badge variant="secondary" className="w-fit bg-blue-50 text-[#ed1f28]  hover:text-red-500 rounded-md px-2 py-0.5 text-[7.2px] md:text-sm font-semibold mb-1">
                        Newly Added
                    </Badge>
                    <CardTitle className="text-[10px] md:text-lg font-bold">56'' LED TV</CardTitle>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm md:text-xl font-extrabold">₹650</span>
                        <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                    </div>
                </CardHeader>
            </Card>
        
        </Link>
        
        <Link href='/appliances/laptop-view'>
            <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                <img
                    src="/card1.png"
                    alt="Front Load Washing Machine"
                    className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                />
                <CardHeader className="px-1 pt-3">
                    <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-[7.2px] md:text-sm font-bold mb-1">
                        Limited time offer
                    </Badge>
                    <CardTitle className="text-[10px] md:text-lg font-bold">Double Door Fridge (240L)</CardTitle>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm md:text-xl font-extrabold">₹650</span>
                        <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    </>
  )
}

export default Cards