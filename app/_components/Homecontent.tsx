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
            <div className=' flex gap-[20px] py-[20px]'>
                <img src="bigimg1.webp" className='rounded-xl' />
                <div className='flex flex-col gap-[20px]'>
                    <img src="bigimg2.webp" className='rounded-xl' />
                    <img src="bigimg3.webp" className='rounded-xl' />
                </div>
            </div>


            <div className='flex gap-[20px] pr-[40px]'>
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card1.png"
                        alt="Front Load Washing Machine"
                        className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                    />
                    <CardHeader className="px-1 pt-3">
                        <Badge variant="secondary" className="w-fit  text-[#ed1f28] font-bold  hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-semibold mb-1 bg-blue-50">
                            Newly Added
                        </Badge>
                        <CardTitle className="text-lg font-bold">Front Load Washing Machine (6kg)</CardTitle>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-extrabold">₹650</span>
                            <span className="text-gray-500 text-base font-medium">/month</span>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card2.png"
                        alt="Front Load Washing Machine"
                        className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                    />
                    <CardHeader className="px-1 pt-3">
                        <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-bold mb-1">
                            Limited time offer
                        </Badge>
                        <CardTitle className="text-lg font-bold"> Double Door Fridge (240L)</CardTitle>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-extrabold">₹650</span>
                            <span className="text-gray-500 text-base font-medium">/month</span>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card3.png"
                        alt="Front Load Washing Machine"
                        className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                    />
                    <CardHeader className="px-1 pt-3">
                        <Badge variant="secondary" className="w-fit bg-blue-50 text-[#ed1f28]  hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-semibold mb-1">
                            Newly Added
                        </Badge>
                        <CardTitle className="text-lg font-bold">56'' LED TV</CardTitle>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-extrabold">₹650</span>
                            <span className="text-gray-500 text-base font-medium">/month</span>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                    <img
                        src="card1.png"
                        alt="Front Load Washing Machine"
                        className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                    />
                    <CardHeader className="px-1 pt-3">
                        <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-bold mb-1">
                            Limited time offer
                        </Badge>
                        <CardTitle className="text-lg font-bold">Double Door Fridge (240L)</CardTitle>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-extrabold">₹650</span>
                            <span className="text-gray-500 text-base font-medium">/month</span>
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <div className='flex justify-center gap-[150px] h-[117px] items-center bg-blue-50 w-full  my-[50px]'>
                <h1 className='text-[#ed1f28] font-extrabold text-3xl'>payrentz promise</h1>
                <div className='flex gap-[40px] '>
                    <div className='flex flex-col items-center justify-between w-[94px] h-[62px]'>
                        <img src="deliver.png" alt="" className='w-[36px] h-[36px] object-cover' />
                        <p className='text-[12px] font-bold text-center leading-tight'>2-day delivery</p>
                    </div>
                    <div className='flex flex-col items-center justify-between w-[190px] h-[59px]'>
                        <img src="tool.png" alt="" className='w-[36px] h-[36px] object-cover ' />
                        <p className='text-[12px] font-bold text-center leading-tight'>Service Support for 6 months</p>
                    </div>
                    <div className='flex flex-col items-center justify-between w-[131px] h-[60px]'>
                        <img src="tick.png" alt="" className='w-[36px] h-[36px] object-cover' />
                        <p className='text-[12px] font-bold text-center leading-tight'>Secure transactions</p>
                    </div>

                </div>
            </div>

            <div>
                <h1 className="text-[#2b5cab] font-extrabold text-3xl text-center mb-[60px]">Rent by Category</h1>
                <div className='flex justify-center items-center gap-[60px] h-[178px] w-full'>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[135px] h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="circlefridge.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-lg'>Refrigerators</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[135px] h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="circlemachine.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-lg text-center w-[159px] '>Washing Machine</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[135px] h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="mattress.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-lg'>Mattress</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[135px] h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="cots.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-lg'>Cots</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[135px] h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="AC.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-lg'>Air Conditioners</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 cursor-pointer group '>
                        <div className='w-[135px] h-[135px] rounded-full border border-gray-300 overflow-hidden'>
                            <img src="circletv.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className='font-bold text-lg'>Televisions</span>
                    </div>
                </div>
            </div>

            <div className='w-full h-[226px] bg-[#2b5cab] mt-[133px]  relative rounded-[10px]'>
                <div className='absolute  bottom-0 left-[100px]'>
                    <img src='girlonchair.png' alt="" className=' w-[522px] h-[339px] object-fill ' />
                </div>
                <div className='flex  flex-col items-end'>
                    <div className='flex flex-col items-start mr-[86px] mt-[45px]'>
                        <h1 className='font-extrabold text-white text-4xl text-4xl'>Modern chairs for your living room</h1>
                        <h3 className='font-semibold text-white text-2xl mt-[11px] mb-[20px]'>Contemporary style chairs, starting from ₹850.</h3>
                        <span className='font-bold text-white text-lg bg-red-500 px-[15px] py-[8px] rounded-md'> Explore Furniture</span>
                    </div>
                </div>
            </div>

            <div className='mt-[80px]'>
                <h1 className='text-blue-800 font-extrabold text-center text-[28px] mb-[30px] '>Rent Appliances</h1>
                <div className='flex gap-[20px] pr-[40px]'>
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card1.png"
                            alt="Front Load Washing Machine"
                            className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                        />
                        <CardHeader className="px-1 pt-3">
                            <Badge variant="secondary" className="w-fit  text-[#ed1f28] font-bold  hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-semibold mb-1 bg-blue-50">
                                Newly Added
                            </Badge>
                            <CardTitle className="text-lg font-bold">Front Load Washing Machine (6kg)</CardTitle>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-extrabold">₹650</span>
                                <span className="text-gray-500 text-base font-medium">/month</span>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card2.png"
                            alt="Front Load Washing Machine"
                            className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                        />
                        <CardHeader className="px-1 pt-3">
                            <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-bold mb-1">
                                Limited time offer
                            </Badge>
                            <CardTitle className="text-lg font-bold"> Double Door Fridge (240L)</CardTitle>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-extrabold">₹650</span>
                                <span className="text-gray-500 text-base font-medium">/month</span>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card3.png"
                            alt="Front Load Washing Machine"
                            className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                        />
                        <CardHeader className="px-1 pt-3">
                            <Badge variant="secondary" className="w-fit bg-blue-50 text-[#ed1f28]  hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-semibold mb-1">
                                Newly Added
                            </Badge>
                            <CardTitle className="text-lg font-bold">56'' LED TV</CardTitle>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-extrabold">₹650</span>
                                <span className="text-gray-500 text-base font-medium">/month</span>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="relative mr-[40px] mx-auto w-full max-w-sm pt-0 border-none shadow-none hover:border hover:border-gray-200 hover:shadow-md">
                        <img
                            src="card1.png"
                            alt="Front Load Washing Machine"
                            className="relative z-20 aspect-video h-[263px] rounded-xl w-full object-cover"
                        />
                        <CardHeader className="px-1 pt-3">
                            <Badge variant="destructive" className="w-fit bg-[#ed1f28] text-white hover:bg-red-50 hover:text-red-500 rounded-md px-2 py-0.5 text-sm font-bold mb-1">
                                Limited time offer
                            </Badge>
                            <CardTitle className="text-lg font-bold">Double Door Fridge (240L)</CardTitle>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-extrabold">₹650</span>
                                <span className="text-gray-500 text-base font-medium">/month</span>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </div>

            <div className='bg-[#2b5cab] w-full h-[485px] mt-[80px] rounded-[20px]'>
                <div className='flex relative justify-between'>
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
                        <div className='width-[503px] mt-[12px] pl-[13px] '>
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
            </div>

            <div className='w-full mt-[15px]'>
                <h1 className='font-extrabold text-[28px] text-blue-800 text-center '>PayRentz Media</h1>
                <div className='flex mt-[30px]'>
                    <div className=' w-[701px] h-[376px]'>
                        <div className='flex h-full '>
                            <img src='media1.jpg' className='w-[50%] object-cover' />
                            <div className='bg-blue-50'>
                                <div className='text-end'>
                                    <Badge variant="destructive" className='text-[15px] rounded-none bg-blue-800 py-[12px] px-[15px]' >In the News</Badge>
                                </div>
                                <div className='mt-[48px] ml-[25px] '>
                                    <h1 className='text-[#0a2d45] font-extrabold text-[22px] '>Innovative  Ecommerce Rental Solutions  Redefining Online Shopping</h1>
                                    <p className='mt-[20px] text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
                                    <p className='text-gray-600 text-xs mt-[20px]'>August 30,2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' w-[701px] h-[376px] ml-[39px]'>
                        <div className='flex h-full '>
                            <img src='media2.jpg' className='w-[50%] object-cover' />
                            <div className='bg-blue-50'>
                                <div className='text-end'>
                                    <Badge variant="destructive" className='text-[15px] rounded-none bg-blue-800 py-[12px] px-[41px]' >Blog</Badge>
                                </div>
                                <div className='mt-[48px] ml-[25px] '>
                                    <h1 className='text-[#0a2d45] font-extrabold text-[22px] '>Transforming Shopping: The Emergence of Contemporary Ecommerce Rentals</h1>
                                    <p className='mt-[20px] text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
                                    <p className='text-gray-600 text-xs mt-[20px]'>August 30,2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='text-center mt-[30px]'>
                    <Button variant='destructive' className='text-xl font-bold px-[21px] py-[10px]'>See all posts</Button>
                </div>
            </div>

            <div className='mt-[50px] flex justify-between'>
                <div className='mt-[12px]'>
                    <p className='font-extrabold text-[28px] text-blue-800'>Frequently Asked Questions <span className='font-semibold text-lg text-black'>Read More &gt;</span></p>
                    <p className='text-[#2d2d2d] text-base' >Lorem ipsum dolor sit amet consectetur adipiscing elit turpis</p>
                    <div className='mt-[27px] container mx-auto'>
                        <img src='roundman.webp' className='mx-auto' />
                    </div>
                </div>
                <div className=' pt-[50px] px-[46px] bg-blue-50'>
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



            <div className='pb-[100px]'>

            </div>
        </div>
    )
}

export default Homecontent