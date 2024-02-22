<template>
  <div class="TVChartContainer" ref="TVChartContainer" />
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const datafeedUrl = `${config.API_URL}/api/coin/tv_chart`;

function getLanguageFromURL () {
  const regex = new RegExp('[\\?&]lang=([^&#]*)')
  const results = regex.exec(window.location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

const TVChartContainer = ref<HTMLElement>(null);

const { $TVChart } = useNuxtApp();

const rangeTime = reactive({
  fromTime: 0,
  toTime: 0,
  candleTickCount: 0,
  callTime: 0,
})

let tvWidget;

const nuxtApp = useNuxtApp();

function fetchCallBack(tvWidget) {
  const getVisibleRange = tvWidget.activeChart().getVisibleRange();

  rangeTime.fromTime = getVisibleRange.from;
  rangeTime.toTime = getVisibleRange.to;
  rangeTime.candleTickCount = (rangeTime.toTime - rangeTime.fromTime) / 60; // 보이는 화면에서 전체 캔들 갯수(1분봉일때 60)
  rangeTime.callTime = rangeTime.fromTime + (60 * (Math.floor(rangeTime.candleTickCount / 7)))  // 전체 화면 영역에서 1/7 지점

  // 원하는 로직 추가
}

onMounted(() => {
  // console.log('탐색', new window.Datafeeds)
  const widgetOptions = {
    // symbol: 'AAPL',
    symbol: 'KRW-BTC',
    datafeed: new window.Datafeeds.UDFCompatibleDatafeed(datafeedUrl),
    // datafeed: new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com'),
    // interval: 'D',
    interval: '1',
    container: TVChartContainer.value,
    library_path: '/charting_library/',
    locale: getLanguageFromURL() || 'ko',
    // disabled_features: ['use_localstorage_for_settings'],
    disabled_features: [
      'use_localstorage_for_settings', 
      // 'left_toolbar', // 좌측 도구모음
      // 'right_toolbar',
      // 'control_bar',
      // 'timeframes_toolbar', // 차트 하단에 시간관련 데이터들
      // 'legend_widget'  // 캔버스 내부에 좌상단에 위치한 시고저종거래량 등
    ],
    enabled_features: [
      'study_templates',
      // 'show_average_close_price_line_and_label'
    ],
    charts_storage_url: 'https://saveload.tradingview.com',
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    fullscreen: false,
    autosize: true,
    // studies_overrides: this.studiesOverrides
  }

  tvWidget = new $TVChart(widgetOptions);

  tvWidget.applyOverrides({
    // 'mainSeriesProperties.priceAxisProperties.isInverted': true
  })

  tvWidget.onChartReady(() => {
    tvWidget.activeChart().onDataLoaded().subscribe(
      this,
      () => console.log('데이터 로드',),
      true
    );


    // tvWidget.activeChart().setVisibleRange(
    //     { 
    //       from: 1666921260 - (60 * 40), 
    //       to: 1666926540 + (60 * 40)
    //     },
    //     { 
    //       // percentRightMargin: 40,
    //       applyDefaultRightMargin: 0
    //     }
    // ).then(() => console.log('New visible range is applied'));

    fetchCallBack(tvWidget)
    
    tvWidget.activeChart().onVisibleRangeChanged().subscribe(
        null,
        ({ from, to }) => {
          const fromTime = new Date(from * 1000).toLocaleString();
          const toTime = new Date(to * 1000).toLocaleString();
          // console.log(fromTime, from)
          // console.log(toTime, to)
          // console.log('=======================')

          if(to <= rangeTime.callTime) {
            console.log('콜백시점')
            fetchCallBack(tvWidget)
          }

        }
    );
    
  })

  
})

onUnmounted(() => {
  if(tvWidget) {
      tvWidget.remove();
      tvWidget = null;
  }
})

</script>

<style scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>