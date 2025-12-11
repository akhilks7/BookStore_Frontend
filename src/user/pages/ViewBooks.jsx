import React, { useEffect, useState } from 'react'

import { FaBackward, FaRegEye } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'

import SERVERURL from '../../Services/serverURL'
import { getSelectedBookAPI, makePaymentAPI } from '../../Services/allApi'
import Footer from '../../common/components/Footer'
import Header from '../../common/components/Header'
import { loadStripe } from '@stripe/stripe-js'

function ViewBooks() {
  const [modal, setModal] = useState(false)
  const [bookDetails, setBookDetails] = useState(null)
  const [token, settoken] = useState("")

  const { id } = useParams()

  const getABook = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = { "Authorization": `Bearer ${token}` }

    try {
      const result = await getSelectedBookAPI(id, reqHeader)
      console.log(result);

      setBookDetails(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePurchase = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const stripe = await loadStripe('pk_test_51ScgPrRrgaoh7X1VpdVAGLEgpDROZqZsNanWzU2Hr9psnzko8TuH2ZQ1Jagk4dzZgWcvNecXhO1DQhSaCIeI0SU0004TAhwiix');
    console.log(stripe);
    try {
      const result = await makePaymentAPI(bookDetails, reqHeader)
      console.log(result);
      const checkouturl = result.data.checkoutSessionUrl
      if (checkouturl) {
        window.location.href = checkouturl;
      }
    } catch (error) {
      console.log(error);

    }


  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const usertocken = sessionStorage.getItem("token")
      settoken(usertocken)
    }
    getABook()

  }, [])

  return (
    <>
      <Header />
      <div className='md:p-20 p-5'>
        <div className='shadow-2xl w-full md:p-10 p-5'>
          <div className='flex justify-end'>
            <FaRegEye onClick={() => setModal(true)} className='cursor-pointer' />
          </div>

          {bookDetails ? (
            <div className='md:grid grid-cols-[1fr_3fr] w-full'>
              <div>
                <img className='w-full h-100' src={bookDetails.imageUrl} alt={bookDetails.title} />
              </div>

              <div className='px-4'>
                <h1 className='text-center font-medium text-2xl text-red-600'>{bookDetails.title}</h1>
                <p className='text-center text-blue-500'>- {bookDetails.author}</p>

                <div className='md:flex justify-between mt-10'>
                  <p>Publisher: {bookDetails.publisher}</p>
                  <p>Language: {bookDetails.language}</p>
                  <p>No of Pages: {bookDetails.noOfPages}</p>
                </div>

                <div className='md:flex justify-between mt-10'>
                  <p>Seller Mail: {bookDetails.userMail}</p>
                  <p>Real Price: ₹ {bookDetails.price}</p>
                  <p>ISBN: {bookDetails.isbn}</p>
                </div>

                <p className='text-justify mt-10 text-gray-600'>{bookDetails.abstract}</p>

                <div className='mt-10 flex justify-end gap-4'>
                  <Link to="/all-books">
                    <button className='flex px-4 py-3 bg-blue-800 rounded text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800'>
                      <FaBackward className='me-2 mt-1' /> BACK
                    </button>
                  </Link>
                  <button onClick={() => { handlePurchase() }} className='px-4 py-3 bg-green-800 rounded text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800'>
                    BUY
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className='text-center text-red-600 font-bold mt-10'>Book details unavailable...</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className='fixed inset-0 bg-gray-500/75 z-50 flex justify-center items-center overflow-y-auto'>
          <div className='bg-white rounded-2xl md:w-[600px] w-[90%] max-h-[80vh] overflow-y-auto'>
            <div className='bg-black text-white flex justify-between items-center p-3 rounded-t-2xl'>
              <h3>Book Images</h3>
              <button onClick={() => setModal(false)}>X</button>
            </div>

            <div className='p-5'>
              <p className='text-blue-600'>{bookDetails?.title}</p>
              <p className='text-gray-600 mt-2'>Camera click of the book in the hand of seller</p>
            </div>

            <div className='md:flex flex-wrap my-4 gap-3'>
              {bookDetails?.uploadImages && bookDetails.uploadImages.length > 0 ? (
                bookDetails.uploadImages.map((img, idx) => (
                  <img
                    key={idx}
                    style={{ width: '200px', height: '300px' }}
                    className='rounded shadow-md'
                    src={`${SERVERURL}/imguploads/${img}`}
                    alt={`Book image ${idx + 1}`}
                  />
                ))
              ) : (
                <p className='ms-5 font-bold text-red-600'>User uploaded book images are unavailable.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default ViewBooks
