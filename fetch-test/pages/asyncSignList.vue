<template>
    <div>
        <h3>useAsyncData 사용</h3>
        <div v-if="signListInstance">
            <div v-if="signListInstance.signListItems.length">진행중 : {{ signListInstance.signListItems.filter(item => !item.isEnd).length }}개</div>
            <div v-if="signListInstance.signListItems.length">종료 : {{ signListInstance.signListItems.filter(item => item.isEnd).length }}개</div>
            <ul>
                <li v-for="item in signListInstance.signListItems" :key="item.subSeqId" class="list">
                    <div class="top-content">
                        <div class="coin">
                            <div class="coin-image"><img :src="item.crypto.imageURL" alt=""></div>
                            <h4>{{ item.crypto.digitalAssetsKrName }}</h4>
                            <h5>{{ item.crypto.digitalAssetsCode }}</h5>
                        </div>
                        <div @click="(payload: MouseEvent) => onClickBookmark(item, ticket, payload)" class="bookmark">
                            <NuxtImg v-if="item.bookmarkFlag" src="https://kr.object.ncloudstorage.com/cosign/version1/icon/i-bookMark-o.png" alt="북마크" format="webp" loading="lazy" />
                            <NuxtImg v-else src="https://kr.object.ncloudstorage.com/cosign/version1/icon/i-bookMark-x.png" alt="북마크" format="webp" loading="lazy" />
                        </div>
                    </div>
                    
                    <p :class="item.isEnd ? 'end': 'ing'">{{ item.isEnd ? '종료' : '진행중' }}</p>
                    <p>{{ item.endTime }}</p>
                    <p>{{ item.endEarningTime }}</p>
                </li>
            </ul>
            <button v-if="signListInstance.last === false" @click="onClickMore">더보기</button>
        </div>
        <p v-else>{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import { SignListClass, onClickBookmark, asyncGetSignList, SignListRes, asyncAddSignOnList, asyncAddSignOffList } from '../api/signList';

const fetchKey = 'fetchSignList';
const signListInstance = ref<SignListClass | null>(null);
const ticket = ref<boolean>(false);


const {
    data: signList,
    error,
} = await useAsyncData(
    fetchKey,
    () => asyncGetSignList(fetchKey, 'dtw')
)

if (signList.value) {
    ticket.value = signList.value.ticket;
    signListInstance.value = new SignListClass(signList.value.signs, signList.value.first, signList.value.last, signList.value.size, signList.value.ticket);
}


async function onClickMore() {
    if (!signListInstance.value) return;

    const lastSignItem = signListInstance.value.signListItems[signListInstance.value.signListItems.length - 1];
    const lastSubSeqId = lastSignItem.subSeqId;
    const lastSlideNo = lastSignItem.slideNo;

    if (lastSubSeqId && !lastSlideNo) { // 싸인온이 마지막일때
        const { data: signList } = await useAsyncData(
            () => asyncAddSignOnList(fetchKey, 'dtw', lastSubSeqId)
        )

        if (signList.value) {
            signListInstance.value = new SignListClass(signList.value.signs, signList.value.first, signList.value.last, signList.value.size, signList.value.ticket);
        }
    } 

    if (lastSubSeqId && lastSlideNo) { // 싸인오프가 마지막일때
        const { data: signList } = await useAsyncData(
            () => asyncAddSignOffList(fetchKey, 'dtw', lastSubSeqId, lastSlideNo)
        )

        if (signList.value) {
            signListInstance.value = new SignListClass(signList.value.signs, signList.value.first, signList.value.last, signList.value.size, signList.value.ticket);
        }
    }
}

</script>


<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.coin {
    display: flex;
    align-items: center;
}
.coin-image {
    width: 20px;
    img {
        display: block;
        width: 100%;
    }
}
.list {
    /* list-style: none; */
    padding: 12px;
    .top-content {
        display: flex;
        align-items: center;
        .bookmark {
            width: 18px;
            margin-left: 100px;
            cursor: pointer;
            img {
                display: block;
                width: 100%;
            }
        }
    }
    p {
        &.end {
            color: red;
        }
        &.ing {
            color: green;
        }
    }
}
</style>