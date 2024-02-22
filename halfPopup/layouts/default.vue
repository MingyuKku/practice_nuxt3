<template>
  <div class="wrap" 
    @touchend="handleTouchEnd($event)" 
    @mouseup="handleTouchEnd($event)" 
    @touchmove="handleTouchMove" 
    @mousemove="handleTouchMove"
  >
    <header class="header">해더입니다</header>
    <slot />
    <div class="halfPopup-wrap" ref="halfPopupWrap" 
      :style="style.halfPopupStyle" 
      :class="{max: isMaxHeight, transitionHeight: isTransition}"
    >
      <div class="popup-top">
        <div class="popup-handle" ref="popupHandle" 
          @touchstart="handleTouchStart($event)" 
          @mousedown="handleTouchStart($event)"
        >
          <span class="stick"></span>
        </div>
      </div>
    </div>
    <button class="openPopup-btn" @click="moveY = 0">팝업열기</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
export default {
  name: 'App',
  setup() {

    const halfPopupWrap = ref(null);
    const popupHandle = ref(null)
  
    let touchFlag = false;
    let isTransition = ref(false);
    let isMaxHeight = ref(false);
    let coorY = ref(0);
    let moveY = ref(0);
    let touchStartTime = 0;
    let touchEndTime = 0;
    const height = reactive({
      maxHeight: 0,
      halfHeight: 0,
    })

    const style = reactive({
      halfPopupStyle: {
        // transform: computed(() => `translate3d(0,${-moveY.value}px,0)`),
        height: computed(() => `calc(50vh + ${moveY.value}px)`),
      }
    })

    function handleTouchStart(e) {
      // console.log(e.touches[0])
      touchStartTime = new Date().valueOf()
      touchFlag = true;
      isTransition.value = false;

      let pageY = 0;
      if(e.type === 'mousedown') pageY = e.pageY
      else if(e.type === 'touchstart') pageY = e.touches[0].pageY

      coorY.value = moveY.value + pageY
    }

    function handleTouchMove(e) {
      if(touchFlag) {

        let pageY = 0;
        if(e.type === 'mousemove') pageY = e.pageY
        else if(e.type === 'touchmove') pageY = e.touches[0].pageY

        moveY.value = coorY.value - pageY
        // console.log('이동중 moveY', moveY.value)
        // console.log('이동중 coorY', coorY.value)
        // console.log('이동중 e.pageY', e.pageY)
      }
    }

    function handleTouchEnd() {
      touchEndTime = new Date().valueOf()

      if(!touchFlag) return;
      else touchFlag = false

      isTransition.value = true;
      let touchTime = touchEndTime - touchStartTime;


      // 빠르게 위로 올렸을 때 전체팝업으로 채운다
      if(!isMaxHeight.value && touchTime <= 120 && moveY.value >= height.halfHeight / 3) {
        isMaxHeight.value = true;
        moveY.value = height.maxHeight;
        return;
      }

      // 전체 팝업으로 채웠을 때 빠르게 아래로 내리면 팝업 끄기
      if(isMaxHeight.value && touchTime <= 140 && moveY.value <= height.maxHeight / 1.5) {
        isMaxHeight.value = false;
        moveY.value = -(height.maxHeight);
        return;
      }


      if(moveY.value >= height.halfHeight) {
        isMaxHeight.value = true;
        moveY.value = height.maxHeight;
      } else if(moveY.value >= height.halfHeight / 2 && moveY.value < height.halfHeight) {
        isMaxHeight.value = false;
        moveY.value = height.halfHeight;
      } else if((height.halfHeight / 2 > moveY.value && moveY.value >= 0) || (moveY.value < 0 && moveY.value >= -(height.halfHeight / 2))) {
        isMaxHeight.value = false;          
        moveY.value = 0;
      } else {
        isMaxHeight.value = false;   
        moveY.value = -(height.maxHeight);
      }
      
    }

    // function openPopup() {
      
    // }

    onMounted(() => {
      height.maxHeight = halfPopupWrap.value.offsetTop;
      height.halfHeight = halfPopupWrap.value.offsetTop / 2;
    })

    return {
      halfPopupWrap,
      popupHandle,
      touchFlag,
      isTransition,
      isMaxHeight,
      coorY,
      moveY,
      height,
      style,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .wrap {
    min-height: 100vh;
    background: lightgrey;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px;
    background: darkslategrey;
    color: white;
    text-align: center;
  }

  .halfPopup-wrap {
    position: fixed;
    left: 16px;
    bottom: 0;
    z-index: 10;
    background: white;
    width: calc(100% - 32px);
    height: 50vh;
    border-radius: 24px 24px 0 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    user-select: none;
    transition: left 0.3s ease-out, width 0.3s ease-out, border-radius 0.3s ease-out;
    will-change: height;
  }

  .halfPopup-wrap.transitionHeight {
    transition: left 0.3s ease-out, width 0.3s ease-out, border-radius 0.3s ease-out, height 0.3s ease-out;
  }

  .halfPopup-wrap.max {
    left: 0;
    width: 100%;
    border-radius: 0;
  }

  .popup-top {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup-handle {
    cursor: pointer;
    padding: 16px;
  }

  .stick {
    display: block;
    background: lightgray;
    width: 80px;
    height: 10px;
    border-radius: 10px;
  }

  .openPopup-btn {
    position: absolute;
    left: 40px;
    bottom: 40px;
  }
</style>