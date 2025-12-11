import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSideBar'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

function AdminCareer() {
  const [JobListStatus, setJobListStatus] = useState(true)
  const [ApplicantListStatus, setApplicantListStatus] = useState(false)
  return (
    <>
    <AdminHeader/>
    <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className="p-10 col-span-4">
          <h1 className='text-3xl text-center font-semibold my-10'>Careers</h1>
          <div className='flex justify-center items-center my-8 font-medium text-lg '>
            <p onClick={() => { setJobListStatus(true), setApplicantListStatus(false) }} className={JobListStatus ?'p-4 border text-blue-700 rounded border-blue-600 cursor-pointer shadow':'p-4 border border-gray-600 cursor-pointer rounded shadow'}>job Post</p>
            <p onClick={() => { setJobListStatus(false), setApplicantListStatus(true) }} className={ApplicantListStatus ?'p-4 border text-blue-700 rounded border-blue-600 cursor-pointer shadow':'p-4 border border-gray-600 cursor-pointer rounded shadow'}>View Applicant</p>
          </div>

          {JobListStatus &&
            <div className="">
              <div className="md:flex justify-center items-center w-full my-8 md:px-20 px-5">
                <div className="md:flex w-full ms-2 md:ms-0">
                  <input type="text" placeholder='Search by title...' className="border border-gray-300 placeholder-gray-600 p-2 md:w-1/4 w-3/4" />
                  <div className='flex justify-between w-full'>
                    <button className="hover:bg-white hover:text-green-600 hover:border hover:border-green-500 bg-green-400 mt-5 md:mt-0 p-2 ms-2 cursor-pointer text-white">
                    search
                    </button>
                    <button className="hover:bg-white hover:text-blue-600 hover:border hover:border-blue-500 bg-blue-400 mt-5 md:mt-0 p-2 ms-2 w-1/4 cursor-pointer text-white justify-end">
                    Add job +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-400 p-5 shadow my-5">
                        <div className="flex mb-5">
                        <div className='w-full'>
                            <h1>Frontend developer</h1>
                            <hr />
                          
                        </div>
                        <button className='bg-red-600 text-white p-3 ms-5 flex items-center' >Remove<MdDelete className='ms-2 text-3xl'/></button>
                        </div>
                        <p>Kochi</p>
                        <p>job Type : FULL TIME</p>
                        <p>Salary : 20000 - 30000/month</p>
                        <p>Qualification : BCA </p>
                        <p>Experience : 1-2 years</p>
                        <p>DEscription: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis pariatur facilis enim dolor inventore quidem temporibus mollitia possimus voluptatem, consequuntur deserunt officia cumque dolores reprehenderit eligendi voluptatibus quasi, labore id vel? Maiores aliquam quas at dicta? Maxime ad suscipit, in reiciendis, cumque sint porro, quos quod nesciunt odio velit magni.</p>
                      </div>

                      <p className='text-3xl text-red-600 flex w-full justify-center font-bold'>no job openings</p>
            </div>
                    
            }

          {ApplicantListStatus &&
            <div className="p-10">
              <table className="w-full my-3 shadow">
                <thead>
                  <tr>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>Sl.no</th>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>job title</th>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>Name</th>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>Qualification</th>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>Email</th>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>Phone</th>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>Cover Letter</th>
                    <th className='p-3 text-center bg-blue-700 text-white border border-gray-500'>Resume</th>
                  </tr>
                </thead>
                <tbody >
                  <tr>
                    <td className='text-center p-3 border border-gray-500'>1</td>
                    <td className='text-center p-3 border border-gray-500'>Software letter</td>
                    <td className='text-center p-3 border border-gray-500'>Akhil</td>
                    <td className='text-center p-3 border border-gray-500'>BCA</td>
                    <td className='text-center p-3 border border-gray-500'>akhilksks47@gmail.com</td>
                    <td className='text-center p-3 border border-gray-500'>123456780</td>
                    <td className='text-center p-3 border border-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, exercitationem!</td>
                    <td className='text-center p-3 border border-gray-500'><Link className='text-blue-400 underline'>resume</Link></td>
                  </tr>
                </tbody>
              </table>
                                    <p className='text-3xl text-red-600 flex w-full justify-center font-bold'>no Application available</p>

            </div>
            }
        </div>

    </div>
    </>
  )
}

export default AdminCareer