"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import Cards from '@/app/_components/cards'


const Pageview = () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [selectedTenure, setSelectedTenure] = React.useState(2)

    React.useEffect(() => {
        if (!api) return

        api.on('select', () => {
            setSelectedIndex(api.selectedScrollSnap())
        })
    }, [api])

    const specs = [
        { label: "Product Name", value: "Laptop" },
        { label: "Configuration", value: "i5, 4GB RAM, 320GB HD" },
        { label: "Screen Size", value: '14" and above' },
        { label: "Brand", value: "Leading Brands / Based on Availability" },
        { label: "Color", value: "May vary / Based on Availability" },
        { label: "Transport", value: "Covered in Handling Charges" },
    ];



    return (
        <div className='max-w-[1320px] mx-auto lg:px-[10px] xl:px-0'>
            <div className='my-[30px] '>
                <Breadcrumb className='mx-[20px] lg:mx-0'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/appliances">Appliances</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Laptop i5 Core</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <hr className='mt-[20px]' />
            </div>
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-[20px]'>
                <div className='order-1'>
                    <div className='hidden lg:grid grid-cols-2 gap-[20px]'>
                        <img src='/lap1.png' className='w-[326px] h-[326px] border rounded-[5px] object-contain' />
                        <img src='/lap2.png' className='w-[326px] h-[326px] border rounded-[5px] object-contain' />
                        <img src='/lap3.png' className='w-[326px] h-[326px] border rounded-[5px] object-contain' />
                        <img src='/lap4.png' className='w-[326px] h-[326px] border rounded-[5px] object-contain' />
                    </div>

                    <div className='lg:hidden block border rounded-[10px] p-[20px] bg-white relative'>
                        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
                            <CarouselContent>
                                {[1, 2, 3, 4].map((num, index) => (
                                    <CarouselItem key={index}>
                                        <img src={`/lap${num}.png`} className='w-full h-auto object-contain' />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                        <div className='absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[8px]'>
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={`w-[8px] h-[8px] rounded-full border border-gray-300 transition-colors ${selectedIndex === index ? 'bg-[#2b5cab] border-[#2b5cab]' : 'bg-white'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='order-3 py-[31px] lg:col-start-1 lg:row-start-2 '>
                        <Tabs defaultValue="discription" >
                            <TabsList variant='line' className='w-full pl-[50px] overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                                <TabsTrigger value="discription">Description</TabsTrigger>
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="questions">Frequently Asked Questions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="discription">
                                <div>
                                    <h2 className='font-extrabold text-2xl text-[#2b5cab] py-[20px] px-[10px] lg:px-0'>Description</h2>
                                    <p className='font-medium text-base text-justify px-[20px] lg:px-0'>PayRentz offers Core i5 laptop on rental in Chennai
                                        with complete service backup. Laptop computer is compact
                                        and help people on the move to carry to office or client meetings.
                                        Laptops have replaced most of the desktops due to its design, powerful configurations,
                                        light weight and portable. Such mobile friendly laptops can be rented from PayRentz in
                                        Chennai. Renting laptops is sensible decision because service is on us, need not to
                                        invest in a technology that will obsolete, your business can be asset light and
                                        upgrade the laptop. PayRentz offers laptop for rent with standard configurations
                                        & customization. With simple documentation, online payment options, on time delivery,
                                        service backup rental laptops from PayRentz is highly convenient. Processor i5,
                                        4GB RAM, 320/500 GB HDD is suitable for profiles that need fast PC's customization
                                        also available.
                                    </p>
                                </div>
                            </TabsContent>
                            <TabsContent value="specifications">
                                <div className="max-w-4xl mx-auto p-6">
                                    <h2 className="text-2xl font-bold text-[#2b5cab] mb-6">
                                        Specifications
                                    </h2>

                                    <div>
                                        {specs.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`grid grid-cols-2 p-4 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"
                                                    }`}
                                            >
                                                <span className="font-semibold text-gray-800 text-sm">
                                                    {item.label}
                                                </span>
                                                <span className="text-gray-600 text-sm">
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="questions">
                                <div>
                                    <h2 className='font-extrabold text-2xl text-[#2b5cab] py-[20px] px-[10px] lg:px-0'>Frequently Asked Questions</h2>
                                    <div className='py-[20px] px-[10px] lg:px-0'>
                                        <h2 className='text-sm font-extrabold pb-[10px]'>What is the minimum rental period?</h2>
                                        <p className='text-sm font-medium'>Payrentz products can be rented for minimum period of 3 months.</p>
                                    </div>
                                    <hr />
                                    <div className='py-[20px] px-[10px] lg:px-0'>
                                        <h2 className='text-sm font-extrabold pb-[10px]'>Is there an agreement?</h2>
                                        <p className='text-sm font-medium'>Yes, you need to sign the Terms and Conditions provided along with the application form.</p>
                                    </div>
                                    <hr />
                                    <div className='py-[20px] px-[10px] lg:px-0'>
                                        <h2 className='text-sm font-extrabold pb-[10px]'>How can i terminate a rental agreement?</h2>
                                        <p className='text-sm font-medium text-justify'>The rental contract gets terminated on completion of the original
                                            rental duration agreed (subject to minimum rental period of 3 months) .
                                            The contract can also be terminated by either of the parties by giving 15 days notice .
                                            Notwithstanding the above, if the rent amount payable and due remains unpaid for more than 15 days
                                            from the due date, the rental contract stands automatically terminated. In such a case,
                                            the client is expected to arrange to return the products forthwith and facilitate PayRentz team
                                            to take possession of the products so given on rent.
                                        </p>
                                    </div>
                                    <hr />
                                    <div className='py-[20px] px-[10px] lg:px-0'>
                                        <h2 className='text-sm font-extrabold pb-[10px]'>How much rent do I need to pay and when?</h2>
                                        <p className='text-sm font-medium text-justify'>Clients are encouraged to pay rent for the products on or before 7th of every month.
                                            Kindly refer to the product categories listed along with rent details in the website.
                                            Rent will be communicated without any ambiguity at the time of delivery and
                                            it will be documented in the application form.
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className='order-2 lg:row-span-2 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-[-45px] h-fit'>
                    <h1 className='text-[24px] lg:text-[32px] font-extrabold pb-[10px] lg:pb-0 pl-[10px] lg:pl-[20px]'>Laptop i5 Core</h1>
                    <div className='bg-[#F3F7FF] border rounded-[5px] p-[15px] lg:p-[20px]'>
                        <div className='flex justify-between items-center pb-[15px] lg:pb-0'>
                            <h2 className='text-lg font-extrabold text-[#3a3a3a] lg:hidden'>Pick Tenure</h2>
                            <p className='lg:text-sm text-xs font-bold underline text-[#2B5CAB] text-end ml-auto'>Compare Tenures</p>
                        </div>
                        <div className='grid grid-cols-2 xl:flex xl:justify-evenly gap-[10px] xl:gap-0 pt-[10px] xl:pt-[20px]'>
                            {[
                                { months: '12+ months', price: '₹1800', mostPicked: false },
                                { months: '6+ months', price: '₹2000', mostPicked: true },
                                { months: '3+ months', price: '₹2000', mostPicked: false },
                                { months: '1 month', price: '₹2500', mostPicked: false }
                            ].map((tenure, index) => {
                                const isSelected = selectedTenure === index;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedTenure(index)}
                                        className={`relative flex-1 text-center border p-[15px] ${tenure.mostPicked ? 'pt-[10px]' : ''} lg:pt-[25px] rounded-[5px] cursor-pointer xl:max-w-[130px] ${isSelected ? 'bg-[#FFEBEB] lg:bg-white border-red-500 border-[2px]' : 'bg-white'
                                            } ${index > 1 ? 'mt-[10px] lg:mt-0' : (index === 1 ? 'lg:mt-0' : '')}`}
                                    >
                                        {tenure.mostPicked && (
                                            <div className='absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#2B5CAB] text-white text-[10px] px-[8px] py-[2px] rounded-[5px] whitespace-nowrap shadow-sm font-semibold tracking-wide'>Most Picked</div>
                                        )}
                                        <p className={`font-semibold text-xs lg:text-[15px] ${isSelected ? 'text-red-500' : ''}`}>{tenure.months}</p>
                                        <h1 className={`font-bold text-[22px] lg:text-[28px] pt-[5px] lg:pt-[10px] flex justify-center items-center lg:flex-col ${isSelected ? 'text-red-500' : ''}`}>{tenure.price}<span className='text-xs text-gray-500 font-normal'>/month</span></h1>
                                        <Button
                                            variant={isSelected ? 'destructive' : 'outline'}
                                            className={`hidden  lg:block mx-auto text-sm font-bold border-[2px] mt-[20px] w-full max-w-[120px] px-[10px]  ${isSelected ? 'border-red-500 text-white' : 'border-red-500 text-red-500 hover:text-red-500'
                                                }`}
                                        >
                                            {isSelected ? 'Selected' : 'Pick Tenure'}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='flex lg:hidden w-full mt-[20px] items-center'>
                            <Button variant='destructive' className='flex-1 rounded-none rounded-l-[5px] font-bold border border-[#ED1F28] text-lg py-[25px] hover:bg-red-600 bg-[#ED1F28]'>Rent Now</Button>
                            <Button variant='outline' className='flex-1 rounded-none rounded-r-[5px] border-[#ED1F28] border-l-0 text-[#ED1F28] text-base font-bold bg-white py-[25px] hover:bg-red-50'>Add To Cart</Button>
                        </div>

                        <div className='flex lg:hidden justify-between text-center mt-[20px] pb-[15px]'>
                            <div className='flex-1 border-r border-gray-300'>
                                <p className='text-[11px] font-medium text-gray-800 pb-[5px]'>Security Deposit</p>
                                <p className='font-extrabold text-[22px] tracking-tight'>₹4000</p>
                            </div>
                            <div className='flex-1'>
                                <p className='text-[11px] font-medium text-gray-800 pb-[5px]'>Handling Charge</p>
                                <p className='font-extrabold text-[22px] tracking-tight'>₹300</p>
                            </div>
                        </div>
                        <div className='lg:hidden pb-[10px] text-center'>
                            <p className='text-[10px] text-gray-500 leading-tight pb-[5px]'>Security Deposit is refundable on return of the product.</p>
                            <p className='text-[10px] text-gray-500 leading-tight'>Handling Charge is non-refundable - to cover delivery,<br />pickup, installation & service.</p>
                        </div>

                        <div className='hidden lg:block py-[17px] px-[20px] my-[20px] mx-[20px] border rounded-[5px]'>
                            <div className='grid grid-cols-5 items-center gap-3'>
                                <div className='flex col-span-2 gap-[30px] items-center'>
                                    <p className='font-medium text-sm'>Security Deposit</p>
                                    <p className='font-bold  text-[20px]'>₹4000</p>
                                </div>
                                <div className='flex col-span-3 border-l-2 pl-[20px] py-[6px]'>
                                    <p className='font-medium text-xs'> Security Deposit is refundable  on return  of the product.</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-5 items-center gap-3'>
                                <div className='flex col-span-2 gap-[30px] items-center'>
                                    <p className='font-medium text-sm'>Handling Charge</p>
                                    <p className='font-bold text-[20px]'>₹300</p>
                                </div>
                                <div className='flex col-span-3 border-l-2 pl-[20px] py-[6px]'>
                                    <p className='font-medium text-xs'> Handling Charge  is non-refundable  - to cover delivery, pickup, installation & service.</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex  justify-between  lg:mx-[40px] '>
                            <div className='flex flex-col items-center'>
                                <div className=' border rounded-[50%] lg:w-[70px] lg:h-[70px] w-[44px] h-[44px] border-red-500 overflow-hidden border-[3px] flex items-center justify-center '>
                                    <img src='/deliver.png' className=' lg:w-[36px] w-[22px]' />
                                </div>
                                <p className='font-semibold text-[10px] text-center lg:text-[11px] pt-[10px]'>2-day delivery</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className=' border rounded-[50%] lg:w-[70px] lg:h-[70px] w-[44px] h-[44px] border-red-500 overflow-hidden border-[3px] flex items-center justify-center '>
                                    <img src='/tool.png' className=' lg:w-[36px] w-[22px]' />
                                </div>
                                <p className='font-semibold text-[10px] text-center lg:text-[11px] pt-[10px] lg:w-[85px] w-[64px] text-center'>Service support for 6 months</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className=' border rounded-[50%] lg:w-[70px] lg:h-[70px] w-[44px] h-[44px] border-red-500 overflow-hidden border-[3px] flex items-center justify-center '>
                                    <img src='/tick.png' className=' lg:w-[36px] w-[22px]' />
                                </div>
                                <p className='font-semibold text-[10px] text-center lg:text-[11px] pt-[10px]'>Secure Transaction</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className=' border rounded-[50%] lg:w-[70px] lg:h-[70px] w-[44px] h-[44px] border-red-500 overflow-hidden border-[3px] flex items-center justify-center '>
                                    <img src='/deliver.png' className=' lg:w-[36px] w-[22px]' />
                                </div>
                                <p className='font-semibold text-[10px] text-center lg:text-[11px] pt-[10px]'>2-day delivery</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className=' border rounded-[50%] lg:w-[70px] lg:h-[70px] w-[44px] h-[44px] border-red-500 overflow-hidden border-[3px] flex items-center justify-center '>
                                    <img src='/tool.png' className=' lg:w-[36px] w-[22px]' />
                                </div>
                                <p className='font-semibold text-[10px] text-center lg:text-[11px] pt-[10px] lg:w-[85px] w-[64px] text-center'>Service support for 6 months</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-[30px] flex flex-col px-[10px]'>
                        <p className='font-semibold text-[15px] text-gray-500'> Enter your PIN code to check availability of product in your location</p>
                        <div className='flex items-center gap-[10px] pt-[10px]'>
                            <input type="text" placeholder='600001' className='border border-gray-300 font-medium text-base text-gray-400 max-w-[245px] w-full rounded-[5px] pl-[5px] h-[41px]' />
                            <Button variant='outline' className='border-black text-black text-base font-bold border-[1px] h-[41px]'>Check availability</Button>
                        </div>
                    </div>
                    <div className='hidden lg:flex gap-[10px] items-center w-full justify-evenly pt-[20px] border-t border-gray-200 lg:border-none lg:pt-0'>
                        <Button variant='destructive' className='flex-1 font-bold text-lg px-[40px] py-[20px] rounded-[5px] '>Rent Now</Button>
                        <Button variant='outline' className='flex-1 border-[#ED1F28] text-[#ED1F28] text-base font-bold border-[2px] px-[40px] py-[20px] rounded-[5px]'>Add To Cart</Button>
                    </div>
                </div>
            </div>
            <div>
                <h3 className='text-2xl font-extrabold text-[#2B5CAB] mt-[20px] pl-[5px] lg:pl-0'>People also Rented</h3>
                <div className=' grid grid-cols-2 sm:flex gap-[20px] sm:pr-[40px] mx-[25px] pt-[30px] pb-[60px]'>
                    <Cards />
                </div>
            </div>
        </div >
    )
}

export default Pageview
