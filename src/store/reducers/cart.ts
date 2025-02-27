import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../pages/Home'

type CartState = {
  items: Produto['cardapio'][0][] // Itens do carrinho (pratos)
  isOpen: boolean // Estado do carrinho (aberto/fechado)
  isOpenDelivery: boolean
  isOpenDeliveryEnd: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  isOpenDelivery: false,
  isOpenDeliveryEnd: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Produto['cardapio'][0]>) => {
      const prato = action.payload
      const pratoJaExiste = state.items.find((item) => item.id === prato.id)

      if (!pratoJaExiste) {
        state.items.push(prato) // Adiciona o prato ao carrinho
      } else {
        alert('Este prato já está no carrinho.') // Evita duplicação
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    open: (state) => {
      state.isOpen = true // Abre o carrinho
    },
    close: (state) => {
      state.isOpen = false // Fecha o carrinho
    },
    openDelivery: (state) => {
      state.isOpenDelivery = true
    },
    closeDelivery: (state) => {
      state.isOpenDelivery = false
    },
    openDeliveryEnd: (state) => {
      state.isOpenDeliveryEnd = true
    },
    closeDeliveryEnd: (state) => {
      state.isOpenDeliveryEnd = false
    }
  }
})

export const {
  add,
  open,
  close,
  remove,
  openDelivery,
  closeDelivery,
  openDeliveryEnd,
  closeDeliveryEnd
} = cartSlice.actions
export default cartSlice.reducer
