import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Produto } from '../pages/Home'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood'
  }),
  endpoints: (builder) => ({
    // Endpoint para buscar todos os restaurantes
    getRestaurantsProduct: builder.query<Produto[], void>({
      query: () => 'restaurantes'
    }),

    // Endpoint para buscar um restaurante específico pelo ID
    getRestaurantById: builder.query<Produto, number>({
      query: (id) => `restaurantes/${id}`
    }),

    // Endpoint para buscar um prato específico pelo ID do restaurante e do prato
    getDishById: builder.query<
      Produto['cardapio'][0],
      { restaurantId: number; dishId: number }
    >({
      query: ({ restaurantId, dishId }) =>
        `restaurantes/${restaurantId}/cardapio/${dishId}`
    })
  })
})

// Exporte os hooks gerados automaticamente
export const {
  useGetRestaurantsProductQuery,
  useGetRestaurantByIdQuery,
  useGetDishByIdQuery
} = api

export default api
