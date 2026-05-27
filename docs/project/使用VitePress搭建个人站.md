---
outline: deep
---
# 使用VitePress搭建个人站

[[TOC]]

## 1 选型
### 网站框架
### 服务器
个人站主要就四种方案：
1. 本地跑个服务，花生壳穿透
2. 用ECS或其他服务搭云服务器
3. 直接用Web Hosting网站托管服务
其实最早我是用花生壳的，但是免费版一直报高危访问，会员版的年费又太贵，加上为了绑定我自己的域名，还是用云服务器吧，本地机器也安全一点。

因为有自己搭过服务器，也熟悉Docker，所以选择的关键点就在于云服务哪个**便宜**。

对比了阿里云和腾讯云的价格，基本包年都要400-500，最后选了阿里云的**轻量应用服务器**，活动特价新用户首年79元，运行1Pannel镜像。

但是阿里云的Web Hosting网站托管服务（腾讯云没有）是最省心的，如果资金充裕可以首选，明年如果没有优惠活动了我应该也会迁移过来，传个文件的事情，静态站就是这么灵活。

本来想用docker部署，但是要自己处理ftp、防火墙和ssl的问题搞得我很难受，几天以后放弃了，切到了1Panel，非常好用，就是如果遇到OpenResty启动失败的话要配置一下[docker镜像加速](https://1panel.cn/docs/user_manual/containers/setting/)。

## 2 主要功能


## 3 其他组件
### vitepress-plugin-mermaid
[官方文档](https://emersonbottero.github.io/vitepress-plugin-mermaid/)
**安装**
```bash
npm i vitepress-plugin-mermaid mermaid -D
```

**配置**
```ts
// .vitepress/config.js
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(defineConfig({
    // your existing vitepress config...
    // optionally, you can pass MermaidConfig
    mermaid: {
      // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    // optionally set additional config for plugin itself with MermaidPluginConfig
    mermaidPlugin: {
      class: "mermaid my-class", // set additional css classes for parent container 
    },
}));
```

## 部署SSL证书
在轻量应用服务器上使用Docker运行Nginx镜像并安装SSL证书，可以按照以下步骤操作：

### 步骤一：部署Docker
1. **登录轻量应用服务器管理控制台**。
2. **创建服务器**：在左侧导航栏，单击**服务器**，然后单击**创建服务器**。
3. **选择Docker应用镜像**：在创建服务器页面，选择Docker应用镜像，然后按照提示完成服务器的创建。

### 步骤二：使用Docker
1. **登录轻量应用服务器**：在服务器列表中，找到通过Docker镜像创建的轻量应用服务器，单击实例ID，进入实例详情页面。
2. **远程登录服务器**：在**应用详情**页签，单击**远程登录服务器**。

### 步骤三：拉取并运行Nginx容器
1. **拉取Nginx镜像**：
   ```bash
   sudo docker pull nginx
   ```
2. **运行Nginx容器**：
   ```bash
   sudo docker run --name nginx-test01 -p 80:80 -d nginx
   ```

### 步骤四：下载SSL证书
1. **登录数字证书管理服务控制台**。
2. **选择证书管理**：在左侧导航栏，选择**证书管理** > **SSL证书管理**。
3. **下载证书**：在**SSL证书管理**页面，定位到目标证书，在**操作**列，单击**更多**，然后选择**下载**页签。选择服务器类型为Nginx，单击**下载**。
4. **解压证书文件**：解压下载的证书文件，通常包含两个文件：
   - 证书文件（PEM格式）：默认以`证书绑定域名.pem`命名。
   - 私钥文件（KEY格式）：默认以`证书绑定域名.key`命名。

### 步骤五：上传证书文件到Nginx容器
1. **创建证书目录**：
   ```bash
   sudo mkdir -p /etc/nginx/ssl
   ```
2. **上传证书文件**：将解压后的证书文件和私钥文件上传到`/etc/nginx/ssl`目录。可以使用SCP命令从本地上传：
   ```bash
   scp -r /path/to/your/certificate.pem root@<轻量应用服务器的公网IP>:/etc/nginx/ssl/
   scp -r /path/to/your/private.key root@<轻量应用服务器的公网IP>:/etc/nginx/ssl/
   ```

### 步骤六：配置Nginx以支持SSL
1. **进入Nginx容器**：
   ```bash
   sudo docker exec -it nginx-test01 /bin/bash
   ```
2. **编辑Nginx配置文件**：
   ```bash
   vi /etc/nginx/conf.d/default.conf
   ```
3. **修改配置文件**：在配置文件中添加或修改以下内容：
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;

       ssl_certificate /etc/nginx/ssl/your-certificate.pem;
       ssl_certificate_key /etc/nginx/ssl/your-private.key;

       ssl_session_cache shared:SSL:1m;
       ssl_session_timeout 5m;

       ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
       ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
       ssl_prefer_server_ciphers on;

       location / {
           root /usr/share/nginx/html;
           index index.html index.htm;
       }
   }

   server {
       listen 80;
       server_name yourdomain.com;

       return 301 https://$host$request_uri;
   }
   ```
4. **保存并退出**：按`Esc`键，输入`:wq`，然后按`Enter`键保存并退出。

### 步骤七：重启Nginx容器
1. **退出容器**：输入`exit`退出容器。
2. **重启Nginx容器**：
   ```bash
   sudo docker restart nginx-test01
   ```

### 步骤八：验证SSL证书
1. **访问网站**：在浏览器中输入`https://yourdomain.com`，检查是否显示小锁标志，表示SSL证书已成功安装。

通过以上步骤，您可以在轻量应用服务器上使用Docker运行Nginx镜像并成功安装SSL证书。 

相关链接 
Nginx或Tengine服务器配置SSL证书 步骤二：在Nginx服务器安装证书 https://help.aliyun.com/zh/ssl-certificate/user-guide/install-ssl-certificates-on-nginx-servers-or-tengine-servers
个人测试证书（免费版）快速入门 步骤三：部署证书到 Web 服务器 https://help.aliyun.com/zh/ssl-certificate/getting-started/get-started-with-free-certificates
移动开发秘籍：云上高效构建App_部署教程 配置域名解析  安装SSL证书 https://help.aliyun.com/document_detail/2693289.html
正式证书快速入门 步骤三：部署 SSL 证书  部署证书到 Web 服务器 https://help.aliyun.com/zh/ssl-certificate/getting-started/get-started-with-ssl-certificates-service
部署SSL证书至Nginx应用_部署教程 一键部署 创建SSL证书 按证书数量购买证书 https://help.aliyun.com/document_detail/2684684.html
在Nginx服务器安装RSA和SM2双算法证书 步骤三：在 Nginx 服务器配置 SSL 证书 https://help.aliyun.com/zh/ssl-certificate/user-guide/install-an-rsa-and-sm2-dual-certificate-on-an-nginx-server
部署SSL证书至Nginx应用_部署教程 下载SSL证书 https://help.aliyun.com/document_detail/2870100.html
在Nginx服务器安装RSA和SM2双算法证书（Windows） 步骤三：在Nginx服务器配置 SSL 证书 https://help.aliyun.com/zh/ssl-certificate/user-guide/install-rsa-and-sm2-dual-algorithm-certificates-on-the-nginx-server-windows
快速部署Docker 操作步骤 步骤二：使用Docker https://help.aliyun.com/zh/simple-application-server/use-cases/deploy-and-use-docker
手动部署Docker 使用Docker制作镜像 https://help.aliyun.com/zh/simple-application-server/use-cases/manually-deploy-docker
部署容器 操作步骤 https://help.aliyun.com/zh/simple-application-server/user-guide/deploy-a-container
镜像介绍 应用镜像 https://help.aliyun.com/zh/simple-application-server/product-overview/images
部署高可用架构应用集群 步骤二：创建并配置应用服务器A https://help.aliyun.com/zh/simple-application-server/use-cases/deploy-an-application-cluster-with-a-high-availability-architecture
管理防火墙 常见问题  Linux服务器 https://help.aliyun.com/zh/simple-application-server/user-guide/manage-the-firewall-of-a-server
轻量负载均衡健康检查异常排查方法 排查思路 步骤一：排查后端轻量服务器是否安装监听80端口的Web服务并放行80端口 https://help.aliyun.com/zh/simple-application-server/user-guide/troubleshoot-health-check-exceptions-of-simple-application-balancer
轻量应用服务器新上线2款应用镜像_轻量应用服务器 https://www.aliyun.com/product/news/20807
轻量应用服务器新上线7款应用镜像_轻量应用服务器 https://www.aliyun.com/product/news/20799
通过应用镜像搭建网盘 操作步骤 步骤一：搭建网盘服务器 https://help.aliyun.com/zh/simple-application-server/use-cases/build-a-nextcloud-drive-by-using-an-application-image
轻量容器服务_轻量应用服务器 https://www.aliyun.com/product/news/22012
轻量应用服务器 轻量应用服务器 应用场景 https://www.aliyun.com/product/swas
最佳实践概览 搭建环境 https://help.aliyun.com/zh/simple-application-server/use-cases/overview-1
常见问题 轻量应用服务器的镜像如何下载？ https://help.aliyun.com/zh/simple-application-server/support/faq
迁移ECS实例至轻量应用服务器 步骤三：使用scp命令拷贝网站程序 https://help.aliyun.com/zh/simple-application-server/use-cases/migrate-data-from-an-ecs-instance-to-a-simple-application-server
搭建LAMP开发环境（通过应用镜像） 步骤一：创建服务器  全新创建服务器 https://help.aliyun.com/zh/simple-application-server/use-cases/build-a-lamp-development-environment
基于CentOS系统镜像快速部署Apache服务 步骤一：创建轻量应用服务器 https://help.aliyun.com/zh/simple-application-server/getting-started/deploy-apache-based-on-a-centos-os-image
Python Flask应用程序安装SSL证书 https://help.aliyun.com/zh/ssl-certificate/user-guide/install-a-certificate-on-a-python-flask-website