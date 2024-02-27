<template>
    <div>
        <h1>실시간 위젯</h1>
        <div ref="embeddingTradingviewRef"></div>
    </div>
</template>

<script lang="ts" setup>

const embeddingTradingviewRef = ref<HTMLElement | null>(null);

const option = {
    autosize: true,
    width: "100%",
    height: "500",
    symbol: "BINANCE:BTCUSDT",
    interval: "D",
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",
    locale: "kr",
    enable_publishing: false,
    withdateranges: true,
    hide_side_toolbar: false,
    allow_symbol_change: true,
    details: false,
    hotlist: false,
    calendar: false,
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
    support_host: "https://www.tradingview.com"
}


const createEmbeddingTradingview = () => {
    if (!embeddingTradingviewRef.value) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(option);

    embeddingTradingviewRef.value.appendChild(script);
}

onMounted(() => {
    createEmbeddingTradingview();
})
</script>