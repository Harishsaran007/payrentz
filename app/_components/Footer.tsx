import React from 'react'
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className='bg-black w-full text-white sm:h-[402px] px-[20px] sm:px-[60px] pt-[50px]'>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
                <div className='w-[206px] h-[164px]'>
                    <div>
                        <img src='footerlogo.png' className='w-[177px] h-[45px] object-cover' />
                    </div>
                    <div className='text-white flex flex-col gap-[10px] items-center'>
                        <p className='text-xl font-bold'>Contact us</p>
                        <p className='flex font-medium items-center' ><MdOutlineMail /><span className='font-medium text-lg pl-[3px]'>hello@payrentz.com</span></p>
                        <p className='flex font-medium items-center'><IoCallOutline /><span className='font-medium text-lg pl-[3px]'>+91 8987656467</span> </p>
                    </div>
                </div>
                <div className='flex flex-row gap-[40px] sm:gap-[125px] mb-[40px] sm:mb-0 '>
                    <div >
                        <p className='text-center sm:text-start font-bold text-xl pb-[25px]'>Company</p>
                        <div className='sm:grid flex flex-col items-center sm:grid-cols-2 gap-4 text-base  '>
                            <label>Home</label>
                            <label>About us</label>
                            <label>Blog</label>
                            <label>FAQs</label>
                        </div>

                    </div>
                    <div>

                        <p className='text-center sm:text-start font-bold text-xl pb-[25px]'>Categories</p>
                        <div className='sm:grid flex flex-col items-center sm:grid-cols-2 gap-5'>
                            <label>Rent Appliances</label>
                            <label>Rent Furniture</label>
                            <label>Rent Fitness Equipment</label>
                            <label>Rental Packages</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <hr />
                <div className='flex flex-col sm:flex-row items-center justify-between'>
                    <div className='flex py-[22px]'>
                        <FaTwitter />
                        <FaFacebookF className='mx-[10px]' />
                        <FaInstagram />
                    </div>
                    <div className='flex gap-[20px] py-[22px]'>
                        <p>Disclaimer</p>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>

                    </div>
                </div>
                <hr />
            </div>
            <div className='mt-[20px] text-center sm:text-start pb-[20px]'>
                <p>&copy; Copyright 2023 Payrentz.com</p>
            </div>
        </div>
    )
}

export default Footer