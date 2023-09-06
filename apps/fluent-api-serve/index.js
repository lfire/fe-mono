const express = require('express');
const { Readable } = require('stream');
const Mock = require('mockjs');
const app = express();
const PORT = 3000;

class FluentAPI {
  constructor() {
    // 使用Mockjs生成连贯的中文文章
    this.data = Mock.mock({
      'article|50-100': ['@cparagraph'],
    }).article;
  }

  streamData(res) {
    const duration = Math.floor(Math.random() * 6 + 10) * 1000; // 10~15秒
    const interval = Math.ceil(Math.random() * 50 + 50); // 每100毫秒发送一次数据

    let elapsed = 0;

    const stream = new Readable({
      read() {},
    });

    let remaining = this.data.join(Math.random() > 0.4 ? '\n' : '');
    const sendData = () => {
      if (elapsed < duration && remaining.length > 0) {
        const chunk = remaining.slice(0, Math.ceil(Math.random() * 5));
        stream.push(chunk); // 发送数据
        remaining = remaining.slice(chunk.length);
        elapsed += interval;
      } else {
        clearInterval(timer);
        stream.push(null); // 结束流
      }
    };

    const timer = setInterval(sendData, interval);
    stream.pipe(res);
  }
}

app.get('/fluent', (req, res) => {
  const api = new FluentAPI();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  api.streamData(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
