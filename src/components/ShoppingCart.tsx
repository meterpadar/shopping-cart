import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Heading,
} from '@chakra-ui/react'

import { useShoppingCart } from '../context/ShoppingCartContext'

import { formatCurrency } from '../utilities/formatCurrency'

import { ShoppingCartItem } from './ShoppingCartItem'

import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
    onClose: () => void
}

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
    const { cartItems } = useShoppingCart();

    const cartItemSumPrice = cartItems.reduce((total, cartItem) => {
        const item = storeItems.find(item => item.id === cartItem.id);
        
        return total + (item?.price || 0) * cartItem.quantity
    }, 0)

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size='sm'
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Shopping Cart</DrawerHeader>
                <DrawerBody>
                    {
                        cartItems.map(item => (
                            <ShoppingCartItem {...item} key={item.id} />
                        ))
                    }
                    <Heading 
                        textAlign='right' 
                        size='lg' 
                        my='0.5rem'
                    >
                        Total: {formatCurrency(cartItemSumPrice)}
                    </Heading>
                </DrawerBody>
                <DrawerFooter>
                    <Button colorScheme='blue'>Order</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
