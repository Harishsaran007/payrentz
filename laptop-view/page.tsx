import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Cards from '@/app/_components/cards'
import LaptopProductView from '@/app/_components/LaptopProductView'


const Pageview = () => {

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

            <LaptopProductView />

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
