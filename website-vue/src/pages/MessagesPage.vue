<script>
//This file is managing the datas , by sending and receiving them, for the chatService to work. 
//It also is the front fot the chat.
import io from "socket.io-client";
import ConvDivVue from "@/components/ConvDiv.vue";
import ChatDivVue from "@/components/ChatDiv.vue";

export default {
  inject: ["axios"],

  components: {
    ConvDivVue,
    ChatDivVue,
  },

  props: {
    email: String,
    token: String,
    role: String,
  },

  data() {
    return {
      firstName: "",
      socket: io("localhost:3001"),
      convList: [],
      convId: 0,
      msgData: [],
    };
  },

  methods: {
    // function to fetch all needed data from users and convGroups tables
    async start() {
      if (this.role === "ADMIN") {
        await this.axios
          .get("/people-groups/", {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            response.data.forEach((element) => {
              this.convList.push(element.name);
            });
          });
        await this.axios
          .get(`/users/${this.email}`, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            this.firstName = response.data.firstName;
          });
      } else {
        await this.axios
          .get(`/users/${this.email}`, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            this.firstName = response.data.firstName;
            this.convList.push(response.data.group.name);
          });
      }
      // creates a new empty list for each user's group
      for (let i = 0; i < this.convList.length; i += 1) {
        this.msgData.push([]);
      }
      // then fills each list with corresponding data
      await this.axios
        .get("/conv-groups/", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          for (let i = 0; i < this.convList.length; i += 1) {
            for (let j = 0; j < response.data.length; j += 1) {
              if (this.convList[i] === response.data[j].name) {
                this.msgData[i].push(response.data[j]);
              }
            }
          }
        });
    },

    // function to change messages data without asking for user's data
    async changeData() {
      this.msgData = [];
      for (let i = 0; i < this.convList.length; i += 1) {
        this.msgData.push([]);
      }
      await this.axios
        .get("/conv-groups/", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          for (let i = 0; i < this.convList.length; i += 1) {
            for (let j = 0; j < response.data.length; j += 1) {
              if (this.convList[i] === response.data[j].name) {
                this.msgData[i].push(response.data[j]);
              }
            }
          }
        });
    },
  },

  beforeMount() {
    this.start();
  },

  mounted() {
    // funtion to add a new message when socket receive 'MESSAGE' event
    this.socket.on("MESSAGE", (data) => {
      for (let i = 0; i < this.convList.length; i += 1) {
        if (this.convList[i] === data.name) {
          this.msgData[i].push(data);
        }
      }
    });

    //function to trigger a change in messages data
    this.socket.on("CHANGE", () => {
      this.changeData();
    });
  },
};
</script>

<template>
  <div class="chat-container">
    <header>
      <h1 class="title">IncluChat</h1>
    </header>
    <div>
      <h1 class="regulator">Groupes disponibles:</h1>
    </div>

    <form>
      <div id="MsgPage">
        <ConvDivVue
          id="ConvDivVue"
          :convList="convList"
          :convId="convId"
          @changeConv="(value) => (convId = value)"
        />
        <ChatDivVue
          id="ChatDivVue"
          :firstName="firstName"
          :messages="msgData[convId]"
          :socket="socket"
          :name="convList[convId]"
          :token="token"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  margin: 5px;
}

#MsgPage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  left: 0.1%;
  height: 70vh;
  width: 99.8%;
  margin: 0;
  background: #ffffff;
  border-style: solid;
  border-width: 0 1px 1px 1px;
  padding: 3px;
}

#ChatDivVue {
  height: 100%;
  min-width: 300px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: white;
}

#ConvDivVue {
  background: whitesmoke;
  height: 100%;
  min-width: max-content;
  width: 30%;
  overflow-y: auto;
  border-style: solid;
  border-width: 0 1px 0 0;
  margin-right: 50px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.title {
  text-align: center;
  font-size: 50px;
  margin: 15px;
}

.chat-container {
  max-width: 1100px;
  background: whitesmoke;
  margin: 30px auto;
  overflow: hidden;
}
</style>
