import Vue from 'vue'
import Router from 'vue-router'
//引入login组件
import login from '../components/login/login.vue'
//引入register组件
import register from '../components/register/register.vue'
//引入forgetpassword组件
import Forgetpassword from '../components/Forgetpassword/Forgetpassword.vue'
//引入新闻列表组件
import Newslist from '../components/Newslist/Newslist.vue'
//引入新闻详情
import listdetails from '../components/listdetails/listdetails.vue'
//引入搜索结果页
import searchresult from '../components/searchresult/searchresult.vue'
//个人评论中心
import Mynews from '../components/Mynews/Mynews.vue'
import news from '../components/news/news.vue'
import comment from '../components/comment/comment.vue'
import Personalsettings from '../components/Personalsettings/Personalsettings.vue'
Vue.use(Router)
export default new Router({
    routes: [

        {
            path: '/Mynews', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            redirect: 'news'
        },
        {
            path: '/', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            redirect: 'login'
        },
        // 将foo组件注册到路由中
        {
            path: '/login', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            name: 'login', // foo路由名字
            component: login // foo路由对应的组件
        },
        {
            path: '/register', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            name: 'register', // foo路由名字
            component: register // foo路由对应的组件
        },
        {
            path: '/Forgetpassword', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            name: 'Forgetpassword', // foo路由名字
            component: Forgetpassword // foo路由对应的组件
        },
        {
            path: '/Newslist',
            name: 'Newslist',
            component: Newslist,
            // children: [
            //     { path: '/Newslist', redirect: 'leftnavigation' },

            // ]
        },
        {
            path: '/listdetails', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            name: 'listdetails', // foo路由名字
            component: listdetails // foo路由对应的组件
        },
        {
            path: '/searchresult', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            name: 'searchresult', // foo路由名字
            component: searchresult // foo路由对应的组件
        },
        {
            path: '/Mynews', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            name: 'Mynews', // foo路由名字
            component: Mynews, // foo路由对应的组件
            children: [
                { path: '/news', component: news },
                { path: '/comment', component: comment }
            ]
        },
        {
            path: '/Personalsettings', // 注册的路径，当路由匹配上/foo，会渲染component中的组件
            name: 'Personalsettings', // foo路由名字
            component: Personalsettings // foo路由对应的组件
        },
    ],
    mode: "history"
})