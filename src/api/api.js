import {POST} from './index.js'

export const getUserInfo = token => POST("/user/userInfo", token)
export const getUserPages = data => POST("/user/pages", data)
export const getAllForm = data => POST("/form/getAllForm", data)
export const getAllStaff = ()=> POST("/form/getAllStaff",null)
export const formStatic = () => POST("/form/statistics", null)
export const updateForm = data =>POST("/form/updateSelfForm",data)
export const deleteForm = data =>POST("/form/deleteSelfForm",data)
export const getSelfForms = data => POST("/form/getSelfForm", data)
export const addForm = data => POST("/form/createForm", data)
export const approve = data => POST("/form/approve", data)
export const reject = data => POST("/form/reject", data)
export const performed = data => POST("/form/markAsPerformed", data)
export const completed = data => POST("/form/markAsCompleted", data)


