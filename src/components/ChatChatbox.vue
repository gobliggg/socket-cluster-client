<template>
  <b-container>
    <div class="chatbox">
      <table border="1">
        <thead>
        <tr>
          <th>Symbol</th>
          <th width="5%">Low</th>
          <th width="5%">High</th>
          <th width="5%">Ask</th>
          <th width="5%">Direction</th>
        </tr>
        </thead>
        <tbody>
        <tr class="stock" v-for="(data, inx) in stocks" :key="inx" v-bind:id="`stock-${data.name}`">
          <td>{{ data.name }}</td>
          <td style="text-align: right" class="low">{{ data.low || 0 }}</td>
          <td style="text-align: right" class="high">{{ data.high || 0 }}</td>
          <td style="text-align: right" class="ask">{{ data.ask || 0 }}</td>
          <td style="text-align: right" class="direction">{{ data.direction || 0 }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-container>
</template>

<script>
import $ from 'jquery'

export default {
  props: ["socket"],
  created() {
    this.socket.transmitPublish('message', 'This is a message');

    this.axios.get(this.serverUrl + "/api/v1/symbols").then((result) => {
      this.stocks = result.data.data;
    })
  },
  data() {
    return {
      stocks: [],
      serverUrl: process.env.VUE_APP_MARKET_API_URL,
    };
  },
  mounted() {
    if (this.channel) {
      (async () => {

        for await (let data of this.channel) {
          if (data) {
            $("#stock-" + data.symbol + " .low").html(data.low)
            $("#stock-" + data.symbol + " .high").html(data.high)
            $("#stock-" + data.symbol + " .ask").html(data.ask)
            $("#stock-" + data.symbol + " .direction").html(data.direction)
          }
        }
      })();
    }
  },
};
</script>

<style scoped>
.chatbox {
  padding: 0;
  height: calc(100% - 35px);
  overflow-y: auto;
}

.stock {
  background-color: lightblue;
  padding: 5px;
}
</style>
