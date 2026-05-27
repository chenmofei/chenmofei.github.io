---
layout: page
sidebar: false
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const me = [
  {
    avatar: '/about/chenmofei.jpg',
    name: '陈陌扉',
    title: '闲着的贤者，坐家的作家',
    links: [
      { icon: 'xiaohongshu', link: 'https://www.xiaohongshu.com/user/profile/5767ba9550c4b42d0b8146dd?xsec_token=YBLVxqBZCAdMI7Bl1pETEGLxURNs14fneF0rPi1rj-ZaY%3D' }
    ]
  }
]
const wenyan = [
  {
    avatar: '/about/zhouwenyan.jpg',
    name: '周文燕',
    title: '财富管理顾问，马拉松爱好者',
    links: [
      { icon: 'wechat', link: '' },
      { icon: 'xiaohongshu', link: '' }
    ]
  }
]
const cat = [
  {
    avatar: '/about/momo.jpg',
    name: 'momo',
    title: '13岁的社恐的奶牛猫大姐姐'
  },
  {
    avatar: '/about/luhan.jpg',
    name: '鹿晗',
    title: '😇11岁去了天堂的憨憨好大儿'
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      我的经历
    </template>
    <template #lead>
      厦门大学，厦门大学MBA<br>
      做过C2C互联网平台、ToC互联网和ToB云服务的产品，待过新能源制造业，做过5年联合创始人和10年产品经理<br>
      2023年和灵魂伴侣成了家，和两只猫一起在海边生活，正在开始一段新的职业生涯。  
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="me" />

  <VPTeamPageSection>
    <template #title>
      人生合伙人
    </template>
    <template #lead>
      华南理工大学，厦门大学MBA<br>
      广发银行、厦门银行、平安信托、陆浦投资、华夏财富<br>
      全马PB 04:17:55，半马PB 02:00:58
    </template>
    <template #members>
      <VPTeamMembers :members="wenyan" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>
      我们的猫
    </template>
    <!-- <template #lead>...</template> -->
    <template #members>
      <VPTeamMembers :members="cat" />
    </template>
  </VPTeamPageSection>

</VPTeamPage>