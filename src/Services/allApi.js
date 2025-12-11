

import commonAPI from "./commonAPI"
import serverURL from "./serverURL"
// import SERVERURL from "./serverURL"

//register
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/register`, reqBody)
}
//login

export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/login`, reqBody)
}

//google-login

export const googleloginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/google-login`, reqBody)
}
// get home book

export const getHomeBookAPI = async () => {
    return await commonAPI("GET", `${serverURL}/home-books`,)
}

// --------------- user ----------------

// add book
export const addBookApi = async (reqBody, reqheader) => {
    return await commonAPI("POST", `${serverURL}/add-book`, reqBody, reqheader)
}

// get all books
export const getAllBooksAPI = async (searchkey, reqheader) => {
    return await commonAPI("GET", `${serverURL}/all-books?search=${searchkey}`, {}, reqheader)
}

// get selected books
export const getSelectedBookAPI = async (id, reqheader) => {
    return await commonAPI("GET", `${serverURL}/view-books/${id}`, {}, reqheader)
}

// get own books
export const getOwnBooksAPI = async (reqheader) => {
    return await commonAPI("GET", `${serverURL}/own-books`, {}, reqheader)
}

// delete added book
export const deleteUserAddedBookAPI = async (id) => {
    return await commonAPI("delete", `${serverURL}/delete-book/${id}`)
}

// grt previous book history
export const getBookHistorysAPI = async (reqheader) => {
    return await commonAPI("get", `${serverURL}/history-books`, {}, reqheader)
}

// updating user profile
export const editProfileAPI = async (reqbody, reqheader) => {
    return await commonAPI("put", `${serverURL}/update-userprofile`, reqbody, reqheader)
}

// user make payment
export const makePaymentAPI = async (reqbody, reqheader) => {
    return await commonAPI("put", `${serverURL}/make-payment`, reqbody, reqheader)
}

// ---------------admin--------------------

// get all books
export const getAllAdminBooksAPI = async () => {
    return await commonAPI("GET", `${serverURL}/all-adminbooks`)
}

// update admin book
export const updateAdminbookStatusAPI = async (id) => {
    return await commonAPI("put", `${serverURL}/update-book/${id}`)
}

// get all admin books
export const getAlladminUsersAPI =async(reqheader)=>{
    return await commonAPI("get",`${serverURL}/all-Adminusers`,{},reqheader)
}

// update the admin profile

export const updateadminprofileAPI=async(reqbody,reqheader)=>{
    return await commonAPI("put",`${serverURL}/update-settings`,reqbody,reqheader)
}