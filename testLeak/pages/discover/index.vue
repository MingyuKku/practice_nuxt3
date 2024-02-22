<template>
  <div>
    <h1>디스커버 페이지</h1>
    {{ testVal }}
    <button @click="testClick">테스트 클릭</button>
  </div>
</template>


<script setup lang="ts">

const testVal = ref<any>('안뇽')

function testClick() {
  setTimeout(() => {
    // if(testVal.value === '안뇽') {
    //   testVal.value = null;
    //   testVal.value = '반갑다'
    // } else {
    //   testVal.value = null;
    //   testVal.value = '안뇽'
    // }
  })
  
}


</script>