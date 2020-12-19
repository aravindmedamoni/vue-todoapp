<template>
  <div>
    <div class="home">
    <h3>Hii welcome to vue js Todo app</h3>
    <input type="text" name="todo" class="todoInput" placeholder="Enter Your todo here">
    <button class="addTodo" @click="addTodo">Add Todo</button>
    </div>

    <div class="todoDiv">
      <transition name="slide-up">
      <div v-if="getTodos.length>0" :class= "pendivClsName">
        <h1>Pending Todo's</h1>
        <transition-group name="slide-up" tag="div" appear>
       <div v-for="(todo,index) in getTodos" :key="index" class="todoItemDiv">
        <input type="checkbox" class="chbox" v-model="todo.isDone">
        <input type="text" name="updateText" :class='todo.isDone?"deletedtodoText todoText":"todoText"' @keyup.enter="updateTodo(index)" v-model="todo.text">
        <button @click='deleteTodo(index)' class="dltButton">delete</button>
       </div>
         </transition-group>
      </div>
      </transition>
      <transition name="slide-up">
      <div  v-if="getTodoDeletedTodos.length>0" :class= "delDivClsName" class="deletedTodoDiv">
         <h1>Deleted Todo's</h1>
         <transition-group name="slide-up" appear>
         <div v-for="(todo,index) in getTodoDeletedTodos" :key="index" class="todoItemDiv">
           <input type="checkbox" class="chbox" disabled v-model="todo.isDone">
           <input disabled type="text" :value="todo.text" :class='todo.isDone?"deletedtodoText todoText":"todoText"'>
           <button @click="undoTodo(index)"  class="undoButton">Undo</button>
           <button @click="removeTodo(index)"  class="dltButton">Bin It</button>
         </div>
         </transition-group>
      </div>
      </transition>
    </div>
  

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    
  },
  data:function(){
    return{
      updatedText:''
    }
  },
  computed:{
   pendivClsName:function(){
     //console.log(this.$store.state.todos.length> 0 ? 'todoListDiv':'todoListDivM');
      return this.$store.state.todos.length>0 && this.$store.state.deletedTodos.length==0 ? 'todoListDivM':'todoListDiv';
    },
    delDivClsName:function(){
     //console.log(this.$store.state.deletedTodos.length> 0 ? 'todoListDiv':'todoListDivM');
      return this.$store.state.todos.length==0 && this.$store.state.deletedTodos.length>0 ? 'todoListDivM':'todoListDiv';
    },
    getTodos:function(){
      let todos=this.$store.getters.getTodos;
      return todos;
    },
    getTodoDeletedTodos:function(){
      return this.$store.getters.getTodoDeletedTodos;
    }
  },
  methods:{
    
    addTodo:function(){
      let todoName = document.getElementsByName('todo')[0].value;
      document.getElementsByName('todo')[0].value='';
      
     // console.log("Enter todo is: "+todoName);
      this.$store.dispatch('addTodo',todoName);
    },
    deleteTodo:function(index){
     // console.log("delete called"+index);
      this.$store.dispatch('deleteTodo',index);
    },
    removeTodo:function(index){
      this.$store.dispatch('removeTodo',index);
    },
    undoTodo:function(index){
      this.$store.dispatch('undoTodo',index);
    },
    // changeStatus:function(index){
    //   console.log("checked box");
    //   this.$store.dispatch('changeStatus',index)
    // },
    updateTodo:function(index){
      //console.log(`updated Text: ${this.updatedText}`);
      let updateText = document.getElementsByName('updateText')[index].value;
      //console.log(`Update to called at: ${index} and value is: ${updateText}`);
      this.$store.dispatch('updateTodo',{updateText,index});
    }

  }


}
</script>


<style scoped>
/* 
-----------------------------------------------------
              Animations Style start
-----------------------------------------------------
 */
.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}
.slide-up-enter-active {
  transition: all 1s ease;
}

.slide-up-move {
  transition: transform 0.5s ease-out;
}
/* 
-----------------------------------------------------
              Animations Style end
-----------------------------------------------------
 */
    .addTodo{
    padding: 15px;
    margin: 0 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: rgb(80, 165, 165);
    border: none;
    outline: none;
    border-radius: 10px;
    height: 50px;
}
.todoInput{
    padding: 15px;
    margin-left: 20px;
    width: 40%;
    outline: none;
    font-size: 20px;
    border-radius: 10px;
}





/*
----------------------------------
    display todo Item styles
----------------------------------
  */
  .todoListDiv{
  background-color: rgb(192, 192, 235);
  width: 80%;
  margin: 20px 10px;
  border-radius: 14px;
}
.todoListDivM{
   background-color:  rgb(192, 192, 235);
  width: 80%;
  margin: 20px auto;
  border-radius: 14px;
}
.deletedTodoDiv{
  background: rgb(238, 177, 142);
}
  .todoDiv{
    display: flex;
    margin: 0 10px;
    padding: 0 10px;
  }
.dltButton{
    padding: 8px 4px;
    margin: 0 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: rgb(207, 78, 39);
    border: none;
    outline: none;
    border-radius: 10px;
    height: 50px;
    flex: 1;
}
.undoButton{
    padding: 8px 15px;
    margin: 0 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: rgb(142, 197, 142);
    border: none;
    outline: none;
    border-radius: 10px;
    height: 50px;
    flex: 1;
}
.todoItemDiv{
  display: flex;
  padding: 6px 0;
  margin: 8px auto 8px auto;
  flex-direction: row;
}
.chbox{
    width: 25px;
    height: 25px;
    padding: 12px;
    margin: auto 20px;
    flex: 1;
}
.todoText{
  background: transparent;
  outline: none;
  border: none;
  flex:2;
  font-size: 20px;
  padding: 16px 0;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 500;
  margin: 0;
}
.deletedtodoText{
  text-decoration: line-through;
}

</style>
