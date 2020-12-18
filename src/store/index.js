import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[],
    deletedTodos:[],
    title:"Todo",
  },
  getters:{
    getTitle:(state)=>{
      return state.title;
    },
    getTodos:(state)=>{
      return state.todos;
    },
    getTodoDeletedTodos:(state)=>{
      return state.deletedTodos;
    }
  },
  mutations: {
    addTodo:(state,todo)=>{
      state.todos.push({
        text:todo,
        isDone:false
      });
    },
    deleteTodo:(state,index)=>{
      //console.log("inside index delete");
      state.todos = state.todos.filter((Element,i)=>{
        if(i!==index) return Element
        state.deletedTodos.push(state.todos[index])
        return null
        
      });
    },

    removeTodo:(state,index)=>{
      state.deletedTodos = state.deletedTodos.filter((Element,i)=>{
        if(i!==index) return Element
        return null
      });
    },
    undoTodo:(state,index)=>{
      state.todos.push(state.deletedTodos[index]);
      state.deletedTodos = state.deletedTodos.filter((element,i)=>{
        if(i!==index) return Element
        return null
      })
    },

    changeStatus:(state,index)=>{
      state.todos = state.todos.filter((element,i)=>{
        if(i===index) return {
          text: element.text,
          isDone: !element.isDone
      }
      return element;
      })
    },
    updateTodo:(state,updatedTodo)=>{
      //console.log("in index js"+updatedTodo.updateText);
      state.todos = state.todos.map((element,i)=>{
        if(i===updatedTodo.index) return{
          text:updatedTodo.updateText,
          isDone:element.isDone
        }
        return element;
      })
    }


  },
  actions: {
    addTodo:(context,payload)=>{
      context.commit('addTodo',payload)
    },
    deleteTodo:({commit},index)=>{
      commit('deleteTodo',index);
    },
    removeTodo:({commit},index)=>{
      commit('removeTodo',index)
    },
    undoTodo:({commit},index)=>{
      commit('undoTodo',index);
    },
    changeStatus:({commit},index)=>{
      commit('changeStatus',index);
    },
    updateTodo:({commit},updatedTodo)=>{
      commit('updateTodo',updatedTodo);
    }
  },
  modules: {
  }
})
