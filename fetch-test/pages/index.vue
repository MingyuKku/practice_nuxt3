<template>
    <div class="index-page">
        <h1>인덱스 페이지</h1>
        <BarChart v-bind="barChartProps" />
    </div>
</template>

<script lang="ts" setup>
import { BarChart, useBarChart } from "vue-chart-3";

const data = ref([30, 40, 60, 70, 5]);
const legendTop = ref(true);
const imgData = ref(null);

const options = computed(() => ({
    scales: {
    y: {
        beginAtZero: true,
    },
    },
}));

const chartData = computed(() => ({
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
    {
        data: data.value,
        backgroundColor: [
        "#77CEFF",
        "#0079AF",
        "#123E6B",
        "#97B0C4",
        "#A5C8ED",
        ],
    },
    ],
}));

const { barChartProps, barChartRef } = useBarChart({
    chartData,
    options,
});

</script>