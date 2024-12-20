const formIpts = document.querySelectorAll(".form-control");
// console.log(formIpts);
// 头像上传
let headImgUrl = '';
formIpts[3].onchange = () => {
    const file = formIpts[3].files[0];
    // console.log(file);
    const uploadAPI = '/api/upload'
    const formData = new FormData();
    // 后端需要接收的字段名 
    // const upload = multer({
    //     storage: storage
    // }).single('img')
    // 后端叫啥 这里就得叫啥 不然就报错 还不好找
    formData.append('img', file);
    http.post(uploadAPI, formData).then(res => {
        // console.log(res)
        headImgUrl = res.data.data
        console.log(headImgUrl);
    })
}
//注册
let regForm = document.querySelector(".reg-form");
regForm.onsubmit = (event) => {
    //阻止刷新页面
    event.preventDefault();
    const username = formIpts[0].value;
    const nickname = formIpts[1].value;
    const password = formIpts[2].value;
    const registerAPI = '/api/users'
    http.post(registerAPI, { username, password, nickname, headImgUrl }).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
            layer.msg('注册成功')
            setTimeout(() => {
                location.href = '/login.html'
            }, 1000)
        } else {
            layer.msg(res.data.message)
        }
    })

}