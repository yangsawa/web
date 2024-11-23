const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// 中间件解析 JSON 请求体
app.use(bodyParser.json());

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 处理表单提交的 POST 请求
app.post('/submit-confession', (req, res) => {
    const confessionText = req.body.confession;
    if (!confessionText) {
        return res.json({ success: false });
    }

    // 将 confession 写入日志文件
    const logFilePath = path.join(__dirname, 'logs', 'confessions.log');
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${confessionText}\n`;

    // 确保日志文件目录存在
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

    // 将 confession 追加到日志文件
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
