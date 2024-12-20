const loginForm = document.querySelector('.login-form')
const ipts = loginForm.querySelectorAll('input')
loginForm.onsubmit = (e) => {
    e.preventDefault()
    const username = ipts[0].value
    const password = ipts[1].value
    const loginAPI = '/api/users'
    // 固定写法 如果是用params传参，需要用{params: {}}的形式来传参
    //这样写url会变成/api/users?username=xxx&password=xxx的形式
    http.get(loginAPI, { params: { username, password } }).then(res => {
        if (res.data.code === 200) {
            layer.msg('登录成功')
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('username', username)
            localStorage.setItem('nickname', res.data.data.nickname)
            localStorage.setItem('headImgUrl', res.data.data.headImgUrl)
            localStorage.setItem('uid', res.data.data.uid)
            setTimeout(() => {
                location.href = './blog-list.html'
            }, 1000)
        } else {
            layer.msg(res.data.message)
        }
    })

}