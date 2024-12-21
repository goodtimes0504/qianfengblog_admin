//获取从列表页面传递过来的参数 文章 aid
// 创建一个URLSearchParams 查询参数对象，用于解析当前URL中的查询参数
const paramsObj = new URLSearchParams(window.location.search);
// console.log(window.location.search);
// ?aid=676551c83d5e3cd1f6b03c77
// 从查询参数对象中获取名为"aid"的参数值
const aid = paramsObj.get("aid");
const ipt = document.querySelector('input')

const getArticleDetails = async () => {
    try {
        const result = await http.get('/api/articles/' + aid)
        console.log(result)
        const articleData = result.data.data
        ipt.value = articleData.title
        editor.setHtml(articleData.content)

    } catch (e) {
        console.log(e)
    }
}
//修改文章点击事件
const saveBtn = document.querySelector('.save')
saveBtn.onclick = async () => {
    try {
        const result = await http.patch('/api/articles/' + aid, {
            title: ipt.value,
            content: editor.getHtml()
        })
        console.log(result)
        if (result.data.code === 200) {
            layer.msg('修改成功')
            // window.location.href = '/blog-list.html'
        } else {
            layer.msg('修改失败')
        }
    } catch (e) {
        console.log(e)
    }
}
//发布评论功能
const sendBtn = document.querySelector('.send-btn')
const sendIpt = document.querySelector('.send-ipt')
sendBtn.onclick = async () => {
    try {
        const result = await http.post('/api/comments', {
            article_id: aid,
            content: sendIpt.value
        })
        console.log(result)
        if (result.data.code === 1) {
            layer.msg('评论成功')
            sendIpt.value = ''
            getCommonsList()
            // window.location.href = '/blog-list.html'
        } else {
            layer.msg('评论失败')
        }
    } catch (e) {
        console.log(e)
    }
}
const getCommonsList = async () => {

    try {
        const result = await http.get('/api/comments/articles/' + aid)
        console.log(result)
        const divArr = result.data.data.map(item => {
            return `<div class="social-feed-box">
                      <div class="social-avatar">
                        <a href="javascript:;" class="pull-left">
                          <img alt="image" src="${baseURL + item.reply_user_id.headImgUrl}" />
                        </a>
                        <div class="media-body">
                          <a href="javascript:;"> ${item.reply_user_id.nickname} </a>
                          <small class="text-muted">${item.createdAt}</small>
                        </div>
                      </div>
                      <div class="social-body">
                        <p>${item.content}</p>
                      </div>
                      <div class="social-footer">
                        <button type="button" class="btn btn-danger del" data-id="${item._id}">
        删除</button>
                      </div>
                    </div>`
        })
        document.querySelector('.com-list').innerHTML = divArr.join('')
    }
    catch (e) {
        console.log(e)
    }

}
//删除功能
//直接给父级元素绑定事件就不用给每个子元素绑定事件了 
//原理是事件冒泡 子元素的事件会冒泡到父级元素上
const comList = document.querySelector('.com-list')
comList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('del')) {
        const id = e.target.dataset.id
        try {
            await http.delete(`/api/comments/${id}`)
            layer.msg('删除成功')
            getCommonsList()
        }
        catch (e) {
            console.log(e)
        }
    }
})

//页面加载时获取从列表页面传递过来的参数 文章 aid
getCommonsList()
getArticleDetails()