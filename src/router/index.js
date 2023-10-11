import Vue from 'vue'
import VueRouter from 'vue-router'
//simport Login from '../views/Login.vue'
import Login from '../views/LoginV2.vue'
import Register from '../views/Register.vue'
import Index from '../views/Home.vue'
import Approver from '../views/Approver/ApproverIndex'
import Requester from '../views/Requester/RequesterIndex'
import store from "../store/index";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/approverindex',
        name: 'Approver',
        component: Approver,
    },
    {
        path: '/requesterindex',
        name: 'Requester',
        component: Requester
    }, {
        path: "/createForm",
        component: () => import("@/views/CreateForm")
    }, {
        path: "/auditForm",
        component: () => import("@/views/AuditForm")
    }, {
        path: "/processForm",
        component: () => import("@/views/ProcessForm")
    }, {
        path: "/finishForm",
        component: () => import("@/views/FinishForm")
    }

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    let approver = ['/approverindex']
    let requester = ['/requesterindex']
    let indentity = store.getters.getIdentity;
    if (indentity != '1' && approver.includes(to.path)) {
        next('/login')
    }
    if (indentity != '2' && requester.includes(to.path)) {
        next('/login')
    }
    next()
})

export default router
