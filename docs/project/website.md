---
outline: deep
---

# 网站的部署

- 选型：阿里云轻量应用服务器
- 服务：1Panel
- 应用：
  - OpenResty：运行基于VitePress的静态站
  - Dify：运行demo环境


# 安装应用

由于两个应用均需要使80和443端口，且Dify没有1Panel的官方应用，设置较为复杂，所以修改OpenResty的端口。

## OpenResty
应用商店安装，安装时设置端口访问为8081和8443。
1. 创建反向代理

```
xxx.com -> 127.0.0.1:8081
xxx.com:443 -> 127.0.0.1:8443
dify.xxx.com -> 127.0.0.1:80
dify.xxx.com:443 -> 127.0.0.18443
```

2. 创建静态网站


## Dify
由于阿里云国内环境访问github问题，所以必须使用代码部署
1. 新建文件夹 `/opt/1panel/docker/dify`
2. 1Panel容器服务配置中镜像加速新增阿里云内部加速镜像和 `https://docker.xuanyuan.me/`
3. 进入 `/opt/1panel/docker/dify/docker` ，执行：
```docker
 docker compose pull
 ```
4. 确认镜像拉取完成后，执行:
```docker
docker compose up -d
```
5. 使用ip访问

::: tip
由于大部分国内镜像站关闭了DockHub服务，所以即使使用了阿里云内部加速镜像，也有大概率拉取镜像失败，所以才建议先`compose pull`再`compose up`。
搜索后第三方的`https://docker.xuanyuan.me/`目前可用。
::: 

# 云解析

1. 添加主域名记录
```
​记录类型​：A 记录
​主机记录​：@（主域名）和 www（可选）
​记录值​：服务器公网 IP 地址
​TTL​：默认或 600 秒
```

2. ​添加子域名解析
```
添加一条 ​A 记录​：
​记录类型​：A 记录
​主机记录​：dify（子域名）
​记录值​：同一服务器公网 IP 地址
```