# 开发日志

## 2026-07-16 — 初始会话

### 完成
1. 审查服务器环境（10.0.7.101）
   - ✅ Nginx 1.24 / PHP 8.3.6 / MySQL 8.0.46 / Python3 3.12.3
   - ❌ Docker / Node.js / npm 未装
2. GitHub Pages 仓库 `csc-dsc/try1` 审查
   - 站长主页 `index.html`
   - 关于我 `personal-instruction.html`
   - 三大教程（PWN / 汇编 / Frida Hook）
   - 初音主题页 `miku-theme.html`
3. 访问所有外链确认内容（博客园/CSDN/新博客/飞书/Zimo）
4. 写入 `D:\Desktop\网安,ctf\GOD平台开发计划书.md`（6 阶段完整计划）
5. 创建 `D:\Desktop\网安,ctf\god-site\` 项目记忆目录
   - `CONTEXT.md` — 全部已知信息固化
   - `session-log.md` — 本文件
   - `snapshots\` — 快照目录

### SSH 连接方式确认
- 密钥路径：`D:\ssh\mimocode_key`
- SSH 客户端：`D:\Git\usr\bin\ssh.exe`（Git for Windows 自带）
- 命令模板：`& "D:\Git\usr\bin\ssh.exe" -i D:\ssh\mimocode_key -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL whoami@10.0.7.101 "<command>"`
- 注意事项：PowerShell 下 `ssh` 不是原生 cmdlet，必须用完整路径调用

### 待做
- [ ] 安装 Docker + Docker Compose（apt install）
- [ ] 安装 Node.js + npm（用 nvm 或 apt）
- [ ] 安装 Git（服务器端）
- [ ] 配置 Nginx 多站点 blog.ctf.learn 子域名
- [ ] Let's Encrypt SSL
- [ ] 开始 Phase 1 博客系统开发

### 知识点固化
- 服务器上 `/var/www/mywebsite` 有现成的简易用户系统（PHP），可复用为博客基础
- Python3 3.12.3 已装，不需要再装
- 服务器负载很低（0.00），资源充足
