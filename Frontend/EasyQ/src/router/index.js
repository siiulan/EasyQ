import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/event/:id',
      name: 'eventSingle',
      component: () => import('../views/EventSingle.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/resetpassword/:ResetToken',
      name: 'resetpwd',
      component: () => import('../views/ResetPwd.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/Signin.vue')
    },
    {
      path: '/resetsuccess',
      name: 'resetsuccess',
      component: () => import('../views/ResetSuccess.vue')
    },
    {
      path: '/pwdlink',
      name: 'pwdlink',
      component: () => import('../views/PwdLink.vue')
    },
    {
      path: '/signuplink',
      name: 'signuplink',
      component: () => import('../views/SignupLink.vue')
    },
    {
      path: '/regconfirm',
      name: 'regconfirm',
      component: () => import('../views/RegConfirm.vue')
    },
    {
      path: '/regfail',
      name: 'regfail',
      component: () => import('../views/RegFail.vue')
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('../views/Verify.vue')
    },
    {
      path: '/instructor/main',
      name: 'instructormain',
      component: () => import('../views/Instructor/InstructorHome.vue')
    },
    {
      path: '/instructor/addClass',
      name: 'instructor_addClass',
      component: () => import('../views/Instructor/InstructoraddClass.vue')
    },
    {
      path: '/instructor/CourseDetail/:CLASSNAME',
      name: 'instructor_CourseDetail_classname',
      component: () => import('../views/Instructor/InstructorCourseDetail.vue')
    },
    {
      path: '/instructor/CourseDetail/addStudent/:CLASSID',
      name: 'instructor_CourseDetail_classname_addStudent',
      component: () => import('../views/Instructor/Instructor_addStudent.vue')
    },
    {
      path: '/instructor/CourseDetail/addTA/:CLASSID',
      name: 'instructor_CourseDetail_classname_addTA',
      component: () => import('../views/Instructor/Instructor_addTA.vue')
    },
    {
      path: '/instructor/addTASuccess',
      name: 'instructor_addTA_Success',
      component: () => import('../views/Instructor/Instructor_addTA_Success.vue')
    },
    {
      path: '/instructor/addTAVerification',
      name: 'instructor_addTA_verification',
      component: () => import('../views/Instructor/Instructor_addTA_Verification.vue')
    },
    {
      path: '/instructor/CourseDetail/Classlist/:CLASSID',
      name: 'instructor_CourseDetail_classname_classlist',
      component: () => import('../views/Instructor/InstructorClassList.vue')
    },
    {
      path: '/instructor/CourseRemove',
      name: 'instructor_CourseRemove',
      component: () => import('../views/Instructor/InstructorRemoveClass.vue')
    },
    {
      path: '/instructor/CourseAddSuccess',
      name: 'instructor_CourseAddSuccess',
      component: () => import('../views/Instructor/InstructorCourseAddSuccess.vue')
    },
    {
      path: '/StudentAddClassInfo',
      name: 'StudentAddClassInfo',
      component: () => import('../views/StudentAddClassInfo.vue')
    },
    {
      path: '/StudentOfficeHour',
      name: 'StudentOfficeHour',
      component: () => import('../views/StudentOfficeHour.vue')
    },
    {
      path: '/EventSingle',
      name: 'EventSingle',
      component: () => import('../views/EventSingle.vue')
    },
    {
      path: '/Studenthome',
      name: 'StudentHome',
      component: () => import('../views/StudentHome.vue')
    }
  ]
})
