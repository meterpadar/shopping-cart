import { createContext, ReactNode, useContext, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        'shopping-cart',
        []
    )

    const cartQuantity = cartItems.reduce((quantity, item) => {
        return item.quantity + quantity;
    }, 0)


    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currentCartItems => {
            if (!currentCartItems.find(item => item.id === id)) {
                return [...currentCartItems, { id: id, quantity: 1 }]
            } else {
                return currentCartItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currentCartItems => {
            if (currentCartItems.find(item => item.id === id)?.quantity === 1) {
                return currentCartItems.filter(item => item.id !== id)
            } else {
                return currentCartItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currentCartItems => {
            return currentCartItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ 
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart, 
            cartQuantity, 
            cartItems 
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )

}