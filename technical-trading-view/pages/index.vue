<template>
    <div>
        <!-- <h1>트레이딩뷰 테크니컬 차트</h1> -->
        <div ref="chartContainerRef" class="TVChartContainer"></div>
    </div>
</template>

<script lang="ts" setup>
import type { ChartingLibraryWidgetOptions, IChartingLibraryWidget, LanguageCode, ResolutionString, TradingTerminalWidgetOptions } from '~/public/charting_library/charting_library';
import { type ChartContainerProps, getLanguageFromURL } from '~/composables/methods';

const chartContainerRef = ref<HTMLElement | null>(null);
let widget: IChartingLibraryWidget | null = null;


const defaultProps: Omit<ChartContainerProps, 'container'> = {
    symbol: 'AAPL',
    // symbol: 'BCH',
    // interval: 'D' as ResolutionString,
    interval: '1' as ResolutionString,
    datafeedUrl: 'https://demo_feed.tradingview.com',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: true,
    autosize: true,
    studiesOverrides: {},
}



onMounted(() => {
    if (!chartContainerRef.value) return;
    
    const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol: defaultProps.symbol as string,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(defaultProps.datafeedUrl),
        interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
        container: chartContainerRef.value,
        library_path: defaultProps.libraryPath as string,
        locale: getLanguageFromURL() || 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        charts_storage_url: defaultProps.chartsStorageUrl,
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
    }

    const { $widget } = useNuxtApp();
    widget = new $widget(widgetOptions)
})

onUnmounted(() => {
    console.log('하하', widget)
    if (widget) {
        widget.remove();
        widget = null;
    }
})
</script>

<style scoped>
.TVChartContainer {
    height: 500px;
}
</style>
  