import React from 'react'
import { Badge } from "@/components/ui/badge"

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
    {
        value: "period",
        trigger: "What is the minimum rental period?",
        content:
            "PayRentz products can be rented for a minimum period of 3 months. PayRentz products can be rented for a minimum,",
    },
    {
        value: "charges",
        trigger: "What are the upfront charges for renting products?",
        content:
            "Refundable security deposit and non-refundable handling charges are payable upfront. The payable amount depends on the selected products. Please refer to the product categories for more information.",
    },
    {
        value: "expected",
        trigger: "When can I expect the delivery of the product?",
        content:
            "We aim to deliver the products within 24 hours (next working day) upon receipt of initial payment and successful KYC verification.",
    },
    {
        value: "requirements",
        trigger: "What are the documentation requirements?",
        content:
            "KYC includes Photo, ID, Address proof and Professional ID Card (issued by the company or institution). The entire KYC process can be completed digitally.",
    },
    {
        value: "kyc",
        trigger: "What is the average time to complete the KYC approval process?",
        content:
            "We endeavor to approve KYC on the same day, provided all necessary documents and details are in place.",
    },
    {
        value: "delivery",
        trigger: "Can I choose the delivery date slot?",
        content:
            "Yes, you can choose the delivery date slot while booking your rental subscription. We strive to deliver the products on the selected date, provided the KYC verification is successfully completed beforehand.",
    },
]

