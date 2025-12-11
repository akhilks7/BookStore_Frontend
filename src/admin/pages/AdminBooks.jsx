import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSideBar'
import { getAllAdminBooksAPI, getAlladminUsersAPI, updateAdminbookStatusAPI } from '../../Services/allApi'
import { useEffect } from 'react'
import serverURL from '../../Services/serverURL'

function AdminBooks() {

  const [bookListStatus, setBookListStatus] = useState(true)
  const [UserListStatus, setUserListStatus] = useState(false)
  const [token, settoken] = useState("")
  const [bookDetails, setBookDetails] = useState([])
  const [userlist, setuserlist] = useState([])

  const getallAdminbooks = async () => {
    try {
      const result = await getAllAdminBooksAPI()
      console.log(result.data);

      setBookDetails(result.data)
    } catch (error) {
      console.log(error);

    }

  }
  const getallUsers = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    console.log(token);

    try {
      const result = await getAlladminUsersAPI(reqHeader)
      console.log(result);
      setuserlist(result.data)
      // console.log(userlist);

    } catch (error) {
      console.log(error);

    }
  }
  const approvebookstatus = async (id) => {
    try {
      const result = await updateAdminbookStatusAPI(id)
      // console.log(result);
      if (result.status == 200) {
        alert(`status aupdated succcessfully`)
        getallAdminbooks()
      } else {
        alert(`not approved`)
        getallAdminbooks()
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }
    getallUsers()
    getallAdminbooks()
  }, [UserListStatus, bookListStatus, token])

  //  useEffect(() => {
  //   if (token) {
  //     getallUsers()
  //   getallAdminbooks()
  //   }

  // }, [token])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className="p-10 col-span-4">
          <h1 className='text-3xl text-center font-semibold my-10'>All Books</h1>
          <div className='flex justify-center items-center my-8 font-medium text-lg '>
            <p onClick={() => { setBookListStatus(true), setUserListStatus(false) }} className={bookListStatus ? 'p-4 border text-blue-700 rounded border-blue-600 cursor-pointer shadow' : 'p-4 border border-gray-600 cursor-pointer rounded shadow'}>All Books</p>
            <p onClick={() => { setBookListStatus(false), setUserListStatus(true) }} className={UserListStatus ? 'p-4 border text-blue-700 rounded border-blue-600 cursor-pointer shadow' : 'p-4 border border-gray-600 cursor-pointer rounded shadow'}>Userrs</p>
          </div>


          {bookListStatus &&
            <div className="md:grid grid-cols-4 w-full my-5">
              {bookDetails?.map((book, index) => (
                <div key={index} className="shadow rounded p-3 m-4">
                  <img src={book.imageUrl} width={"100%"} height={"300px"} alt="" />
                  <div className='flex flex-col justify-center items-center mt-4'>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.price}</p>
                    {book.status !== "approved" ? (
                      <button
                        onClick={() => approvebookstatus(book._id)}
                        className='bg-green-500 p-3 rounded w-full mt-2 text-white hover:text-green-600 hover:bg-white hover:border'
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        disabled
                        className='bg-gray-400 p-3 rounded w-full mt-2 text-white cursor-not-allowed'
                      >
                        Approved
                      </button>
                    )}

                  </div>
                </div>
              ))}

            </div>
          }

          {UserListStatus &&
            <div className="w-full md:grid grid-cols-3 my-5">
              {userlist.map((user, index) => (
                <div key={index} className="shadow rounded bg-gray-200 p-3 m-2">
                  <p className="text-red-600 font-bold">ID : {user._id}</p>
                  <div className="flex items-center mt-3">
                    {user.profile ?
                      <img src={`${serverURL}/uploadImages/${user.profile}`} width={"80px"} height={"80px"} style={{ borderRadius: "50%" }} alt="" />
                      : <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" width={"80px"} height={"80px"} style={{ borderRadius: "50%" }} alt="" />
                    }
                    <div className="flex flex-col w-full ml-3">
                      <p className='text-blue-600 text-2xl font-bold'>{user.username}</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          }

        </div>

      </div>
    </>
  )
}

export default AdminBooks