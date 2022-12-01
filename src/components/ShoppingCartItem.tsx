import {
    Center,
    Heading,
    HStack,
    IconButton,
    Spacer,
    VStack,
    Image,
    Text,
    Mark
} from "@chakra-ui/react";

import { IoIosRemove } from "react-icons/io";

import { useShoppingCart } from "../context/ShoppingCartContext";

import storeItems from "../data/items.json"

import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id: number
    quantity: number
}

export function ShoppingCartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()

    const item = storeItems.find(item => item.id === id)

    if (item == null) return null

    return (
        <HStack height='4rem' overflow='hidden' my='0.5rem'>
            <Center width='30%'>
                <Image
                    src={item?.imgUrl}
                    objectFit='cover'
                />
            </Center>
            <VStack align='left'>
                <Heading
                    fontWeight='semibold'
                    textTransform='capitalize'
                    size='xs'
                >
                    {item?.name} {quantity > 1 && <Mark fontSize='0.6rem' color='grey'>x{quantity}</Mark>}
                </Heading>
                <Text
                    fontSize='xs'
                    color='grey'
                >
                    {formatCurrency(item?.price)}
                </Text>
            </VStack>
            <Spacer />
            <HStack>
                <Text
                    fontSize='sm'
                    color='grey'
                >
                    {formatCurrency(item?.price * quantity)}
                </Text>
                <IconButton
                    variant='outline'
                    colorScheme='teal'
                    aria-label='Remove'
                    size='2xs'
                    icon={<IoIosRemove />}
                    onClick={() => removeFromCart(id)}
                />
            </HStack>
        </HStack>
    )
}
