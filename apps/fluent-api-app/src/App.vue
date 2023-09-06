<template>
  <div id="app">
    <button @click="fetchData">获取数据</button>
    <textarea v-model="content" class="content"></textarea>
    <div v-if="loading">加载中...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      loading: false,
    };
  },
  methods: {
    scrollBottom() {
      const content = this.$el.querySelector('.content');
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
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
button {
  margin: 0 0 20px 0;
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
