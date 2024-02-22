<template>
    <div>
        <h1>HOME</h1>
        <div class="">
            <NuxtImg 
            :src="images.center" 
            alt="센터 이미지" 
            format="webp" 
            width="270" 
            height="223"
            preload
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
const text:{highlight:string, text:string}[] = [
  {highlight: '코싸인 앱으로 한눈에', text: ''},
  {highlight: '', text: '실시간 코인 정보 확인하기'},
]

const images = {
  center: 'https://kr.object.ncloudstorage.com/cosign/version1/common/common-app-img.png',
  down: [
    {
      link: 'https://apps.apple.com/kr/app/%EC%BD%94%EC%8B%B8%EC%9D%B8-cosign-ai-24%EC%8B%9C%EA%B0%84-%EC%BD%94%EC%9D%B8-%EC%8B%9C%EC%9E%A5%EA%B0%90%EC%A7%80/id6444056551',
      image: 'https://kr.object.ncloudstorage.com/cosign/version1/common/app-store-down.svg'
    },
    {
      link: 'https://play.google.com/store/apps/details?id=com.lab2ai.cosign',
      image: 'https://kr.object.ncloudstorage.com/cosign/version1/common/google-play-down.png'
    },
  ]
}

</script>