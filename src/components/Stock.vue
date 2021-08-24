<template>
  <b-container>
    <div class="chatbox">
      <table border="1">
        <thead>
        <tr>
          <th>Symbol</th>
          <th width="9%">Low</th>
          <th width="9%">High</th>
          <th width="9%">Ask</th>
          <th width="9%">Bid</th>
          <th width="9%">Direction</th>
          <th width="15%">Created At</th>
          <th width="15%">Received At</th>
          <th width="9%">Execution Time</th>
        </tr>
        </thead>
        <tbody>
        <tr class="stock" v-for="(data, inx) in stocks" :key="inx" v-bind:id="`stock-${data.name}`">
          <td>{{ data.name }}</td>
          <td style="text-align: right" class="low">{{ data.low || 0 }}</td>
          <td style="text-align: right" class="high">{{ data.high || 0 }}</td>
          <td style="text-align: right" class="ask">{{ data.ask || 0 }}</td>
          <td style="text-align: right" class="bid">{{ data.bid || 0 }}</td>
          <td style="text-align: right" class="direction">{{ data.direction || 0 }}</td>
          <td style="text-align: right" class="created_at">{{ data.created_at || 0 }}</td>
          <td style="text-align: right" class="received_at">{{ data.received_at || 0 }}</td>
          <td style="text-align: right" class="execution_time">{{ data.execution_time || 0 }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-container>
</template>

<script>
import $ from 'jquery'
import moment from 'moment';

export default {
  props: ["socket"],
  created() {
    this.channel = this.socket.channel('message');
    this.channel.subscribe();

    this.axios.get(this.serverUrl + "/api/v1/symbols").then((result) => {
      this.stocks = result.data.data;
    })
  },
  data() {
    return {
      stocks: [],
      serverUrl: process.env.VUE_APP_API_URL,
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
            $("#stock-" + data.symbol + " .bid").html(data.bid)
            $("#stock-" + data.symbol + " .direction").html(data.direction)
            $("#stock-" + data.symbol + " .created_at").html(moment(data.created_at).format('HH:mm:ss.SSS'))
            $("#stock-" + data.symbol + " .received_at").html(moment().format('HH:mm:ss.SSS'))
            $("#stock-" + data.symbol + " .execution_time").html(moment().valueOf() - moment(data.created_at).unix())
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
