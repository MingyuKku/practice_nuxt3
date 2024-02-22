<template>
  <main class="main">
  </main>
</template>

<script setup lang="ts">
import { testtest } from '~~/composables';


// try {
//   const data = await testtest()
//   console.log('테스트 반환', data)

// } catch(err) {

// }


function getParams(obj) {
  const params = new URLSearchParams();
  for(let key in obj) {
      params.append(key, obj[key])
  }

  return params;
}

onMounted(async () => {

  const params = {
    nickName: 123,
    eventCk: true,
  }

  const data = await $fetch('http://localhost:20002/api/user/modify/change', {
    method:'POST',
    credentials: 'include',
    body: getParams(params)
  })

  console.log('응답', data)
  // console.log('에렁', data.error)
})

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .main {
    min-height: 100vh;
  }
  
</style>