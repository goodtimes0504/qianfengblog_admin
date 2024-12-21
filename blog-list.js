const username = localStorage.getItem('username')
const nickname = localStorage.getItem('nickname')
const headImgUrl = localStorage.getItem('headImgUrl')
//用户头像 用户名 昵称的显示
const headImg = document.querySelector('.social-avatar img')
headImg.src = baseURL + headImgUrl

const nicknameA = document.querySelector('.social-avatar .media-body small')
nicknameA.innerText = "昵称：" + nickname
const usernameA = document.querySelector('.social-avatar .media-body a')
usernameA.innerText = "用户名：" + username

//给发布按钮添加点击事件 点击的时候获取输入框 和富文本编辑器的值 并发送请求
const sendBtn = document.querySelector('.send')
const ipt = document.querySelector('.form-control')
sendBtn.onclick = async function () {
    const content = editor.getHtml()
    const title = ipt.value
    try {
        const res = await http.post('/api/articles', { title, content })
        console.log(res.data);
        layer.msg(res.data.msg)
        ipt.value = ''
        editor.setHtml('')
        //刷新博客列表
        getBlogList()
    } catch (err) {
        console.log(err);
    }
}

const getBlogList = async () => {
    const uid = localStorage.getItem('uid')
    try {
        const res = await http.get('/api/articles/users/' + uid)
        console.log(res.data);
        const blogArr = res.data.data
        const trArr = blogArr.map(item => {
            return `<tr class="gradeX">
                    <td><a href="#">${item.title}</a></td>
                    <td>${item.createdAt}</td>
                    <td class="center">${item.updatedAt}</td>
                    <td class="center">${item.views}</td>
                    <td class="center">${item.coms.length}</td>
                    <td class="center">
                      <button type="button" class="btn btn-danger del" data-id="${item._id}">删除</button>
                    </td>
                    <td class="center">
                      <a
                        href="blog-edit.html?aid=${item._id}"
                        type="button"
                        class="btn btn-danger"
                        >编辑</a
                      >
                    </td>
                  </tr>`
        })
        document.querySelector('tbody').innerHTML = trArr.join('')
    } catch (err) {
        console.log(err);
    }
}
//获取博客列表
getBlogList()

//删除功能
const tbody = document.querySelector('tbody')
tbody.onclick = async (e) => {
    if (e.target.classList.contains('del')) {
        const aid = e.target.dataset.id
        // console.log(id);
        const result = await http.delete('/api/articles/' + aid)
        layer.msg(result.data.msg)
        getBlogList()
    }
}