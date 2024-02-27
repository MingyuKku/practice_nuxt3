import { BasicRes, UseFetchRes } from "./common";


export const getUseSignList = async <T>(key: string, mentorId: string):Promise<UseFetchRes<T>> => {

    const { $useFetchApi } = useNuxtApp();

    const {
        data,
        error,
        pending,
        refresh
    // } = await $useFetchApi<UseFetchRes<T>>(`ai/v2/model/${mentorId}/sign/list`, {
    } = await $useFetchApi(`ai/v2/model/${mentorId}/sign/list`, {
        key: key,
        method: 'POST',
        credentials: 'include',
    });

    const signList = data.value.data.signList as SignListRes;
    const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;

    return {
        data: instanceSignList,
        error,
        pending,
        refresh,
    }


    // const { data: cacheSignList } = useNuxtData(key);

    // if (cacheSignList.value === null) {
    //     const {
    //         data,
    //         error,
    //         pending,
    //         refresh
    //     // } = await $useFetchApi<UseFetchRes<T>>(`ai/v2/model/${mentorId}/sign/list`, {
    //     } = await $useFetchApi(`ai/v2/model/${mentorId}/sign/list`, {
    //         key: key,
    //         method: 'POST',
    //         credentials: 'include',
    //     });
    
    //     const signList = data.value.data.signList as SignListRes;
    //     const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;
    
    //     return {
    //         data: instanceSignList,
    //         error,
    //         pending,
    //         refresh,
    //     }

    // } else {
    //     const signList = cacheSignList.value.data.signList as SignListRes;
    //     const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;
    
    //     return {
    //         data: instanceSignList,
    //     }
    // }

    
}

export const addLastSignOnList = async <T>(mentorId: string, ssi:number):Promise<UseFetchRes<T>> => {
    const { $useFetchApi } = useNuxtApp();

    const { data, error, pending, refresh } =  await $useFetchApi(`ai/v2/model/${mentorId}/sign/list?ssi=${ssi}`, {
        method: 'POST',
        credentials: 'include',
    })

    const signList = data.value.data.signList;
    const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;

    return {
        data: instanceSignList,
        error,
        pending,
        refresh,
    }
}

export const addLastSignOffList = async <T>(mentorId: string, ssi:number, sn:number):Promise<UseFetchRes<T>> => {
    const { $useFetchApi } = useNuxtApp();

    const { data, error, pending, refresh } =  await $useFetchApi(`ai/v2/model/${mentorId}/sign/list?ssi=${ssi}&sn=${sn}`, {
        method: 'POST',
        credentials: 'include'
    })

    const signList = data.value.data.signList;
    const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;

    return {
        data: instanceSignList,
        error,
        pending,
        refresh,
    }
}



export const asyncGetSignList = async (key: string, mentorId: string):Promise<SignListRes> => {

    const { data: cacheData } = useNuxtData(key);
    console.log('캐싱 데이터', cacheData.value)

    if (cacheData.value === null) {
        const { $fetch2Api } = useNuxtApp();
        const { data } = await $fetch2Api<BasicRes>(`ai/v2/model/${mentorId}/sign/list`, {
            method: 'POST',
            credentials: 'include',
        })
        console.log('걍 데이터', data)
        const signList = data.signList as SignListRes;
        return signList;

    } else {
        const signList = cacheData.value as SignListRes;
        return signList;
    }
}


export const asyncAddSignOnList = async (key: string, mentorId: string, ssi:number):Promise<SignListRes> => {

    const { data: cacheData } = useNuxtData(key);

    const { $fetch2Api } = useNuxtApp();
    const { data } = await $fetch2Api<BasicRes>(`ai/v2/model/${mentorId}/sign/list?ssi=${ssi}`, {
        method: 'POST',
        credentials: 'include',
    })

    const signList = data.signList as SignListRes;
    cacheData.value.signs = cacheData.value.signs.concat(signList.signs);

    return cacheData.value;
}

export const asyncAddSignOffList = async (key: string, mentorId: string, ssi:number, sn:number):Promise<SignListRes> => {

    const { data: cacheData } = useNuxtData(key);

    const { $fetch2Api } = useNuxtApp();
    const { data } = await $fetch2Api<BasicRes>(`ai/v2/model/${mentorId}/sign/list?ssi=${ssi}&sn=${sn}`, {
        method: 'POST',
        credentials: 'include',
    })

    const signList = data.signList as SignListRes;
    cacheData.value.signs = cacheData.value.signs.concat(signList.signs);
    
    return cacheData.value;
}


export interface Crypto {
    cryptoFullCode: string;
    cryptoId: number;
    digitalAssetsCode: string;
    digitalAssetsId: number;
    digitalAssetsKrName: string;
    imageURL: string;
  }

