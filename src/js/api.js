import axios from 'axios'

const userRequest = axios.create({
    baseURL: '../php',
})

export const apiTest = (data) => userRequest.get('/test.php', { params: data })
export const apiManageEnviroment = (data) => userRequest.get('/enviroment.php', { params: data })
export const apiManageObject = (data) => userRequest.get('/object.php', { params: data })
export const apiManageAudio = (data) => userRequest.get('/audio.php', { params: data })
export const apiPostAudio = (file, data) => userRequest.post('/audio.php', file, { params: data })
export const apiManageExcel = (file, data, loader) =>
    userRequest.post('/excel.php', file, {
        params: data,
        onUploadProgress: loader,
    })
export const apiGetFolderFileList = (data) => userRequest.get('/dir.php', { params: data })
export const apiManageLogin = (data) => userRequest.get('/login.php', { params: data })
export const apiManageRegister = (data) => userRequest.get('/register.php', { params: data })
export const apiManageRoleClothes = (data) => userRequest.get('/role-clothes.php', { params: data })
export const apiManageUser = (data) => userRequest.get('/user.php', { params: data })
export const apiManageRoleData = (data) => userRequest.get('/roleData.php', { params: data })

export const apiManageFile = (file, data, loader) =>
    userRequest.post('/files.php', file, {
        params: data,
        onUploadProgress: loader,
    })
