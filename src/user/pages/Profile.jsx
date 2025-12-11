import React, { useContext, useEffect, useState } from 'react'

import { MdVerified } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { addBookApi, deleteUserAddedBookAPI, getBookHistorysAPI, getOwnBooksAPI } from '../../Services/allApi'
import EditProfile from '../components/EditProfile'
import { userProfileUpdateContent } from '../../context/ContextShare'
import serverURL from '../../Services/serverURL'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'


function Profile() {
  const [tabName, setTabName] = useState('sell')
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    noofPages: "",
    imageUrl: "",
    price: "",
    dprice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadImages: []
  })
  const [preview, setpreview] = useState("")
  const [alluploadimages, setalluploadimages] = useState([])
  const [token, settoken] = useState("")
  const [username, setusername] = useState("")
  const [userAddedBooks, setuserAddedBooks] = useState([])
  const [dletebookststus, setdletebookststus] = useState(false)
  const [BooksHIstory, setBooksHIstory] = useState([])
  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
    conformpassword: "",
    bio: "",
    profile: "",
    role: ""
  })
  const { setuserProfileUpdateStatus } = useContext(userProfileUpdateContent)

  // console.log(bookDetails);
  // console.log(alluploadimages);


  const handlefile = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    const url = URL.createObjectURL(e.target.files[0])
    setpreview(url)
    let images = alluploadimages
    images.push(url)
    setalluploadimages(images)
    setBookDetails({ ...bookDetails, uploadImages: fileArray })

  }
  const handleremoveimg = (index) => {
    setalluploadimages(prev => prev.filter((_, i) => i !== index));
    setBookDetails(prev => ({
      ...prev,
      uploadImages: prev.uploadImages.filter((_, i) => i !== index)
    }));

    // If removing the main preview, update it
    if (preview === alluploadimages[index]) {
      setpreview(alluploadimages[index + 1] || "");
    }
  };

  const handleAddBook = async () => {
    const { title, author, noofPages, imageUrl, price, dprice, abstract, publisher, language, isbn, category, uploadImages } = bookDetails
    if (!title || !author || !noofPages || !imageUrl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || uploadImages.length == 0) {
      alert(`please fill in all feilds`)
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const reqBody = new FormData()

      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(img => {
            reqBody.append("uploadImages", img)
          });
        }
      }
      try {
        const result = await addBookApi(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          alert(`book added Successfully`)
          reset()

        } else if (result.status == 401) {
          alert(result.data)
        }
        else {
          alert(`error in adding book`)
        }
      } catch (error) {
        alert("something went wrong")
      }
    }
  }

  const reset = () => {
    setBookDetails(
      {
        title: "",
        author: "",
        noofPages: "",
        imageUrl: "",
        price: "",
        dprice: "",
        abstract: "",
        publisher: "",
        language: "",
        isbn: "",
        category: "",
        uploadImages: []
      }
    )
    setpreview("")
    setalluploadimages([])
  }

  const getUserAddedBooks = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const userBooks = await getOwnBooksAPI(reqHeader)
      console.log(userBooks.data);
      setuserAddedBooks(userBooks.data)

    } catch (error) {
      console.log(error);
    }
  }

  // purchase history
  const getBookHistory = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const BooksHIstory = await getBookHistorysAPI(reqHeader)
      console.log(BooksHIstory);
      setBooksHIstory(BooksHIstory.data)
    } catch (error) {
      console.log(error);

    }
  }

  // console.log(preview);
  // console.log(alluploadimages);

  const handledelete = async (id) => {
    try {
      const result = await deleteUserAddedBookAPI(id)
      console.log(result);
      if (result.status == 200) {
        alert(`deleted Successfully`)
        setdletebookststus(true)
      } else {
        alert(`not deleted `)
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }
    if (sessionStorage.getItem("userDetails")) {
      const name = JSON.parse(sessionStorage.getItem("userDetails"))
      setusername(name.username)
      console.log(username);
      setuserDetails({
        username: name.username,
        password: name.password,
        conformpassword: name.password,
        bio: name.bio,
        role: name.role,
        profile: name.profile
      })
      console.log(userDetails);

    }
    if (tabName == "status") {
      getUserAddedBooks()
    }

    if (tabName == "history") {
      getBookHistory()
    }


  }, [tabName, dletebookststus, setuserProfileUpdateStatus])

  return (
    <>
      <Header />
      <div style={{ height: '200px' }} className='bg-gray-900'>
        {userDetails.profile == "" ?
          <div className='bg-white p-3 w-[230px] h-[230px] rounded-full ml-[75px]'> {/* ml-[75px] mt-[-130px] */}
            <img className='w-[200px] h-[200px] rounded-full ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpsDK5dkH7envHCdUECqq0XzCWK1Dv96XcQ&s" alt="" />
          </div> :userDetails.profile.startsWith("https://") ?
          <div className='bg-white p-3 w-[230px] h-[230px] rounded-full ml-[75px]'> {/* ml-[75px] mt-[-130px] */}
            <img className='w-[200px] h-[200px] rounded-full ' src={`${userDetails.profile}`} alt="" />
          </div>
          :
          <div className='bg-white p-3 w-[230px] h-[230px] rounded-full ml-[75px]'> {/* ml-[75px] mt-[-130px] */}
            <img className='w-[200px] h-[200px] rounded-full ' src={`${serverURL}/uploadImages/${userDetails.profile}`} alt="" />
          </div>
        }

        <div className="md:flex justify-between px-20 mt-5">
          <div>
            <div className="flex items-center">
              <h1 className="font-bold md:text-3xl text-2xl">{username}</h1>
              <MdVerified className='text-blue-600 ms-3 text-xl' />
            </div>
            <p className='w-200 mt-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis quasi error fuga harum libero voluptas voluptatem! Tempore, quam vero autem rerum dolore quos nulla deserunt pariatur consectetur corrupti expedita rem consequatur unde incidunt dignissimos velit non aut? Veniam, voluptatem vero? Itaque minus amet ipsam repellendus delectus soluta aspernatur, nostrum ut!</p>
          </div>
          <div>
            <EditProfile />
          </div>
        </div>
      </div>
      {/* tabs */}
      <div>
        <div className="flex justify-center items-center my-8 mt-60 font-medium text-lg">
          <p onClick={() => setTabName('sell')} className={tabName == 'sell' ? "p-4 border-t-2 border-l-2 border-r-2 text-blue-600 border-gray-200 cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>Sell Book</p>
          <p onClick={() => setTabName('status')} className={tabName == 'status' ? "p-4 border-t-2 border-l-2 border-r-2 text-blue-600 border-gray-200 cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>Book Status</p>
          <p onClick={() => setTabName('history')} className={tabName == 'history' ? "p-4 border-t-2 border-l-2 border-r-2 text-blue-600 border-gray-200 cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>Purchase History</p>
        </div>
        {tabName == 'sell' &&

          <div className=' p-5 bg-gray-300 mx-20 '>
            <h1 className='text-4xl text-center'>Book Details</h1>
            <div className='md:grid grid-cols-2 gap-5 '>
              <div>
                <div className='flex flex-col px-10 py-5'>
                  <input value={bookDetails.title} onChange={(e) => { setBookDetails({ ...bookDetails, title: e.target.value }) }} type="text" placeholder='Title' className='bg-white  my-3 p-2' />
                  <input value={bookDetails.author} onChange={(e) => { setBookDetails({ ...bookDetails, author: e.target.value }) }} type="text" placeholder='Author' className='bg-white  my-3 p-2' />
                  <input value={bookDetails.noofPages} onChange={(e) => { setBookDetails({ ...bookDetails, noofPages: e.target.value }) }} type="text" placeholder='no.of page' className='bg-white  my-3 p-2' />
                  <input value={bookDetails.imageUrl} onChange={(e) => { setBookDetails({ ...bookDetails, imageUrl: e.target.value }) }} type="text" placeholder='Image id' className='bg-white  my-3 p-2' />
                  <input value={bookDetails.price} onChange={(e) => { setBookDetails({ ...bookDetails, price: e.target.value }) }} type="text" placeholder='priice' className='bg-white  my-3 p-2' />
                  <input value={bookDetails.dprice} onChange={(e) => { setBookDetails({ ...bookDetails, dprice: e.target.value }) }} type="text" placeholder='Discount price' className='bg-white  my-3 p-2' />
                  <input value={bookDetails.abstract} onChange={(e) => { setBookDetails({ ...bookDetails, abstract: e.target.value }) }} type="textarea" placeholder='Abstract' className='bg-white  my-3 py-20' />
                </div>
              </div>
              {/* secpnd column */}

              <div>
                <div className='flex flex-col px-10 py-5'>
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='bg-white  my-3 p-2 w-full' />
                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='language' className='bg-white  my-3 p-2 w-full' />
                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='bg-white  my-3 p-2 w-full' />
                  <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='bg-white  my-3 p-2 w-full' />

                  {preview ? <img src={preview} style={{ width: "200px", height: "200px" }} />
                    :
                    <div className='m'>
                      <label htmlFor="uploadfile">
                        <input onChange={(e) => handlefile(e)} type="file" name="" id="uploadfile" style={{ display: "none" }} />
                        <img src='https://cdn-icons-png.flaticon.com/512/2716/2716054.png' style={{ width: "200px", height: "200px" }} />
                      </label>
                    </div>
                  }
                  {preview &&
                    <div className='mt-10 mx-auto flex items-center gap-5'>
                      {
                        alluploadimages.map((item, index) => (
                          <>
                            <img src={item} style={{ width: "50px", height: "50px" }} />

                          </>
                        ))
                      }
                      {
                        alluploadimages.length < 3 &&
                        <label htmlFor="uploadfile">
                          <input onChange={(e) => handlefile(e)} type="file" name="" id="uploadfile" style={{ display: "none" }} />
                          <img src='https://cdn-icons-png.flaticon.com/512/2716/2716054.png' style={{ width: "50px", height: "50px" }} />
                        </label>
                      }
                    </div>
                  }


                </div>

                <div className='flex justify-end mx-10'>
                  <button type='button' onClick={reset} className='bg-red-700 p-3 m-2 rounded text-white  hover:text-red-800 hover:bg-white  text-lg font-semibold'>clear</button>
                  <button type='button' onClick={handleAddBook} className='bg-blue-700 p-3 m-2 rounded text-white hover:text-blue-800 hover:bg-white text-lg font-semibold '>submit</button>
                </div>
              </div>
            </div>
          </div>
        }
        {tabName == 'status' &&

          <div className='p-5 bg-white mx-20 my-10 '>
            {userAddedBooks?.map((item) => (
              <div key={item._id} className='p-5 bg-gray-300 mx-20 my-10'>
                <div className="md:grid grid-cols-4 gap-5">
                  <div className="col-span-3">
                    <h1 className='text-3xl my-1 font-bold'>{item.title}</h1>
                    <h1 className='text-2xl my-1'>{item.author}</h1>
                    <p>${item.price}</p>
                    <p>{item.abstract}</p>
                    <div className='flex mt-5'>
                      {item.status === 'pending' ?
                        <img width="100" height="100" src="https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="Pending" /> :
                        item.status === 'approved' ?
                          <img width="100" height="100" src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" alt="Approved" /> :
                          <img width="100" height="100" src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="Rejected" />
                      }
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <img style={{ width: '200px', height: '300px' }} src={item.imageUrl} alt={item.title} />
                  </div>
                </div>
                <div className='flex justify-end mt-5 mx-10'>
                  <button onClick={() => { handledelete(item._id) }} className='bg-red-700 p-3 m-2 rounded text-white hover:text-red-800 hover:bg-white text-lg font-semibold'>
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>

        }
        {tabName == 'history' &&

          <div className='p-5 bg-white mx-20 my-10 '>
            {BooksHIstory?.map((item) => (
              <div key={item._id} className='p-5 bg-gray-300 mx-20 my-10'>
                <div className="md:grid grid-cols-4 gap-5">
                  <div className="col-span-3">
                    <h1 className='text-3xl my-1 font-bold'>{item.title}</h1>
                    <h1 className='text-2xl my-1'>{item.author}</h1>
                    <p>${item.price}</p>
                    <p>{item.abstract}</p>

                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <img style={{ width: '200px', height: '300px' }} src={item.imageUrl} alt={item.title} />
                  </div>
                </div>

              </div>
            ))}

          </div>
        }
      </div>
      <Footer />
    </>
  )
}

export default Profile