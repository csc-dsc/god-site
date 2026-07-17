# GOD 综合技术平台 — Agent 行为规范

> 本文件是 agent 在此项目下的硬性指令，不可跳过、不可覆盖。

---

## 强制初始化流程（每次会话第一步）

1. 读取项目根目录下 `CONTEXT.md` — 获取项目上下文、目标、阶段、服务器信息
2. 读取项目根目录下 `session-log.md` — 获取最新开发日志

不执行此步骤不得进行任何代码修改。

---

## Git 快照与回滚规则（铁律）

### 1. 快照时机
- **大量删除代码前** — 必须先 `git commit`
- **回滚操作前** — 必须先 `git commit`
- **架构重构前** — 必须先 `git commit`
- **任何不可逆操作前** — 必须先 `git commit`

### 2. 提交信息格式
```
snapshot: <简要描述操作内容>
```

### 3. Git 命令参考
```bash
# 快照
git add -A && git commit -m "snapshot: <描述>"

# 查看历史
git log --oneline -20

# 回滚到某个提交
git reset --hard <commit-hash>

# 查看当前状态
git status
```

### 4. 快照目录
项目根目录下 `snapshots/` 用于存放关键节点的完整备份（非 Git）。

---

## 网络约束（重要）

- **Windows 本机**：可访问 GitHub Pages 等外网
- **虚拟机 (10.0.7.101)**：无法直接访问外网，无代理
- **内容迁移方式**：先在 Windows 本机下载 → scp 上传到服务器

---

## 服务器连接

| 项 | 值 |
|---|---|
| IP | 10.0.7.101 |
| 用户 | whoami（有 sudo） |
| SSH 密钥 | D:\ssh\mimocode_key |
| SSH 客户端 | D:\Git\usr\bin\ssh.exe |

### SSH 命令（Windows）
```powershell
& "D:\Git\usr\bin\ssh.exe" -i D:\ssh\mimocode_key -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL whoami@10.0.7.101 "<command>"
```

### SSH 命令（Linux/macOS）
```bash
ssh -i ~/.ssh/mimocode_key whoami@10.0.7.101 "<command>"
```

---

## 项目信息速查

| 项 | 值 |
|---|---|
| 项目根 | 当前工作目录（自动检测） |
| 当前阶段 | Phase 0 — 基础设施 |
| 服务器 | 10.0.7.101 (whoami) |
| 上下文文件 | CONTEXT.md |
| 开发日志 | session-log.md |

---

## 六阶段路线图

| 阶段 | 名称 | 状态 |
|------|------|------|
| Phase 0 | 基础设施（Docker/Nginx/SSL） | 进行中 |
| Phase 1 | 博客系统 | 待开始 |
| Phase 2 | 赛题平台 | 待开始 |
| Phase 3 | 学习中心 | 待开始 |
| Phase 4 | 工具与远程服务 | 待开始 |
| Phase 5 | AI Agent 接入 | 待开始 |