export interface SignListRes {
    first: boolean;
    last: boolean;
    size: number;
    signs: SignListItemRes[] | null;
    ticket: boolean;
}

export interface SignListItemRes {
    bookmarkFlag: boolean;
    earningRate?:number;
    endEarningTime: null | string;
    endTime: string;
    evaluateState: string;
    evaluateState2?: string;
    isEnd: boolean;
    isPay: boolean;
    crypto: Crypto;
    signId: string;
    slideNo: null | number;
    subSeqId: number;
    targetRate: number;
    targetRate2?: number;
    targetRate3?: number;
    validateMin: number;
}

export class SignListItem {
    bookmarkFlag: boolean;
    earningRate?:number;
    endEarningTime: null | string;
    endTime: string;
    isEnd: boolean;
    isPay: boolean;
    isPurchase: boolean;
    crypto: Crypto;
    signId: string;
    slideNo: null | number;
    subSeqId: number;
    targetRate: number;
    targetRate2?: number;
    targetRate3?: number;
    validateMin: number;
    isMultiTarget: boolean;

    constructor(res: SignListItemRes, ticket: boolean) {
        this.bookmarkFlag = res.bookmarkFlag;
        if (res.earningRate !== undefined) this.earningRate = parseFloat(res.earningRate.toFixed(2)) || 0;
        this.endEarningTime = res.endEarningTime;
        this.endTime = res.endTime;
        this.isEnd = res.isEnd;
        this.isPay = res.isPay;
        this.isPurchase = true;

        if (!ticket) {
            if (res.isPay) this.isPurchase = false;
        }
        
        this.crypto = res.crypto;
        this.signId = res.signId;
        this.slideNo = res.slideNo;
        this.subSeqId = res.subSeqId;
        this.targetRate = res.targetRate;
        if (res.targetRate2 !== undefined) this.targetRate2 = res.targetRate2;
        if (res.targetRate3 !== undefined) this.targetRate3 = res.targetRate3;
        this.validateMin = res.validateMin;
        this.isMultiTarget = res.targetRate3 === undefined ? false : true;
    }
}

export class SignListClass {
    signListItems: SignListItem[];
    first: boolean;
    last: boolean;
    // number: number;
    size: number;
    ticket: boolean;

    constructor(res: SignListItemRes[] | null, first: boolean, last: boolean, size: number, ticket: boolean) {
        this.signListItems = res ? res.map(res => new SignListItem(res, ticket)) : [];
        this.first = first;
        this.last = res ? last : true;
        // this.number = number;
        this.size = size;
        this.ticket = ticket;
    }
}



// 북마크 클릭
let bookmarkFlag = false;
export const onClickBookmark = (
  item:SignListItem, 
  isTicket:boolean, 
  payload:MouseEvent, 
) => {
  
  payload.preventDefault(); // 이걸 해제하면 sign 팝업이 나옴
  if (!bookmarkFlag) { // 중복클릭 막기 위해
    bookmarkFlag = true;

    if (!item.isEnd) { // 싸인온
      if (item.isPay) { // 유료싸인
        if (!isTicket) { // 이용권 없음
          bookmarkFlag = false;
          return;
        }
      }
    }
    
    item.bookmarkFlag = !item.bookmarkFlag; // api응답 전 ui를 바꾸기 위해(빠르게)
    useToggleBookmark(item.signId)
    .then(isBookmarked => {
        bookmarkFlag = false;
    })
  }

  // delete useNuxtApp().payload.data[`modelSignList-${modelId}`] // 기존에 존재한 싸인리스트 캐싱 데이터 삭제
  // delete useNuxtApp().payload.data['bookmarkList'] // 기존에 존재한 북마크리스트 캐싱 데이터 삭제
}


/** 
 * @return 북마크 등록 성공시 true
 */
export const useToggleBookmark = async (signId: string) => {
    const { $useFetchApi } = useNuxtApp();
    const getParam:{
        [key: string]: string
    } = {
        signId: signId
    }

    const params = new URLSearchParams();
    for(let key in getParam) {
        params.append(key, getParam[key])
    }

    const { data } = await $useFetchApi(`sign/v1/bookmark`, {
      method: "POST", 
      credentials:'include',
      body: params
    });
  
    if (data.value.registerSign) {
      return true;
    } 
    if (data.value.cancelRegisterSign) {
      return false;
    }
    if (data.value.notLoginUser) {
      navigateTo("/user/login");
    }
}


interface BookmarkSign {
    purchaseTicket?: boolean;
    registerSign?: boolean;
    cancelRegisterSign?: boolean;
    notLoginUser?: boolean;
}