const Homecontent = () => {
    return (
        <div className='max-w-[1332px] mx-auto'>
            {/* <div className=' flex flex-col sm:flex-row gap-[20px] py-[20px] px-[20px] sm:px-0'>
                <img src="bigimg1.webp" className='rounded-xl' />
                <div className='flex flex-row sm:flex-col gap-[20px] w-full '>
                    <img src="bigimg2.webp" className='rounded-xl ml-[5px] w-1/2 sm:w-full sm:ml-0' />
                    <img src="bigimg3.webp" className='rounded-xl mr-[5px] w-1/2 sm:w-full sm:mr-0' />
                </div>
            </div> */}

            <div>
                <div className='flex flex-col sm:flex-row gap-[20px] my-[20px] mx-[20px] sm:mx-0'>
                    <div className="bg-[url('/youngwomen.jpg')] bg-cover bg-center h-[190px] md:h-[360px] w-full relative  overflow-hidden rounded-[20px] ">
                        <div className="absolute inset-0 bg-[#164c86]/40"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8">
                            <p className="text-2xl md:text-6xl font-extrabold">
                                Create a great home.
                            </p>
                            <p className="text-xs md:text-xl mt-2 md:mt-5 font-semibold">
                                Customized rental solutions for you.
                            </p>
                            <Button variant='destructive' className='py-[8px] px-[15px] text-xs md:text-lg font-bold mt-[10px]'>Explore Products</Button>
                        </div>
                    </div>

                    <div className='md:px-[20px] flex flex-row sm:flex-col gap-[10px] sm:gap-[20px] w-full md:w-[647px]'>
                        <div className='bg-[#236BB7] h-[170px] rounded-[10px] relative overflow-hidden flex flex-col pl-[15px] md:pl-[40px] justify-start pt-[10px] md:pt-0 md:justify-center flex-1'>
                            <div className='flex flex-row md:flex-col justify-center items-center md:items-start z-10'>
                                <p className='font-extrabold text-[13px] md:text-2xl text-white leading-tight'>Delivered in</p>
                                <p className='text-white text-xl md:text-5xl font-extrabold leading-tight pl-[10px] md:pl-0'>2 days!</p>
                            </div>
                            <div className='absolute bottom-[-100px] right-[5px] md:top-0 md:right-0'>
                                <img src='redshirt.png' className='w-[222px] object-contain' />
                            </div>
                        </div>
                        <div className='relative bg-[#EC2027] h-[170px] rounded-[10px] flex flex-col justify-start md:justify-center items-center flex-1 overflow-hidden'>
                            <div className='absolute bottom-0  md:left-0 '>
                                <img src='blueshirt.png' className='w-[222px] object-contain' />
                            </div>
                            <div className='flex flex-row md:flex-col justify-center items-center text-start md:text-center z-10 w-full md:pl-[140px] pt-[10px] md:pt-[0px]'>
                                <p className='font-extrabold text-sm md:text-5xl text-white'>Google</p>
                                <p className='text-white text-xs md:text-sm font-bold pt-[6px] pl-[5px] md:pl-[0px] '> 4.8 &#9733;&#9733;&#9733;&#9733;&#9733; <span>(189)</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='sm:flex sm:gap-[20px] sm:pr-[40px] grid grid-cols-2 gap-4 px-[30px] sm:px-0'>
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card1.png"
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
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card2.png"
                        alt="Front Load Washing Machine"
                        className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                    />
                    <CardHeader className="px-1 pt-3">
                        <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-bold mb-1">
                            Limited time offer
                        </Badge>
                        <CardTitle className="text-[10px] md:text-lg font-bold"> Double Door Fridge (240L)</CardTitle>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm md:text-xl font-extrabold">₹650</span>
                            <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card3.png"
                        alt="Front Load Washing Machine"
                        className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                    />
                    <CardHeader className="px-1 pt-3">
                        <Badge variant="secondary" className="w-fit bg-blue-50 text-[#ed1f28]  hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-semibold mb-1">
                            Newly Added
                        </Badge>
                        <CardTitle className="text-[10px] md:text-lg font-bold">56'' LED TV</CardTitle>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm md:text-xl font-extrabold">₹650</span>
                            <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card1.png"
                        alt="Front Load Washing Machine"
                        className="relative z-20 aspect-video h-[135px] md:h-[263px] rounded-xl w-full object-cover"
                    />
                    <CardHeader className="px-1 pt-3">
                        <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-bold mb-1">
                            Limited time offer
                        </Badge>
                        <CardTitle className="text-[10px] md:text-lg font-bold">Double Door Fridge (240L)</CardTitle>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm md:text-xl font-extrabold">₹650</span>
                            <span className="text-gray-500 text-[10px] md:text-base font-medium">/month</span>
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <div className='flex flex-col sm:flex-row justify-center  sm:gap-[150px] gap-[20px] py-[20px] md:py-[50px] mx-auto  items-center bg-blue-50 w-[335px] md:w-full  my-[50px]'>
                <h1 className='text-[#ed1f28] font-extrabold text-base md:text-3xl'>payrentz promise</h1>
                <div className='flex gap-[40px] '>
                    <div className='flex flex-col items-center justify-between w-[59px] md:w-[94px] h-[62px]'>
                        <img src="deliver.png" alt="" className='w-[44px] h-[32px] object-cover' />
                        <p className='text-[12px] font-bold text-center leading-tight'>2-day delivery</p>
                    </div>
                    <div className='flex flex-col items-center justify-between w-[100px] md:w-[190px] h-[59px]'>
                        <img src="tool.png" alt="" className='w-[36px] h-[36px] object-cover ' />
                        <p className='text-[12px] font-bold text-center leading-tight'>Service Support for 6 months</p>
                    </div>
                    <div className='flex flex-col items-center justify-between w-[77px] md:w-[131px] h-[60px]'>
                        <img src="tick.png" alt="" className='w-[36px] h-[36px] object-cover' />
                        <p className='text-[12px] font-bold text-center leading-tight'>Secure transactions</p>
                    </div>

                </div>
            </div>

            <div>
                <h1 className="text-[#2b5cab] font-extrabold text-lg md:text-3xl text-center mb-[20px] md:mb-[60px]">Rent by Category</h1>
                <div className='grid grid-cols-3 sm:flex sm:justify-center sm:items-center gap-[20px] md:gap-[60px] sm:h-[178px] w-full'>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[83px] md:w-[135px] h-[83px] md:h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="circlefridge.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-xs md:text-lg'>Refrigerators</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[83px] md:w-[135px] h-[83px] md:h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="circlemachine.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-xs md:text-lg text-center w-[159px] '>Washing Machine</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[83px] md:w-[135px] h-[83px] md:h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="mattress.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-xs md:text-lg'>Mattress</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[83px] md:w-[135px] h-[83px] md:h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="cots.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-xs md:text-lg'>Cots</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[83px] md:w-[135px] h-[83px] md:h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="AC.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-xs md:text-lg'>Air Conditioners</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[83px] md:w-[135px] h-[83px] md:h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="circletv.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-xs md:text-lg'>Televisions</span>
                    </div>
                </div>
            </div>

            <div className='h-[104px] sm:h-[226px]  bg-[#2b5cab] mt-[133px] mx-[20px] sm:mx-0 relative  rounded-[10px]'>
                <div className='absolute  bottom-0 left-[-30px] lg:left-[50px]'>
                    <img src='girlonchair.png' alt="" className='w-[240px] h-[159px] sm:h-[229px] sm:w-[522px] sm:h-[339px] object-fill ' />
                </div>
                <div className='flex  flex-col items-end '>
                    <div className='flex flex-col items-start mr-[10px] sm:mr-[86px] mt-[17px] sm:mt-[45px]'>
                        <h1 className='font-extrabold text-white text-xs sm:text-4xl'>Modern chairs for your living room</h1>
                        <h3 className='font-semibold text-white text-[8px] sm:text-2xl my-[6px] sm:mt-[11px] sm:mb-[20px]'>Contemporary style chairs, starting from ₹850.</h3>
                        <span className='font-bold text-white text-[8px] sm:text-lg bg-red-500 py-[6px] sm:px-[15px] px-[12px] sm:py-[8px] rounded-md'> Explore Furniture</span>
                    </div>
                </div>
            </div>

            <div className='mt-[80px]'>
                <h1 className='text-blue-800 font-extrabold text-center text-[28px] mb-[20px] md:mb-[30px] '>Rent Appliances</h1>
                <div className=' grid grid-cols-2 sm:flex gap-[20px] sm:pr-[40px] mx-[25px]'>
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card1.png"
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
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card2.png"
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
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card3.png"
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
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card1.png"
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
                </div>
            </div>
            <div className='bg-[#2b5cab] mx-[20px] sm:mx-[0px] mt-[80px] rounded-[20px] relative overflow-hidden sm:mr-[20px]'>
                <div className='hidden xl:flex relative justify-between h-[485px]'>
                    <div className='pl-[68px] '>
                        <h2 className='text-white font-extrabold pt-[50px]'>
                            <p className='text-5xl'>Client Chronicles:</p>
                            <span className='text-[40px]'>Unveiling Customer Journey</span>
                        </h2>
                        <div className='flex mt-[68px]'>
                            <img src='image1.png' className='w-[190px] h-[194px] rounded-[50%]' />
                            <img src='image2.jpg' className='w-[113px] h-[194px] object-[10%_center] object-cover rounded-r-full ' />
                            <img src='image3.jpg' className='w-[113px] h-[194px] object-[20%_center] object-cover rounded-r-full' />
                            <img src='image4.png' className='w-[113px] h-[194px] object-[25%_center] object-cover rounded-r-full' />
                            <img src='image5.png' className='w-[113px] h-[194px] object-[50%_center] object-cover rounded-r-full' />
                        </div>
                    </div>
                    <div className='w-[546px] h-[366px] mt-[50px] pr-[67px] '>
                        <div className='w-[503px] mt-[12px] pl-[13px] '>
                            <div className='my-[30px] pl-[30px] text-white border-l border-gray-400'>
                                <p>"We used PayRentz to furnish our temporary space, and it was a breeze. The process was seamless. Highly recommended!"</p>
                                <p className='font-semibold pt-[20px]'>Balaji</p>
                                <p>Has been renting from 2020</p>
                            </div>
                            <div className='my-[30px] pl-[30px] text-white border-l border-gray-400'>
                                <p>"PayRentz exceeded our expectations with top-notch furniture at affordable prices. The process, from selection to delivery, was straight-forward.  Grateful for the excellent service!"</p>
                                <p className='font-semibold pt-[20px]'>Prakash</p>
                                <p>Has been renting from 2021</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='xl:hidden flex flex-col p-8 items-center text-center sm:text-left sm:items-start '>
                    <h2 className='text-white font-extrabold text-[22px] w-[282px] sm:text-4xl mb-8 leading-tight'>
                        See what our customers are saying!
                    </h2>

                    <div className='flex flex-row gap-4 mb-8 text-left'>
                        <div className='w-1 bg-white rounded-full shrink-0 h-auto self-stretch'></div>
                        <div className='text-white'>
                            <p className='text-base sm:text-xl italic font-medium leading-relaxed mb-4'>
                                “PayRentz products can be rented for a minimum period of 3 months. PayRentz products can be rented for a minimum period of 3 months.”
                            </p>
                            <div className='mt-2'>
                                <p className='font-semibold text-base'>Balaji</p>
                                <p className='text-xs opacity-90'>Has been renting from 2020</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex justify-center items-center mt-4 sm:justify-start'>
                        <div className='flex items-center -space-x-1'>
                            <div className='z-50 w-24 h-24 rounded-full overflow-hidden shadow-lg'>
                                <img src='image1.png' className='w-full h-full object-cover' alt="Customer 1" />
                            </div>

                            <div className='z-40 w-16 h-24 rounded-r-full overflow-hidden border-l-2 border-[#2b5cab]  shadow-md'>
                                <img src='image2.jpg' className='w-full h-full object-cover object-[20%]' alt="Customer 2" />
                            </div>
                            <div className='z-30 w-16 h-24 rounded-r-full overflow-hidden border-l-2 border-[#2b5cab] shadow-md'>
                                <img src='image3.jpg' className='w-full h-full object-cover object-[20%]' alt="Customer 3" />
                            </div>
                            <div className='z-20 w-16 h-24 rounded-r-full overflow-hidden border-l-2 border-[#2b5cab] shadow-md'>
                                <img src='image4.png' className='w-full h-full object-cover object-[20%]' alt="Customer 4" />
                            </div>
                            <div className='z-10 w-16 h-24 rounded-r-full overflow-hidden border-l-2 border-[#2b5cab] shadow-md'>
                                <img src='image5.png' className='w-full h-full object-cover object-[20%]' alt="Customer 5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full mt-[15px]'>
                <h1 className='font-extrabold text-[28px] text-blue-800 text-center '>PayRentz Media</h1>
                <div className='flex flex-col sm:flex-row mt-[30px]'>
                    <div className=' sm:w-[701px] h-[203px] sm:h-[376px]'>
                        <div className='flex h-full '>
                            <img src='media1.jpg' className='w-[40%] sm:w-[50%] object-cover' />
                            <div className='bg-blue-50'>
                                <div className='text-end'>
                                    <Badge variant="destructive" className='text-[8px] sm:text-[15px] rounded-none bg-blue-800 py-[5px] sm:py-[12px] px-[7px] sm:px-[15px]' >In the News</Badge>
                                </div>
                                <div className='mt-[13px] sm:mt-[48px] ml-[25px] '>
                                    <h1 className='text-[#0a2d45] font-extrabold text-sm sm:text-[22px] '>Innovative  Ecommerce Rental Solutions  Redefining Online Shopping</h1>
                                    <p className='mt-[20px] text-[8px] sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
                                    <p className='text-gray-600 text-[8px] sm:text-xs mt-[20px]'>August 30,2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' sm:w-[701px] h-[203px] sm:h-[376px] sm:ml-[39px] mt-[30px] sm:mt-0'>
                        <div className='flex  h-full '>
                            <img src='media2.jpg' className='w-[40%] sm:w-[50%] object-cover' />
                            <div className='bg-blue-50'>
                                <div className='text-end'>
                                    <Badge variant="destructive" className='text-[8px] sm:text-[15px] rounded-none bg-blue-800 py-[5px] sm:py-[12px] px-[21px] sm:px-[41px]' >Blog</Badge>
                                </div>
                                <div className='mt-[13px] sm:mt-[48px] ml-[25px] '>
                                    <h1 className='text-[#0a2d45] font-extrabold text-sm sm:text-[22px] '>Transforming Shopping: The Emergence of Contemporary Ecommerce Rentals</h1>
                                    <p className='mt-[20px] text-[8px] sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
                                    <p className='text-gray-600 text-[8px] sm:text-xs mt-[20px]'>August 30,2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='text-center mt-[30px]'>
                    <Button variant='destructive' className='text-xs sm:text-xl font-bold px[9px] sm:px-[21px]  sm:py-[10px]'>See all posts</Button>
                </div>
            </div>

            <div className='mt-[50px] flex justify-between flex-col sm:flex-row mb-[30px]'>
                <div className='mt-[12px]'>
                    <p className='font-extrabold text-[28px] text-blue-800 ml-[25px] sm:ml-0'>Frequently Asked Questions <span className='font-semibold text-lg text-black'>Read More &gt;</span></p>
                    <p className='text-[#2d2d2d] text-base ml-[25px] sm:ml-0' >Lorem ipsum dolor sit amet consectetur adipiscing elit turpis</p>
                    <div className='mt-[27px] container mx-auto'>
                        <img src='roundman.webp' className='mx-auto hidden sm:block' />
                    </div>
                </div>
                <div className=' pt-[50px] px-[46px] bg-blue-50 mx-[20px] sm:mx-0'>
                    <Accordion
                        type="multiple"
                        className="max-w-lg"
                        defaultValue={["period"]}
                    >
                        {items.map((item) => (
                            <AccordionItem key={item.value} value={item.value}>
                                <AccordionTrigger className='text-lg font-bold text-[rgba(43,92,171,1)]'>{item.trigger}</AccordionTrigger>
                                <AccordionContent className='font-medium text-base'>{item.content}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
export default Homecontent