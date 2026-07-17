# GOD 站点 Nginx 配置 Skill

> Nginx 多站点反向代理配置技能。触发词：nginx、反向代理、ssl、https、站点配置。

## 服务器 Nginx 信息

| 项 | 值 |
|---|---|
| 版本 | 1.24.0 |
| 配置路径 | /etc/nginx/ |
| 站点配置 | /etc/nginx/sites-available/ |
| 站点启用 | /etc/nginx/sites-enabled/ |
| SSL 证书 | /etc/nginx/ssl/ |

## 多站点架构

```
god-re.gt.tc → 主站（博客 + 首页）
├── /              → 静态首页
├── /blog/         → 博客系统
├── /challenges/   → CTF 赛题平台
├── /learn/        → 学习中心
├── /tools/        → 在线工具包
└── /api/          → 后端 API
```

## 站点配置模板

### 主站配置
```nginx
server {
    listen 80;
    server_name god-re.gt.tc;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name god-re.gt.tc;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/html;
    index index.php index.html;

    # 博客系统
    location /blog/ {
        try_files $uri $uri/ /blog/index.php?$query_string;
    }

    # CTF 赛题平台
    location /challenges/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # PHP 处理
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## Nginx 操作命令

```bash
# 测试配置语法
sudo nginx -t

# 重载配置（不中断连接）
sudo systemctl reload nginx

# 重启 Nginx
sudo systemctl restart nginx

# 查看状态
sudo systemctl status nginx

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 查看访问日志
sudo tail -f /var/log/nginx/access.log
```

## SSL 证书管理

### Let's Encrypt 自动续期
```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 申请证书
sudo certbot --nginx -d god-re.gt.tc

# 测试自动续期
sudo certbot renew --dry-run
```

### 手动证书（自签名/内部用）
```bash
# 生成自签名证书（开发用）
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/privkey.pem \
  -out /etc/nginx/ssl/fullchain.pem \
  -subj "/C=CN/ST=State/L=City/O=Organization/CN=god-re.gt.tc"
```
