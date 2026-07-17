# GOD 综合技术平台 — 项目记忆库

> **最后更新**：2026-07-16  
> **作者**：GOD·陌  
> **当前阶段**：Phase 0 — 基础设施

---

## 一、项目核心文件

| 文件 | 路径 |
|------|------|
| 开发计划书 | `D:\Desktop\网安,ctf\GOD平台开发计划书.md` |
| 项目记忆库（本文件） | `D:\Desktop\网安,ctf\god-site\CONTEXT.md` |
| 开发日志 | `D:\Desktop\网安,ctf\god-site\session-log.md` |
| 快照目录 | `D:\Desktop\网安,ctf\god-site\snapshots\` |

---

## 二、服务器连接

### SSH 命令（Windows 环境）
```powershell
& "D:\Git\usr\bin\ssh.exe" -i D:\ssh\mimocode_key -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL whoami@10.0.7.101 "<command>"
```

### 服务器信息
| 项目 | 值 |
|------|-----|
| IP | 10.0.7.101 |
| 用户 | whoami（有 sudo） |
| 认证 | 密钥 `D:\ssh\mimocode_key` |
| SSH 客户端 | `D:\Git\usr\bin\ssh.exe`（Git for Windows 自带） |
| OS | Ubuntu 24.04, kernel 6.8.0-134, x86_64 |
| Uptime | 6 days 12h（截至 2026-07-16） |
| 负载 | ~0.00（基本空闲） |

### 已装软件
| 软件 | 版本 |
|------|------|
| Nginx | 1.24.0 ✅ |
| PHP-FPM | 8.3.6 ✅ |
| MySQL | 8.0.46 ✅ |
| Python3 | 3.12.3 ✅ |

### 网络限制（重要）
- **Windows 本机**：有代理，可访问 GitHub Pages 等外网
- **虚拟机 (10.0.7.101)**：无代理，无法直接访问外网
- **内容迁移方式**：先在 Windows 本机下载页面 → scp 上传到服务器
- **Git clone 问题**：`~/god-site` 目录已存在，需 `rm -rf ~/god-site` 后重新 clone

### 待安装
| 软件 | 原因 |
|------|------|
| Docker + Docker Compose | 赛题容器化 |
| Node.js + npm | 前端构建 |
| Git（服务器端） | 版本控制 |

---

## 三、用户指令与要求（持续追加）

### 初始需求
1. 搭建一体化技术学习与 CTF 竞赛平台（博客→CTF赛题→学习中心→工具→AI）
2. 第一阶段：博客系统（类似博客园/CSDN）+ 站长主页

### GitHub Pages 内容移植规则
- **移植**：GitHub Pages 上的所有网页内容（index.html / personal-instruction / 三大教程 / miku 主题）
- **不移植**：外链（博客园、CSDN、新博客 god-re.gt.tc、飞书知识库、Zimo's Blogs）—— 只放链接

### 项目管理规则（铁律）
1. 所有项目记忆、指令、要求、链接、SSH 连接方式等**已知信息都固化到** `D:\Desktop\网安,ctf\god-site\`，避免重复获取
2. 每次开发**第一件事**：读取此目录下所有文件，确保任务不跑偏
3. 每次开发结束写 `session-log.md` 总结
4. 本地修改前先打快照（snapshot），随时可回滚
5. 参考 `D:\Desktop\teach\安卓劫持\AGENTS.md` 的快照/回滚工作流

---

## 四、需要访问的链接

### 参考站点（站长已有）
| 站点 | URL |
|------|-----|
| 站长主页 | https://csc-dsc.github.io/try1/ |
| 关于我 | https://csc-dsc.github.io/try1/personal-instruction.html |
| PWN教程 | https://csc-dsc.github.io/try1/pwn-tutorial.html |
| 汇编教程 | https://csc-dsc.github.io/try1/assembly-tutorial.html |
| Frida Hook教程 | https://csc-dsc.github.io/try1/frida-hook-tutorial.html |
| 初音主题页 | https://csc-dsc.github.io/try1/miku-theme.html |
| GitHub | https://github.com/csc-dsc |
| GitHub Pages 仓库 | https://github.com/csc-dsc/try1 |
| 博客园 | https://www.cnblogs.com/dsc-/p |
| CSDN | https://blog.csdn.net/csc4188 |
| 新博客 | https://god-re.gt.tc/ |
| 飞书·PWN | https://pcn0uzhoxu7z.feishu.cn/wiki/CzjBwZYLmidZSukv4ZpcmO4xnpd |
| 飞书·RE | https://pcn0uzhoxu7z.feishu.cn/wiki/WTmDwHJ3Wi34ytkeuj3cyQEanYc |
| Zimo's Blogs | https://zimo.click/ |
| revers.college | 开发中，待上线 |

### 参考平台
| 平台 | 说明 |
|------|------|
| pwn.college | 赛题平台参考 |
| CTFshow | 赛题平台参考 |
| 攻防世界 | 赛题平台参考 |
| 博客园 | 博客系统参考 |
| CSDN | 博客系统参考 |

---

## 五、六阶段总览

### Phase 0 — 基础设施（当前）
安装 Docker + Docker Compose / Node.js + npm，配置 Nginx 多站点反向代理，SSL，CI/CD

### Phase 1 — 博客系统
Markdown 编辑器、分类标签、评论、站长个人页、主题切换、RSS、友情链接

### Phase 2 — 赛题平台
题目仓库、在线提交、容器化动态分发、排行榜、比赛模式、在线出题

### Phase 3 — 学习中心
三大教程平台化 + 在线 IDE + 算法评测 + 课后测验

### Phase 4 — 工具与远程服务
跨平台远控 + 在线工具包（加解密/编码转换/正则/反汇编）

### Phase 5 — AI Agent 接入
LLM 答疑（基于飞书知识库 RAG）+ 自动解题辅助 + Agent Teams

---

## 六、开发日志索引

| 日期 | 内容 | 文件 |
|------|------|------|
| 2026-07-16 | 初始审查 + 计划书编写 | `session-log.md` |

---

## 七、安全边界备忘录

- 容器隔离：用户命名空间映射，禁止 --net=host
- 资源限制：docker run --memory --cpus --pids-limit
- 超时回收：最长运行 30min，强制删除
- 镜像安全：Trivy 定期扫描
- 提交沙箱：nsjail + seccomp 白名单
- WAF：Nginx + ModSecurity
