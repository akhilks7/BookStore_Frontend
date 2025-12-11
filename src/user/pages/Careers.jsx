import React, { useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'

function Careers() {
  const [applystatus, setapplystatus] = useState(false)
  return (
    <>
      <Header />
      <div className="md:px-40 p-5">
        <div className="text-center my-5">
          <h1 className="text-2xl font-bold mb-5">Careers</h1>
          <p className="text-sm text-gray-700"></p>
        </div>
        <div className='my-10'>
          <h1 className='text-3xl font-bold'>Current Openings</h1>
          <div className=" flex my-5">
            <input type="text" className='p-2 border border-gray-500 text-black w-100 placeholder-gray-500' placeholder='Search by title' />
            <button type="button" className='bg-blue-900 text-white p-2 hover:bg-white hover:border hover:text-blue-900 hoevr:border-blue-900'>Search</button>
          </div>
        </div>
        {/* job listing */}
        <div className="border border-gray-400 p-5 shadow my-5">
          <div className="flex mb-5">
            <div className='w-full'>
              <h1>Frontend developer</h1>
              <hr />

            </div>
            <button onClick={() => { setapplystatus(true) }} className='bg-blue-600 text-white p-3 ms-5 flex items-center' >Apply<FaArrowUpRightFromSquare className='ms-2' /></button>
          </div>
          <p>Kochi</p>
          <p>job Type : FULL TIME</p>
          <p>Salary : 20000 - 30000/month</p>
          <p>Qualification : BCA </p>
          <p>Experience : 1-2 years</p>
          <p>DEscription: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis pariatur facilis enim dolor inventore quidem temporibus mollitia possimus voluptatem, consequuntur deserunt officia cumque dolores reprehenderit eligendi voluptatibus quasi, labore id vel? Maiores aliquam quas at dicta? Maxime ad suscipit, in reiciendis, cumque sint porro, quos quod nesciunt odio velit magni.</p>
        </div>
      </div>
      {applystatus &&
        <div className='relative z-10 overflow-y-hidden'>
          <div className="bg-gray-400/75 fixed inset-0">
            <div className="flex justify-center items-center min-h-screen scroll-auto">
              <div className="bg-white md:w-250 w-100 rounded-2xl">
                <div className="bg-black text-white p-5 flex justify-between items-center rounded-t-2xl">
                  <h3>Application Form</h3>
                  <button onClick={() => { setapplystatus(false) }}>x</button>
                </div>
                <div className='md:grid grid-cols-2 gap-5 p-5'>
                  <div className='flex flex-col p-2 gap-4'>
                    <input className=' bg-gray-300 p-2 border border-gray-700' placeholder='Full Name' type="text" />
                    <input className=' bg-gray-300 p-2 border border-gray-700' placeholder='email' type="text" />
                  </div>
                  <div className='flex flex-col p-2 gap-4'>
                    <input className=' bg-gray-300 p-2 border border-gray-700' placeholder='Qualification' type="text" />
                    <input className=' bg-gray-300 p-2 border border-gray-700' placeholder='Phone' type="text" />
                  </div>

                </div>
                <div className='mx-6 mb-3'>
                  <input className='p-2 py-10 w-full   bg-gray-300  border border-gray-700' placeholder='Cover Letter' type="textarea" />
                </div>
                <div className='flex flex-col px-5 w-full'>
                  <h1 className='text-2xl ms-2 mb-3'>upload resume</h1>
                  <label htmlFor="uploadresume">

                    <input id='uploadresume' style={{ display: 'none' }} className=' bg-gray-300 p-2 border border-gray-700 w-full' type="file" />
                    <h1 className='flex rounded border w-full '><span className='bg-gray-300 border rounded-s p-3'>Choose File: </span><span className='ms-1 p-3 '>Upload Your Resume</span></h1>

                  </label>
                </div>
                <div className="flex justify-end gap-5 px-5 bg-gray-200 mt-3">
                  <button className='bg-red-700 p-3 mx-2 my-2 rounded text-white  hover:text-red-800 hover:bg-white  text-lg font-semibold'>clear</button>
                  <button className='bg-blue-700 p-3 my-2 mx-0 rounded text-white hover:text-blue-800 hover:bg-white text-lg font-semibold '>submit</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
      <Footer />
    </>
  )
}

export default Careers