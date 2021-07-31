<template>
  <div id="app">
    <chat-navbar></chat-navbar>
    <br />
    <chat-chatbox :socket="socket"></chat-chatbox>
  </div>
</template>

<script>
import socketClusterClient from "socketcluster-client";
import ChatNavbar from "./components/ChatNavbar.vue";
import ChatChatbox from "./components/ChatChatbox.vue";

export default {
  name: "App",
  components: {
    ChatNavbar,
    ChatChatbox,
  },
  data() {
    return {
      socket: null,
      channel: null,
      socketUrl:  process.env.VUE_APP_SOCKET_URL || "localhost",
      socketPort: process.env.VUE_APP_SOCKET_PORT || "443",
    };
  },
  created() {
    this.connectToWebsocket();
  },
  methods: {
    connectToWebsocket() {
      this.socket = socketClusterClient.create({
        hostname: this.socketUrl,
        secure: true,
        port: this.socketPort,
        rejectUnauthorized: false
      });
    },
  },
};
</script>

<style>
html,
body,
#app,
.card {
  height: 100%;
}
</style>
