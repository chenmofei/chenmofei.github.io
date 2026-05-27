import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "闲着的贤者的大图书馆",
  description: "兴趣的资料库，炼金的实验台",
  head: [['link', { rel: 'icon', href: '/home/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/home/logo.png',
    //导航栏
    nav: [ 
      { text: 'Home', link: '/' },
      { text: 'Project', link: '/project/基于Inky制作交互式小说' },
      { text: 'Interest', link: '/interest/系列动漫观看顺序.md' },
      { text: 'Invest', link: '/invest/文燕的市场月度简评' },
      { text: 'Life', link: '/life/旅游' },
      // { text: '规划', link: '/plan' },
      { text: 'About', link: '/about' }
    ],
    //社交链接
    socialLinks: [
      { icon: 'xiaohongshu', link: 'https://www.xiaohongshu.com/user/profile/5767ba9550c4b42d0b8146dd?xsec_token=YBLVxqBZCAdMI7Bl1pETEGLxURNs14fneF0rPi1rj-ZaY%3D' }
    ],
    //页脚
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present Mofei Chen'
    },
    // 侧边栏
    sidebar: {
      '/invest/':[
        { text: '文燕的市场月度简评', link: '/invest/文燕的市场月度简评'},
        { text: '年度回顾', link: '/invest/文燕的年度回顾' },
        { text: '宏观经济', link: '/invest/宏观经济' }
      ],
      '/interest/':[
        {
          text: '小项目',
          collapsed: false,
          items: [
            { text: '使用VitePress搭建个人站', link: '/interest/使用VitePress搭建个人站'},
            { text: '基于Inky制作交互式小说', link: '/interest/基于Inky制作交互式小说'},
            { text: '搭建家庭服务器媒体服务器', link: '/interest/' }
          ]
        },
        {
          text: 'ACG',
          collapsed: false,
          items: [
            { text: '系列动漫观看顺序', link: '/interest/系列动漫观看顺序'}
          ]
        }
      ]                                              
    },
  }
})
