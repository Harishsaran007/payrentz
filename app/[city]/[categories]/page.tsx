import React from 'react'
import { TiTick } from "react-icons/ti";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from '@/components/ui/button'
import { CiFilter } from "react-icons/ci";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import Cards from '../../_components/cards';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export interface SubCategoryItem {
    id: string | number;
    slug: string;
    identity: string;
    category_detail?: {
        slug?: string;
    };
    image_detail?: {
        file?: string;
    };
}

const fetchSubCategories = async (category: string): Promise<SubCategoryItem[]> => {
    try {
        const res = await fetch(`https://staging-v2-api.payrentz.com/web/navigation/filter/${category}/meta/`, {
            next: { revalidate: 3600 }
        });
        const json = await res.json();
        return json?.data || [];
    } catch (error) {
        console.error("Failed to fetch subcategories:", error);
        return [];
    }
};



const CategoryPage = async ({ params }: { params: Promise<{ city: string, categories: string }> }) => {
    const resolvedParams = await params;
    // URL decode the category parameter in case it contains encoded characters
    const categories = decodeURIComponent(resolvedParams.categories);
    const city = resolvedParams.city;

    const queryClient = new QueryClient();

    const subCategories = await queryClient.fetchQuery({
        queryKey: ['subCategories', categories],
        queryFn: () => fetchSubCategories(categories),
    });

    // Capitalize category for breadcrumb and handle hyphens
    const categoryName = categories.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='max-w-[1301px] mx-auto'>
                <div className='flex flex-row justify-between px-[20px]'>
                    <div className='  py-[20px] mt-[10px]'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{categoryName}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className='flex items-center '>
                        <Button variant='outline' className='text-red-600 border-red-600 text-xs sm:text-base'><CiFilter />Filters</Button>
                    </div>
                </div>
                <hr />
                <div className='flex flex-row gap-[30px] my-[20px] overflow-x-auto whitespace-nowrap scrollbar-hide px-[20px]'>
                    <Link href={`/${city}/${categories}`} className='flex flex-col items-center shrink-0 cursor-pointer relative'>
                        <div className='relative'>
                            <img src="/allfilter.jpg" alt="" className='w-[52px] h-[52px] rounded-[50px] object-cover' />
                            <div className="absolute inset-0 bg-[#ED1F28]/40 flex justify-center items-center rounded-[50px]"><TiTick className='text-white text-4xl' /></div>
                        </div>
                        <p className='text-xs sm:text-sm font-bold text-[#ED1F28] mt-[16px]'>All</p>
                    </Link>
                    {subCategories.map((subcat) => (
                        <Link key={subcat.id} href={`/${city}/${subcat.category_detail?.slug || categories}/${subcat.slug}`} className='flex flex-col items-center shrink-0 cursor-pointer'>
                            <img
                                src={subcat.image_detail?.file || "/allfilter.jpg"}
                                alt={subcat.identity}
                                className='w-[52px] h-[52px] rounded-[50px] object-cover'
                            />
                            <p className='text-xs sm:text-sm font-bold text-black mt-[16px]'>{subcat.identity}</p>
                        </Link>
                    ))}
                </div>
                <hr />
                <div className='mt-[40px]'>
                    <div className=' xl:gap-[20px] xl:pr-[40px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-[30px] xl:px-0 mb-[20px]' >
                        <Cards />
                        <Cards />
                        <Cards />
                        <Cards />
                    </div>
                </div>



            </div>
        </HydrationBoundary>
    )
}

export default CategoryPage
