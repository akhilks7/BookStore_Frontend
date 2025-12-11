import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { CiLocationOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { getHomeBookAPI } from '../../Services/allApi';
function LandingPage() {

  const [homebooks, sethomebooks] = useState([])
  const getHomeBooks = async () => {
    const result = await getHomeBookAPI()
    // console.log(result);
    sethomebooks(result.data)
  }
  // console.log(homebooks);
  useEffect(() => {
    getHomeBooks()
  }, [])

  return (
    <>
      <Header />
      {/* Landing */}
      <div className="flex flex-col h-screen justify-center items-center bg-[url(https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg)] bg-no-repeat bg-cover">
        <div className='w-full flex flex-col justify-center items-center text-white' style={{ height: "800px", width: "", backgroundColor: "rgb(0, 0, 0,0.5)" }}>

          <h1 className='text-7xl font-bold my-10'>wonderfull gifts</h1>
          <p> Ratione animi sequi maxime repudiandae error nostrum qui natus eos reprehenderit? Est?</p>
          <div className='flex my-10'>
            <input type="text" placeholder='search a books' className='bg-white p-3 rounded-3xl placeholder-gray-500 w-100 ' />
            <HiMiniMagnifyingGlass className='text-6xl ms-3' />
          </div>
        </div>
      </div>
      {/* newarival */}
      <div className="md:px-10 p-5  flex flex-col justify-center items-center">
        <h1 className='text-3xl text-center  font-bold'>new arrivals</h1>
        <h1 className='text-3xl text-center  font-bold'>explore more books</h1>

        {homebooks.length > 0 ?
          <div className="md:grid  grid-cols-4 w-full mt-5 mx-auto">
            {homebooks.map((item) => (
              <div className='p-3'>
                <div className='shadow rounded p-3'>
                  <img width={"500px"} height={"400px"} src={item.imageUrl} alt="" />
                  <div className="text-center mt-3">
                    <h1>{item.title}</h1>
                    <h1>{item.author}</h1>
                    <h1>${item.price}</h1>
                  </div>
                </div>
              </div>
            ))
            }
          </div>
          :
          <p>loading...</p>
        }

        <div className='mt-5'>
          <Link to={'/login'}><button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3
                          hover:bg-black hover:text-white'><FaRegUser className='me-2' />explore</button></Link>
        </div>

      </div>

      {/* featured authors */}
      <div className="w-full px-30 py-10">
        <div className="md:grid grid-cols-2 gap-10">
          <div className='my-'>
            <h1 className='text-3xl text-center m-3 font-bold'>featured authers</h1>
            <h2 className='text-2xl text-center m-3 font-semibold'>Lorem ipsum dolor sit amet.</h2>
            <p className='text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas odio facilis voluptate asperiores dolor officiis recusandae ab, hic Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, cum.</p>
            <p className='text-justify mt-3'> culpa accusamus accusantium quam magni delectus dolores perspiciatis enim officia consectetur Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat fugit recusandae sapiente commodi iusto ab consequuntur at reprehenderit dignissimos delectus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, laboriosam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, amet? elit voluptatum similique.</p>
          </div>
          <div className='felx items-center justify-center'>
            <img className='rounded-4xl' src="https://media.istockphoto.com/id/1230749818/photo/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display.jpg?s=612x612&w=0&k=20&c=xoWhF-hrQcbMEPDYncHiHF8HJX2YgmYt7T-KLCPZIpY=" alt="" />
          </div>
        </div>

      </div>
      {/* testamonials */}
      <div>
        <h1 className='text-3xl text-center  font-bold'>testamonials</h1>
        <h1 className='text-3xl text-center  font-bold'>textamonials details </h1>
        <div className="md:grid grid-cols-3 p-10 ">
          <div className='p-10' >
            <div className='felx items-center justify-center'>
              <img className='rounded-full' width={"500px"} height={"500px"} src="https://media.istockphoto.com/id/1230749818/photo/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display.jpg?s=612x612&w=0&k=20&c=xoWhF-hrQcbMEPDYncHiHF8HJX2YgmYt7T-KLCPZIpY=" alt="" />
            </div>
            <h1 className='text-center text-2xl mt-4 font-semibold'>Liger</h1>
            <p className='text-justify mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos dolorum rerum possimus ea quasi autem culpa suscipit ullam totam illo.</p>
          </div>
          {/* ---- */}
          <div className='p-10' >
            <div className=''>
              <img className='rounded-full' width={"500px"} height={"500px"} src="https://media.istockphoto.com/id/1230749818/photo/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display.jpg?s=612x612&w=0&k=20&c=xoWhF-hrQcbMEPDYncHiHF8HJX2YgmYt7T-KLCPZIpY=" alt="" />
            </div>
            <h1 className='text-center text-2xl mt-4 font-semibold'>Liger</h1>
            <p className='text-justify mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos dolorum rerum possimus ea quasi autem culpa suscipit ullam totam illo.</p>
          </div>
          {/* ----- */}
          <div className='p-10' >
            <div className=''>
              <img className='rounded-full' width={"500px"} height={"500px"} src="https://media.istockphoto.com/id/1230749818/photo/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display.jpg?s=612x612&w=0&k=20&c=xoWhF-hrQcbMEPDYncHiHF8HJX2YgmYt7T-KLCPZIpY=" alt="" />
            </div>
            <h1 className='text-center text-2xl mt-4 font-semibold'>Liger</h1>
            <p className='text-justify mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos dolorum rerum possimus ea quasi autem culpa suscipit ullam totam illo.</p>
          </div>
        </div>
      </div>
      {/* contact */}
      <div>
        <div>
          <h1 className='text-3xl text-center  font-bold'>contacts</h1>
          <p className='text-lg px-35 py-5 text-center  font-medium '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam veniam soluta hic accusamus vero placeat corporis error neque. Sed quae repellat harum alias, id reiciendis nam assumenda, possimus maiores nisi explicabo amet quos in! Repellendus impedit rem a nam aperiam, perferendis molestias? Porro unde ut quos deleniti ex ab laborum?</p>
        </div>
        <div className="md:grid grid-cols-3 mx-50 gap-20 my-8">
          <div className='flex' ><CiLocationOn className='text-5xl p-1 rounded-full bg-gray-300 text-black' /> <p className='text-lg font-bold mx-1'>asadhbook stall,managattukavala</p></div>
          <div className='flex' >< FaPhone className='text-5xl p-2 rounded-full bg-gray-300 text-black' /> <p className='text-lg font-bold m-2'>1234567890</p></div>
          <div className='flex' >< CiMail className='text-5xl p-2 rounded-full bg-gray-300 text-black' /> <p className='text-lg font-bold m-2'>bookstore@gmail.com</p></div>
        </div>
        <div className='md:grid grid-cols-2 mx-20 gap-10 m-10'>
          <div>
            <div className='bg-gray-300 p-10'>
              <h1 className='text-center text-lg font-semibold p-2'>send me message</h1>
              <input type="text" placeholder='Name' className='bg-white w-full p-2 m-2' />
              <input type="text" placeholder='Email' className='bg-white w-full p-2 m-2' />
              <input type="text" placeholder='Message' className='bg-white w-full p-2 py-10 m-2' />
              <button className='w-full bg-gray-800 text-white text-lg p-1 ms-2 my-3  text-center font-semibold'>send</button>
            </div>
          </div>
          <div className="w-full h-[420px] ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0524557799613!2d76.32120827506725!3d10.031733872825091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d14f0656d21%3A0x21c80bf8a97681ef!2sMangattukavala!5e0!3m2!1sen!2sin!4v1703091027494!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </>


  )
}

export default LandingPage