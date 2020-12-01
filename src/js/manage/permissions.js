import { apiManageLogin } from '@/js/api'

let isLogin = false
let identity = null

async function checkPermission () {
    await apiManageLogin({ type: 'checklogin' }).then((res) => {
        isLogin = res.data.islogin == 1
        if (isLogin) {
            switch (res.data.user.identity) {
            case '教師':
                identity = 'teacher'
                break
            case '學生':
                identity = 'student'
                break
            case '管理者':
                identity = 'admin'
                break
            default:
                break
            }
        }
    }).catch((error) => {
        console.error(error)
    })
}

export { isLogin, identity, checkPermission }
