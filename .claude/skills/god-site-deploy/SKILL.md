# GOD 站点部署 Skill

> 服务器部署与运维专用技能。触发词：deploy、部署、上线、push to server、docker up。

## 服务器信息

| 项 | 值 |
|---|---|
| IP | 10.0.7.101 |
| 用户 | whoami（有 sudo） |
| SSH 密钥 | D:\ssh\mimocode_key |
| SSH 客户端 | D:\Git\usr\bin\ssh.exe |

## SSH 命令模板（Windows）

```powershell
# 执行远程命令
& "D:\Git\usr\bin\ssh.exe" -i D:\ssh\mimocode_key -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL whoami@10.0.7.101 "<command>"

# 上传文件
scp -i D:\ssh\mimocode_key -o StrictHostKeyChecking=no -o UserKnownHostsFile=NUL "<local_path>" whoami@10.0.7.101:"<remote_path>"
```

## 部署流程

### 1. 代码推送（本地 → GitHub → 服务器）
```powershell
# 本地提交
git add -A && git commit -m "feat: <描述>" && git push origin master

# 服务器拉取
ssh ... "cd ~/god-site && git pull origin master"
```

### 2. 服务器环境检查
```powershell
ssh ... "docker --version && docker compose version && nginx -v && php -v && mysql --version"
```

### 3. Docker 服务管理
```powershell
# 启动所有服务
ssh ... "cd ~/god-site && docker compose up -d"

# 查看状态
ssh ... "cd ~/god-site && docker compose ps"

# 查看日志
ssh ... "cd ~/god-site && docker compose logs -f --tail=50"

# 重启单个服务
ssh ... "cd ~/god-site && docker compose restart <service>"
```

### 4. Nginx 配置
```bash
# 测试配置
sudo nginx -t

# 重载配置
sudo systemctl reload nginx

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
```

## 安全注意事项

- **永远不要**在日志或代码中暴露 SSH 密钥路径以外的敏感信息
- Docker 容器必须启用用户命名空间映射
- 禁止 `--net=host`，使用自定义网络
- 容器必须设置 `--memory`、`--cpus`、`--pids-limit` 资源限制
- 动态分发的赛题容器最长运行 30min，到期强制删除
