import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'

export type ProductT = {
    id: string,
    name: string,
    price: number,
    images: string[]
}

export type CartGetResultT = {
    items: {
        [id: string]: CartProductT
    },
    price: number
}

export type CartProductT = ProductT & {
    quantity: number
}

export type DetailedProductT = ProductT & {
    brand: string,
    type: string,
    description: string
}

type Order = {
    id: string
    time: string
    address: string
    product_list_id: string
}

export type CheckOutPayloadT = {
    'credit_card_number': string
    'cvv': number,
    'expiration_time': string,
    'address': string,
    'products': string[] // array of product_id
}

export type BaseUserT = {
    username: string,
    password: string
}

export type UserT = BaseUserT & {
    email: string,
    firstName: string,
    lastName: string,
}

export type ReviewT = {
    content: string,
    date: string,
    display_name: string,
    rating: number
}

export type ReviewsT = {
    average_rating: number
    reviews: ReviewT[]
}

export type FilterReturnT = {
        'value': string,
        'id': string
    }[]

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.nonamegameshop.games',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token != null) {
                headers.set('Cookie', `Session=e3023b63-8388-4a33-8e9e-e0002bbb581a`);
                headers.set('cookielog', `Session=${token}`);
            }
            headers.set('test', `123`);
            return headers;
        },
        // credentials: 'include',
        mode: 'cors'
    }),
    tagTypes: ['products', 'cart', 'orders'],
    endpoints: (builder) => ({
        getTypes: builder.query<FilterReturnT, void>({
            query: () => `/categories`,
            transformResponse: (res:any) => {
                return (res['types'] as string[]).map(i => ({
                    'value': i.split("::")[0],
                    'id': i.split("::")[1]
                }));
            }
        }),
        getBrands: builder.query<FilterReturnT, void>({
            query: () => `/categories`,
            transformResponse: (res:any) => {
                return (res['brands'] as string[]).map(i => ({
                    'value': i.split("::")[0],
                    'id': i.split("::")[1]
                }));
            }
        }),
        getAllProducts: builder.query<ProductT[], number>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result:ProductT[] = [];
                const allBrands = await fetchWithBQ('/categories');
                const size = 24;
                let start = (_arg - 1) * size; let end = size;
                let curr = 0;
                for await (const item of ((allBrands.data as any)['brands'] as string[])) {
                    // if (curr < start) { curr++; continue;}
                    if (curr > end) break; 
                    const id = item.split("::")[1];
                    const prodResult = await fetchWithBQ(`/products/brand/${id}/page/1`)
                    if (prodResult.data) {
                        result.push(...(prodResult.data as ProductT[]));
                        curr += (prodResult.data as ProductT[]).length;
                    }
                }
                return { data: result };
            },
            providesTags: ['products']
        }),
        getProductsByPage: builder.query<ProductT[], number>({
            query: (pageNumber) => `/products/brand/1`,
            providesTags: ['products']
        }),
        getProductsByBrand: builder.query<ProductT[], {brandName:string, pageNumber:number}>({
            query: ({brandName, pageNumber}) => `/products/type/${brandName}/page/${pageNumber}`,
            providesTags: ['products']
        }),
        getProductsByType: builder.query<ProductT[], {typeName:string, pageNumber:number}>({
            query: ({typeName, pageNumber}) => `/products/type/${typeName}/page/${pageNumber}`,
            providesTags: ['products']
        }),
        getProduct: builder.query<DetailedProductT, string>({
            query: (productID) => `/product/${productID}`
        }),
        getReviews: builder.query<ReviewsT, string>({
            query: (productID) => `/product/${productID}/review`
        }),
        register: builder.mutation<string, UserT>({
            query: (user) => ({
                url: '/user',
                method: 'PUT',
                body: user
            }),
            transformResponse: (response:any, meta, arg) => response.data,
            transformErrorResponse: (response, meta, arg) => response.status,
        }),
        logIn: builder.mutation<string, BaseUserT>({
            query: (user) => ({
                url: '/session',
                method: 'POST',
                body: user
            }),
            
        }),
        logOut: builder.mutation<string, void>({
            query: () => ({
                url: '/session',
                method: 'DELETE'
            }),
        }),
        getCart: builder.query<string, void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const cartIDResult = await fetchWithBQ('/cart');
                let cartResult: CartGetResultT = { 
                    items: {},
                    price: 0
                }

                let countID:{[id:string]:number} = {}
                for await (const ID of ((cartIDResult.data as any)['products'] as string[])) {
                    countID[ID] = 1 + (countID[ID]??0);
                    if (countID[ID] <= 1) {
                        const IDResult = await fetchWithBQ(`/product/${ID}`);
                        cartResult.price = cartResult.price + (IDResult.data as ProductT).price;
                        if (IDResult.data) {
                            cartResult.items[ID] = {
                                ...(IDResult.data as ProductT),
                                quantity: 1,
                            }
                        }
                        else return { error: IDResult.error as FetchBaseQueryError }
                    } else {
                        cartResult.price = cartResult.price + cartResult.items[ID].price;
                        cartResult.items[ID] = {
                            ...cartResult.items[ID],
                            quantity: countID[ID]
                        }
                    }
                }
                return { data: cartResult as any };
            },
            providesTags: ['cart']
        }),
        addToCart: builder.mutation<string, string>({
            query: (productID) => ({
                url: `/cart`,
                method: 'PUT',
                body: productID
            }),
            invalidatesTags: ['cart']
        }),
        deleteFromCart: builder.mutation<string, string>({
            query: (productID) => ({
                url: `/cart/${productID}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cart']
        }),
        checkout: builder.mutation<string, CheckOutPayloadT>({
            query: (checkOutPayload) => ({
                url: '/check_out',
                method: 'POST',
                body: checkOutPayload
            }),
            invalidatesTags: ['cart', 'orders']
        }),
        getOrders: builder.query<Order, void>({
            query: () => `/orders`,
            transformResponse: (res:any) => res['orders'],
            providesTags: ['orders']
        }),
        // Returns array of product ids
        getProductList: builder.query<string[], string>({
            query: (productListID) => `/product_list/${productListID}`,
            transformResponse: (res:any) => res['products']
        }),
        // WIP
        getOrder: builder.query<any, void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const ordersResult = await fetchWithBQ('/orders');
                (ordersResult.data as unknown as string[]).forEach(id => {

                })

                return ordersResult
            },
        }),
    }),
});

export const { 
    useGetProductsByPageQuery, useGetProductsByTypeQuery, useGetProductsByBrandQuery,
    useGetAllProductsQuery,
    useGetProductQuery,
    useGetReviewsQuery,
    useGetTypesQuery, useGetBrandsQuery,
    useRegisterMutation, useLogInMutation, useLogOutMutation,
    useGetCartQuery, useAddToCartMutation, useDeleteFromCartMutation } = apiSlice;