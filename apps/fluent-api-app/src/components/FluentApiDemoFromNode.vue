<template>
  <div id="demoBox">
    <button @click="fetchData">获取模拟数据</button>
    <textarea v-model="content" class="content"></textarea>
    <div v-if="loading">加载中...</div>
    <hr />
    <h1>请输入您的问题</h1>
    <div class="htmlBox">
      <div v-for="(item, ind) in qaList" :key="ind">
        <div v-html="item[0]"></div>
        <div v-html="item[1]"></div>
      </div>
    </div>
    <div class="chatGlm">
      <div class="chatGlm__input">
        <input v-model="qa" type="text" />
        <button :disabled="isDisable" @click="fetchChatGlm">发送</button>
      </div>
      <div class="chatGlm__output"></div>
    </div>
  </div>
</template>

<script>
// import { client } from '@gradio/client';

export default {
  name: 'FluentApiDemoFromNode',
  data() {
    return {
      content: '',
      qa: '',
      qaList: [],
      loading: false,
      ws: null,
      isDisable: false,
    };
  },
  methods: {
    scrollBottom(dom = '.content') {
      const content = this.$el.querySelector(dom);
      content.scrollTop = content.scrollHeight;
    },
    fetchData() {
      this.loading = true;
      this.content = '';
      fetch('http://localhost:3000/fluent')
        .then((response) => {
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          const processStream = (result) => {
            if (result.done) {
              this.loading = false;
              return;
            }
            this.content += decoder.decode(result.value, { stream: true });
            this.scrollBottom();
            reader.read().then(processStream);
          };
          reader.read().then(processStream);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          this.loading = false;
        });
    },
    async fetchChatGlm() {
      this.isDisable = true;
      const that = this;
      // 建立WebSocket连接
      const ws = new WebSocket('ws://9.134.231.11:1234/queue/join');

      // 当连接打开时
      ws.onopen = function () {
        console.log('WebSocket connection opened');
      };

      const sessionHash = 'dg3c5s3h7nq';
      const startData = { fn_index: 0, session_hash: sessionHash };
      // const qaData = {
      //   data: ['你好', [], 2048, 0.7, 0.95, null],
      //   event_data: null,
      //   fn_index: 0,
      //   session_hash: sessionHash,
      // };
      const qaData = {
        data: [this.qa, this.qaList, 2048, 0.7, 0.95, null],
        event_data: null,
        fn_index: 0,
        session_hash: sessionHash,
      };
      this.qa = '';
      // 当收到服务器消息时
      ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.msg === 'send_hash') {
          ws.send(JSON.stringify(startData));
        }
        if (data.msg === 'send_data') {
          ws.send(JSON.stringify(qaData));
        }
        if (data.msg === 'process_generating') {
          that.qaList = data.output.data[0];
          that.scrollBottom('.htmlBox');
        }
        if (data.msg === 'process_completed') {
          // that.qaList = data.output.data[0];
          that.scrollBottom('.htmlBox');
          that.isDisable = false;
        }
      };

      // 当连接关闭时
      ws.onclose = function () {
        console.log('WebSocket connection closed');
      };

      // 当出现错误时
      ws.onerror = function (error) {
        console.error('WebSocket Error: ' + error);
      };

      // const app = await client('http://localhost:1234/');
      // const result = await app.predict(2, []);

      // console.log(result.data);
    },
  },
};
</script>

<style>
#demoBox {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
.chatGlm,
.htmlBox {
  width: 600px;
  height: 400px;
  min-height: 400px;
  overflow: auto;
  margin: 10px auto;
  text-align: left;
}
.chatGlm .chatGlm__input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chatGlm input {
  display: block;
  height: 30px;
  line-height: 30px;
  margin: 0;
  width: 400px;
}
.chatGlm button {
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100px;
  margin: 0;
}
button {
  margin: 0 10px 20px;
  padding: 0;
  width: 200px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  border: #ccc solid 1px;
  border-radius: 4px;
}
.content {
  display: block;
  margin: 0 auto;
  width: 600px;
  height: 300px;
  overflow: auto;
  border: #ccc solid 1px;
  border-radius: 4px;
  padding: 10px;
  text-align: justify;
}
</style>
