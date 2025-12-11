import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import serverURL from '../../Services/serverURL'
import { editProfileAPI } from '../../Services/allApi'
import { userProfileUpdateContent } from '../../context/ContextShare'

function EditProfile() {
    const [offCanvas, setoffCanvas] = useState(false)
    const [userDetails, setuserDetails] = useState({
        username: "",
        password: "",
        conformpassword: "",
        bio: "",
        profile: "",
        role: ""
    })
    const [token, settoken] = useState('')
    const [preview, setpreview] = useState('')
    const [existingProfile, setexistingProfile] = useState('')
    const [reload, setresload] = useState(true)
    const {setuserProfileUpdateStatus}=useContext(userProfileUpdateContent)
    console.log(existingProfile);
    console.log(userDetails);

    const handleUploadImg = (e) => {
        setuserDetails({ ...userDetails, profile: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setpreview(url)
    }

    const UpdateProfile = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const updateUserprofile = new FormData()
        try {
            const { username, password, conformpassword, bio } = userDetails
            if (!username || !password || !conformpassword || !bio) {
                alert(`please fill in all feilds`)
            }
            else {
                if (userDetails.password == userDetails.conformpassword) {
                    if (preview) {
                        for (let item in userDetails) {
                            updateUserprofile.append(item, userDetails[item])
                        }
                        const result = await editProfileAPI(updateUserprofile, reqHeader)
                        console.log(result);
                        setoffCanvas(false)
                        // setresload(!reload)
                        sessionStorage.setItem("userDetails", JSON.stringify(result.data))
                        setuserProfileUpdateStatus(result)
                        window.location.reload()
                    } else {
                        console.log(`not inside preview`);

                        const result = await editProfileAPI({ username, password, bio, profile: existingProfile }, reqHeader)
                        console.log(result);
                        setoffCanvas(false)
                        sessionStorage.setItem("userDetails", JSON.stringify(result.data))
                        setuserProfileUpdateStatus(result)
                        window.location.reload()
                    }


                } else {
                    alert(`password are not same`)
                }
            }


        } catch (error) {
            console.log(error);

        }


    }



    const reset = () => {
        const user = JSON.parse(sessionStorage.getItem("userDetails"))
        setuserDetails({
            username: user.username,
            password: user.password,
            conformpassword: user.password,
            bio: user.bio,
            role: user.role
        })

        setexistingProfile(user.profile)
        setpreview("")
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            settoken(sessionStorage.getItem("token"))

            const user = JSON.parse(sessionStorage.getItem("userDetails"))
            setuserDetails({
                username: user.username,
                password: user.password,
                conformpassword: user.password,
                bio: user.bio,
                role: user.role
            })

            setexistingProfile(user.profile)
        }


    }, [reload])

    return (
        <>
            <button onClick={() => setoffCanvas(true)} className="flex px-4 py-3 font-bold border border-blue-600 text-blue-800 hover:bg-blue-500 hover:text-white rounded-2xl"><FaRegEdit className='mt-1 me-2' /> Edit</button>

            {offCanvas &&
                <div className="">
                    <div onClick={() => setoffCanvas(false)} className="fixed inset-0 bg-gray-400/75 w-full h-full"></div>
                    <div className="bg-white h-full w-90 z-50 fixed top-0 left-0">
                        <div className="bg-black px-3 py-4 flex justify-between text-white text-2xl">
                            <h1>edit profile</h1>
                            <button onClick={() => setoffCanvas(false)}>X</button>
                        </div>
                        <div className="flex justify-center items-center flex-col my-5">
                            <label htmlFor="profile">
                                <input onChange={(e) => { handleUploadImg(e) }} id='profile' style={{ display: "none" }} type="file" />
                                {existingProfile == "" ?
                                    <img src={preview ? preview : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid&w=740&q=80"} style={{ width: "250px", height: "250px", borderRadius: "50%" }} alt="" />
                                    : <img src={preview ? preview : `${serverURL}/uploadImages/${existingProfile}`} style={{ width: "250px", height: "250px", borderRadius: "50%" }} alt="" />
                                }
                            </label>
                        </div>
                        <div className="w-full mt-3 px-5">
                            <input value={userDetails.username} onChange={(e) => { setuserDetails({ ...userDetails, username: e.target.value }) }} type="text" className='w-full border p-2 rounded' placeholder='Username' />
                        </div>
                        <div className="w-full mt-3 px-5">
                            <input value={userDetails.password} onChange={(e) => { setuserDetails({ ...userDetails, password: e.target.value }) }} type="text" className='w-full border p-2 rounded' placeholder='password' />
                        </div>
                        <div className="w-full mt-3 px-5">
                            <input value={userDetails.conformpassword} onChange={(e) => { setuserDetails({ ...userDetails, conformpassword: e.target.value }) }} type="text" className='w-full border p-2 rounded' placeholder='conform password' />
                        </div>
                        <div className="w-full mt-3 px-5">
                            <textarea value={userDetails.bio} onChange={(e) => { setuserDetails({ ...userDetails, bio: e.target.value }) }} type="textarea" className='w-full border p-2 rounded' placeholder='bio' />
                        </div>
                        <div className="flex justify-end w-full px-5 mt-3">
                            <button onClick={() => { reset() }} className='px-4 py-2 font-semibold hover:bg-white border hover:text-black bg-red-600 ms-3 rounded-xl text-white'>reset</button>
                            <button onClick={() => { UpdateProfile() }} className='px-4 py-2 font-semibold hover:bg-white border hover:text-black bg-blue-600 ms-3 rounded-xl text-white'>Update</button>
                        </div>


                    </div>
                </div>}
        </>
    )
}

export default EditProfile