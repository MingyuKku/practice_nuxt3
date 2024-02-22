import type { FetchError } from 'ohmyfetch';
import type { NitroFetchRequest } from 'nitropack';

interface SearchParams {
    [key: string]: any;
}

interface IntercepterParams {
    request?:any;
    response?:any;
    options?:any;
    error?:any;
}

export interface FetchOptions {
    baseURL?: string;
    method?:'GET' | 'POST';
    credentials?: 'include';
    headers?:any;
    params?: SearchParams;
    query?: SearchParams;
    body?:RequestInit['body'] | Record<string, any>;
    retry?: number | false;
    onRequest?({ request, response, options }:IntercepterParams):Promise<void>;
    onRequestError?({ request, response, options, error }:IntercepterParams): Promise<void>;
    onResponse?({ request, response, options }:IntercepterParams): Promise<void>;
    onResponseError?({ request, response, options, error }:IntercepterParams): Promise<void>;
}

export default defineNuxtPlugin(() => {

    const useApiFetch = <ResT = void, ErrorT = FetchError, ReqT extends NitroFetchRequest = NitroFetchRequest>(url: string, fetchOpt:FetchOptions = {method:'GET'}) => {
        
        const intercepter:FetchOptions = {
            async onResponse({ request, response, options }) { 
                return response;
            },
            
        }
        Object.assign(intercepter, fetchOpt);

        return $fetch<ResT>(`http://localhost:20002/api/${url}`, intercepter);
    }


    return {
        provide: {
            useApiFetch,
        }
    }
})