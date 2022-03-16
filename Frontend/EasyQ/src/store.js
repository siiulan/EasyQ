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
      };
    },
    mutations: {
      instructor_SetCourselist(state,Courselist){
        state.instructor_Courselist = Courselist;     
      },

      Set_User_ID(state,USER_ID){
        state.User_ID = USER_ID;     
      }
  
    },
  
    getters:{
      instructor_see_Courselist(state){
        return state.instructor_Courselist;
      },
      Get_User_Id(state){
          return state.User_ID;
      }
    },

    actions:{
      instructor_SetCourselist(context,Courselist){
        context.commit('instructor_SetCourselist',Courselist);
      },
      Set_User_ID(context,USER_ID){
        context.commit('Set_User_ID',USER_ID);
      }
    } 
  })

  export default store