import { AsyncData, UseFetchOptions  } from "nuxt/app";
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';
import { PickFrom } from "nuxt/dist/app/composables/asyncData";


export default defineNuxtPlugin(() => {

    // const fetchApi = <ResT = void>(url: string, opts?: FetchOptions) => {
    const fetchApi = <ResT = void>(url: string, opts?: NitroFetchOptions<NitroFetchRequest, "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace">) => {
        return $fetch<ResT>(`https://dummyjson.com/${url}`, opts)
    }

    // const fetch2Api = <T = void>(url: string, opt?: FetchOptions) => {
    const fetch2Api = <ResT = void>(url: string, opts?: NitroFetchOptions<NitroFetchRequest, "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace">) => {

        const intercepter: NitroFetchOptions<NitroFetchRequest, "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace"> = {
            onResponse() {
                console.log('인터셉터 응답')
            }
        };
        
        Object.assign(intercepter, opts);

        return $fetch<ResT>(`http://localhost:20002/api/${url}`, intercepter)
    }
    
    const useFetchApi = (url: string, opt?: UseFetchOptions<any>) => {
    // const useFetchApi = <ResT = void, ErrorT = FetchError, ReqT extends NitroFetchRequest = NitroFetchRequest, Method extends AvailableRouterMethod<ReqT> = ResT extends void ? 'get' extends AvailableRouterMethod<ReqT> ? 'get' : AvailableRouterMethod<ReqT> : AvailableRouterMethod<ReqT>, _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT, DataT = _ResT, PickKeys extends KeysOf<DataT> = KeysOf<DataT>, DefaultT = null>(url: string, opt?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null> => {
    // const useFetchApi = (url: string, opt?: any) => {
        
        // return useFetch<ResT, ErrorT, ReqT, MethodesT, _ResT, DataT, PickKeys, DefaultT>(`http://localhost:20002/api/${url}`, opt)
        return useFetch(`http://localhost:20002/api/${url}`, opt)
    }

    return {
        provide: {
            fetchApi: fetchApi,
            fetch2Api,
            useFetchApi: useFetchApi,
        }
    }
})