interface GlobalDataRes {
    data: any;
    status: number;
}

export const fetchSignList = async (FETCH_KEY: string):Promise<SignList[] | null> => {
    try {
        const runtimeConfig = useRuntimeConfig();

        const { baseApiUrl } = runtimeConfig.public;
        const { data:cache } = useNuxtData<SignList[]>(FETCH_KEY);

        if (cache.value === null) {
            const { data } = await $fetch<GlobalDataRes>(baseApiUrl + `v5/t-sign/SPOT/dtw/list`);
            const { signList }:{signList: SignList[]} = data;

            return signList;

        } else {
            return cache.value; 
        }

    } catch (err) {
        return null;
    }
}


interface SignList {
    bookmarkFlag: boolean;
    buySuccessCk: boolean;
    contentText: string;
    crypto: Crypto;
    cutPrice: string;
    displayCk: boolean;
    earningRate: string;
    earningSuccessCk: boolean;
    endPrice: boolean;
    endTime: string;
    evaluateState: string;
    evaluateState2: string;
    isEnd: boolean;
    isEnter: boolean;
    isPay: boolean;
    isTicket: boolean;
    maxPrice: string;
    mentorPageId: string;
    minPrice: string;
    sequentialId: number;
    signId: string;
    startPrice: string;
    startTime: string;
    targetEarningRate: string;
    targetEarningRate2: string;
    targetEarningRate3: string;
    targetPrice: string;
    targetPrice2: string;
    targetPrice3: string;
    targetSuccessCk: boolean;
    tradeType: string;
    validateMin: number;
}

interface Crypto {
    cryptoFullCode: string;
    cryptoId: number;
    digitalAssetsCode: string;
    digitalAssetsId: number;
    digitalAssetsKrName: string;
    imageURL: string;
}