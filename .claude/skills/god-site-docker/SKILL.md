# GOD 站点 Docker 编排 Skill

> Docker Compose 管理与 CTF 赛题容器化技能。触发词：docker、compose、container、容器、赛题容器。

## 项目 Docker 架构

GOD 平台使用 Docker Compose 编排以下服务：

| 服务 | 镜像 | 端口 | 用途 |
|------|------|------|------|
| nginx | nginx:1.24 | 80, 443 | 反向代理 + 静态文件 |
| php | php:8.3-fpm | 9000 | PHP 后端 |
| mysql | mysql:8.0 | 3306 | 数据库 |
| node | node:20-alpine | 3000 | 前端构建/开发 |
| redis | redis:7-alpine | 6379 | 缓存/会话 |

## Docker Compose 模板

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:1.24-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./www:/var/www/html
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - php
    networks:
      - god-net
    restart: unless-stopped

  php:
    build:
      context: ./php
      dockerfile: Dockerfile
    volumes:
      - ./www:/var/www/html
    depends_on:
      - mysql
      - redis
    networks:
      - god-net
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/mysql_root_password
      MYSQL_DATABASE: god_site
    volumes:
      - mysql-data:/var/lib/mysql
    secrets:
      - mysql_root_password
    networks:
      - god-net
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    networks:
      - god-net
    restart: unless-stopped

  node:
    image: node:20-alpine
    working_dir: /app
    volumes:
      - ./frontend:/app
    command: npm run dev
    networks:
      - god-net

networks:
  god-net:
    driver: bridge

volumes:
  mysql-data:

secrets:
  mysql_root_password:
    file: ./secrets/mysql_root_password.txt
```

## CTF 赛题容器规范

### 容器化题目要求
1. **隔离**：每题独立容器，不共享网络
2. **资源限制**：
   ```
   --memory=256m --cpus=0.5 --pids-limit=50
   ```
3. **超时回收**：30 分钟自动销毁
4. **用户映射**：`--userns-remap` 启用用户命名空间
5. **只读根文件系统**：`--read-only` + tmpfs 挂载

### 动态题目模板
```yaml
services:
  challenge:
    image: ctf/challenge-name
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: '0.5'
    read_only: true
    tmpfs:
      - /tmp:size=64M
    networks:
      - challenge-net
    restart: "no"
```

## 常用命令

```bash
# 构建所有镜像
docker compose build

# 后台启动
docker compose up -d

# 查看运行容器
docker compose ps

# 进入容器调试
docker compose exec php bash

# 清理无用镜像
docker image prune -f

# 查看磁盘占用
docker system df
```
