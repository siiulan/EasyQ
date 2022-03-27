import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state(){
      return {
        User_ID : "",
        instructor_Courselist : [],
        instructor_Detail_Coursename : "",
        logged_in : false,
        role : null
      };
    },
    mutations: {
      instructor_SetCourselist(state,Courselist){
        state.instructor_Courselist = Courselist;     
      },

      Set_User_ID(state,USER_ID){
        state.User_ID = USER_ID;     
      },
      Set_Login(state,login_Status){
        state.logged_in = login_Status;
      },
      Set_Role(state,role){
        state.role = role;
      } 
    },
  
    getters:{
      instructor_see_Courselist(state){
        return state.instructor_Courselist;
      },
      Get_User_Id(state){
          return state.User_ID;
      },
      Get_Log_In(state){
        return state.Logged_in;
      },
      Get_Role(state){
        return state.role;
      }
    },

    actions:{
      instructor_SetCourselist(context,Courselist){
        context.commit('instructor_SetCourselist',Courselist);
      },
      Set_User_ID(context,USER_ID){
        context.commit('Set_User_ID',USER_ID);
      },
      Set_Login(context,login_Status){
        context.commit('Set_Login',login_Status);
      },
      Set_Role(context,role){
        context.commit('Set_Role',role);
      }
    } 
  })

  export default store