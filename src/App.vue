<template>
  <div id="app">
    <navbar></navbar>
    <br />
    <stock :socket="socket"></stock>
  </div>
</template>

<script>
import socketClusterClient from "socketcluster-client";
import Navbar from "./components/Navbar";
import Stock from "./components/Stock";

export default {
  name: "App",
  components: {
    Navbar,
    Stock,
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
