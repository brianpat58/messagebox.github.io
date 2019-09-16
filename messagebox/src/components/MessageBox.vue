<template>
  <div class="messagebox">
    <div class="container">
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
                <button type="button" class="btn btn-success btn-sm ml-auto" @click="openTab()">view</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="card-footer d-flex justify-content-between" v-if="showButtons">
          <button type="button" class="btn btn-danger" @click="removeCompleted()">Delete</button>
          <button type="button" class="btn btn-light" @click="cancelButton()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import json from "../assets/data.json"
import { mapGetters, mapActions, mapState } from "vuex";

var filters = {
  all: function(messages) {
    return messages.messages;
  },
  projector: function(messages) {
    return messages.messages.filter(function(message) {
      return message.msg_type === "Projector";
    });
  },
  lcd: function(messages) {
    return messages.messages.filter(function(message) {
      return message.msg_type === "LCD";
    });
  }
};

export default {
  name: "App",
  data() {
    return {
      // messages: [],
      visibility: "all"
    };
  },
  mounted() {
    this.$store.dispatch('loadMessages')
    // axios
    //   .get(
    //     "https://benqyannick.github.io/F2E_candidate_code_challenge-master/data.json"
    //   )
    //   .then(response => {
    //     this.messages = response.data.messages;
    //     this.initMessages(response.data.messages);
    //   });
  },
  computed: {
    // ...mapGetters(["vuexMessages"]),
    ...mapState(['messages']),
    filteredMessages: function() {
      return filters[this.visibility](this.messages);
    },
    showButtons: function() {
      const index = this.messages.messages.findIndex(item => item.completed);
      if (index !== -1) {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions(["initMessages", "checkItem"]),
    openTab: function() {
      // console.log(this.messages);
      window.open("https://www.benq.com/zh-tw/index.html", "_blank");
    },
    removeCompleted: function() {
      const left = this.messages.messages.filter(item => item.completed === false);
      // console.log(left);
      return (this.messages.messages = left);
    },
    cancelButton: function() {
      this.messages.messages.forEach(item => {
        if (item.completed) {
          item.completed = false;
        }
      });
    },
    check: function(id) {
      this.checkItem(id);
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>