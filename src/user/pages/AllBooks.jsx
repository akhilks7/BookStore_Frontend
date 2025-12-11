import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../Services/allApi'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'


function AllBooks() {
  const [token, settoken] = useState("")
  const [allBooks, setallBooks] = useState([])
  const [allCategory,setallCategory]=useState([])
  const [tempBooks,settempBooks]=useState([])
   const[searchkey,setsearchkey]=useState("")
  console.log(allBooks);
  console.log(searchkey);
  

  const getallbooks = async (usertocken) => {
    const reqHeader = {
      "Authorization": `Bearer ${usertocken}`
    }

    try {
      const result = await getAllBooksAPI(searchkey,reqHeader)
      setallBooks(result.data)
      settempBooks(result.data)
      // setallCategory(result.data.map(item=>item.category))

      const tempCategory=result.data.map(item=>item.category)
      setallCategory([...new Set(tempCategory)])

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(result);
  const categoryfilter=(category)=>{
    if (category=="no filter") {
      setallBooks(tempBooks)
    } else {
      setallBooks(tempBooks.filter(item=>item.category.toLowerCase()==category.toLowerCase()))
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const usertocken = sessionStorage.getItem("token")
      settoken(usertocken)
      getallbooks(usertocken)
    }


  }, [searchkey])
  return (
    <>
      <Header />
      {token? 
      <>
        <div className="flex justify-center items-center flex-col my-5">
          <h1 className='text-3xl font-bold my-5'>Collections</h1>
          <div className=" flex my-5">
            <input value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} type="text" className='p-2 border border-gray-500 text-black w-100 placeholder-gray-500' placeholder='Search by title' />
            <button type="button" className='bg-blue-900 text-white p-2 hover:bg-white hover:border hover:text-blue-900 hoevr:border-blue-900'>Search</button>
          </div>
        </div>
        <div className="md:grid grid-cols-4 md:px-20 p-5 mb-10">
          {/* filter */}
          <div className="col-span-1">
            <h1>Filters</h1>
            {allCategory.map((item,index)=>(
              <div onClick={()=>categoryfilter(item)} key={index} className="mt-5">
              <input type="radio" name="filter" id={item} />
              <label htmlFor={item}>{item}</label>
            </div>
            ))}
             
            <div onClick={()=>categoryfilter("no filter")} className="mt-5">
              <input type="radio" name="" id="filter3" />
              <label htmlFor="filter3">no Filter</label>
            </div>
          </div>
  
          {allBooks.length > 0 ?
  
            <div className="col-span-3">
              <div className="md:grid grid-cols-4 mt-5 md:mt-0 gap-10">
  
                {allBooks.map((item) => (
                  <div className='w-full h-full shadow-2xl rounded'>
                    <img className='p-2 shadow-teal-400' src={item.imageUrl} alt="" style={{ width: "250px", height: "300px" }} />
                    <div className='flex flex-col justify-center items-center mt-2'>
                      <h1>{item.title}</h1>
                      <h1>{item.author}</h1>
                      <Link to={`/view-books/${item._id}`} className='w-full p-2 bg-purple-400 text-white hover:text-purple-400 hover:bg-amber-300 text-center' >View Book</Link>
                    </div>
                  </div>
                ))}
  
              </div>
            </div>
            :
            <p>no books...</p>
            
          }
        </div>
      </>
      :
      <div className="flex justify-center items-center flex-col my-10">
            {/* <img src="https://learn.g2.com/hs-fs/hubfs/plan%20gif%20marketing%20strategy.gif?width=500&name=plan%20gif%20marketing%20strategy.gif" alt="" /> */}
            <img src="https://cdn-icons-gif.flaticon.com/6569/6569164.gif" width={"400px"} alt="" />
            <p className='text-xl mt-2 font-semibold'>please <Link className='text-blue-500 font-bold' to={"/login"}>login</Link> to explore more....</p>
          </div>
      }
      

      

      <Footer />
    </>
  )
}

export default AllBooks