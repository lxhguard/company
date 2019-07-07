import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import CompanyAdmin from '../components/CompanyAdmin.vue'
import CompanyUser from '../components/CompanyUser.vue'
import UserManage from '../components/UserManage.vue'
import UserAdd from '../components/UserAdd.vue'
import NoticeManage from '../components/NoticeManage.vue'
import InfoCenter from '../components/InfoCenter.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/infocenter",
      name: "InfoCenter",
      component: InfoCenter
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/companyadmin',
      name:'CompanyAdmin',
      component:CompanyAdmin,
      children:[
        {
          path: '/usermanage',
          name: 'UserManage',
          components: {
              right:UserManage
          }
        },
        {
          path: '/useradd',
          name: 'UserAdd',
          components: {
              right:UserAdd
          }
        },
        {
          path: '/noticemanage',
          name: 'NoticeManage',
          components: {
              right:NoticeManage
          }
        },
      ]
    },
    {
      path: '/companyuser',
      name: 'CompanyUser',
      component: CompanyUser
    },
  ]
})
