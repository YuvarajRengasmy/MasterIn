import CryptoJS from "crypto-js";


export const saveToken = (data) => {
  localStorage.setItem("token", data?.token);
  localStorage.setItem('loginType', CryptoJS.AES.encrypt((data?.loginType), 'masterin').toString())
  if (data?.loginType === 'master') {
    localStorage.setItem('masterId', CryptoJS.AES.encrypt((data?.masterId), 'masterin').toString())
  }
  if (data?.loginType === 'company') {
    localStorage.setItem('companyId', CryptoJS.AES.encrypt((data?.companyId), 'masterin').toString())
  }
  if (data?.loginType === 'user') {
    localStorage.setItem('userId', CryptoJS.AES.encrypt((data?.userId), 'masterin').toString())
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getMasterId = () => {
  const masterId = localStorage.getItem('masterId')
  return CryptoJS.AES.decrypt(masterId, 'masterin').toString(CryptoJS.enc.Utf8)
};

export const getUserId = () => {
  const userId = localStorage.getItem('userId')
  return CryptoJS.AES.decrypt(userId, 'masterin').toString(CryptoJS.enc.Utf8)
};

export const getCompanyId = () => {
  const companyId = localStorage.getItem('companyId')
  return CryptoJS.AES.decrypt(companyId, 'masterin').toString(CryptoJS.enc.Utf8)
};

export const getLoginType = () => {
  const loginType = localStorage.getItem('loginType')
  return CryptoJS.AES.decrypt(loginType, 'masterin').toString(CryptoJS.enc.Utf8)
};

export const clearStorage = () => {
  localStorage.clear()
};
