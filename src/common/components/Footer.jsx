import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { TiSocialTwitter } from "react-icons/ti";
import { SlSocialGithub } from "react-icons/sl";
function Footer() {
    return (
        <>
            <div className="md:grid grid-cols-3 md:gap-9 bg-gray-900 text-white p-10">
                <div>
                    <h1 className='font-bold '>About us</h1>
                    <p className='text-justify mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, facilis ducimus iure, nostrum incidunt sed delectus nulla quas amet voluptatum tempore labore repellendus libero vel veniam laboriosam sit quia hic architecto corrupti perferendis, aliquid molestiae. Repudiandae vel nam dolore atque.</p>
                </div>
                {/* ---------------------- */}
                <div className=''>
                    <h3 className='font-bold'>Newsleter</h3>
                    <p className='my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, sunt.</p>
                    <div className='flex'>
                        <input type="text " className='bg-white p-2 placeholder-gray-900'placeholder='enter email'   />
                    <button className='bg-yellow-300 p-3 '><FaArrowRight /></button>
                    </div>
                </div>
                {/* ----------------------- */}
                <div>
                    <h1 className='font-bold text-2xl'>follow us</h1>
                    <p className='py-5'>let us be social</p>
                    <div className='flex font-bold text-3xl gap-4 '>
                        <TiSocialTwitter />
                        <SlSocialFacebook />
                        <SlSocialGithub />
                    </div>
                </div>
            </div>
             <div className='w-full items-center text-center bg-gray-900 text-white p-3 '>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nostrum! &#10084;</p>
             </div>
            
        </>
    )
}

export default Footer