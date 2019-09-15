<template>
  <div class="messagebox">
    <div class="container">
      <!-- <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">待辦事項</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="準備要做的任務"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="addTodo">新增</button>
        </div>
      </div>-->
      <div class="card text-center">
        <div class="card-header">
          <ul class="nav nav-pills nav-fill justify-content-center">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ 'active': visibility == 'all' }"
                @click="visibility = 'all'"
                href="#"
              >ALL</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ 'active': visibility == 'projector' }"
                @click="visibility = 'projector'"
                href="#"
              >Projector</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ 'active': visibility == 'lcd' }"
                @click="visibility = 'lcd'"
                href="#"
              >LCD</a>
            </li>
          </ul>
          <!-- <v-tabs fixed-tabs>
          <v-tab v-for="n in 3" :key="n">
            Item {{ n }}
          </v-tab>
          </v-tabs>-->
        </div>
        <div class="container">
          <!-- testing -->
          <ul class="list-group list-group-flush text-left">
            <li class="list-group-item" v-for="(message,key) in filteredMessages">
              <div class="d-flex">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="message.msg_id"
                    v-model="message.completed"
                  />
                </div>
                <div class="pr-3 pl-3">
                  <img :src="message.msg_icon" width="31px" height="31px" />
                </div>
                <br />
                <label class="form-check-label" :for="message.msg_id">{{ message.msg_title }}</label>
                <button type="button" class="btn btn-success btn-sm ml-auto" @click="openTab()">
                  view
                  <!-- <span aria-hidden="true">&times;</span> -->
                </button>
              </div>
              <!-- <input type="text" class="form-control" v-if="item.id === cacheTodo.id" /> -->
            </li>
          </ul>
          <!-- testing end -->
        </div>
        <div class="card-footer d-flex justify-content-between" v-if="showButtons">
          <!-- <span>還有 3 筆任務未完成</span>
          <a href="#">清除所有任務</a>-->
          <button type="button" class="btn btn-danger" @click="removeCompleted()">Delete</button>
          <button type="button" class="btn btn-light" @click="cancelButton()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import json from "../assets/data.json"
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'

var filters = {
  all: function(messages) {
    return messages;
  },
  projector: function(messages) {
    return messages.filter(function(message) {
      return message.msg_type === "Projector";
    });
  },
  lcd: function(messages) {
    return messages.filter(function(message) {
      return message.msg_type === "LCD";
    });
  }
};

export default {
  name: "App",
  data() {
    return {
      messages: [],
      visibility: "all"
      // showTemplate: messages.completed === true || messages.completed === false,
    };
  },
  mounted() {
    axios
      .get(
        "https://benqyannick.github.io/F2E_candidate_code_challenge-master/data.json"
      )
      .then(response => {
        this.messages = response.data.messages;
        this.initMessages(response.data.messages);
      });
  },
  computed: {
    ...mapGetters(['vuexMessages']),
    filteredMessages: function() {
      return filters[this.visibility](this.messages);
    },
    filteredTodos: function() {
      if (this.visibility == "all") {
        return this.todos;
      } else if (this.visibility == "active") {
        var newTodos = [];
        this.todos.forEach(item => {
          if (!item.completed) {
            newTodos.push(item);
          }
        });
        return newTodos;
      } else if (this.visibility == "completed") {
        var doneTodos = [];
        this.todos.forEach(item => {
          if (item.completed) {
            doneTodos.push(item);
          }
        });
        return doneTodos;
      }
    },
    showButtons: function() {
      const index = this.messages.findIndex(item => item.completed)
      if(index !== -1) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions(['initMessages', 'checkItem']),
    openTab: function () {
      console.log(this.messages)
      window.open("https://www.benq.com/zh-tw/index.html", "_blank");
    },
    removeCompleted: function() {
      const left = this.messages.filter(item => item.completed === false);
      // console.log(left);
      return this.messages = left;
    },
    cancelButton: function () {
      this.messages.forEach(item => {
        if(item.completed) {
          item.completed = false;
        }
      })
    },
    check: function(id) {
      this.checkItem(id)
    }
    // addTodo: function() {
    //   var value = this.newTodo.trim(); // .trim() 表示移除空白鍵
    //   var timestamp = Math.floor(Date.now());
    //   // console.log(value, timestamp);
    //   if (!value) {
    //     return;
    //   }
    //   this.todos.push({
    //     id: timestamp,
    //     title: value,
    //     completed: false
    //   });
    //   this.newTodo = "";
    // },
    // removeTodo: function(todo) {
    //   var vm = this;
    //   var newIndex = vm.todos.findIndex(function(item, key) {
    //     return todo.id === item.id;
    //   });
    //   console.log(newIndex);
    //   this.todos.splice(newIndex, 1);
    // },
    // editTodo: function(item) {
    //   console.log(item);
    //   this.cacheTodo = item;
    //   this.cacheTitle = item.title;
    // }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>