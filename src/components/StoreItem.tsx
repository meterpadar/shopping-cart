import {
    Box,
    Heading,
    Image,
    Text,
    Center,
    IconButton,
    Button,
    Card,
    CardBody,
    Stack,
    HStack,
    VStack,
    useHighlight,
    Mark
} from "@chakra-ui/react"

import {
    AiOutlinePlus,
    AiOutlineMinus
} from "react-icons/ai"

import { useShoppingCart } from "../context/ShoppingCartContext"

import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    const quantityOfItem = getItemQuantity(id);

    return (
        <Card overflow='hidden' height='26rem'>
            <CardBody p='0' height='100%'>
                <Center height='60%' overflow='hidden'>
                    <Image
                        src={imgUrl}
                        alt={name}
                        objectFit='cover'
                        minHeight='100%'
                    />
                </Center>
                <VStack height='40%' py='.5rem' px='1rem'>
                    <HStack w='100%' justify='space-between'>
                        <Heading
                            textTransform='capitalize'
                            size='lg'
                        >
                            {name}
                        </Heading>
                        <Text
                            fontSize='xl'
                            color='grey'
                        >
                            {formatCurrency(price)}
                        </Text>
                    </HStack>
                    <VStack
                        height='100%'
                        width='100%'
                        justify='center'
                    >
                        {
                            quantityOfItem === 0 ?
                                <Button
                                    width='100%'
                                    colorScheme='blue'
                                    onClick={() => increaseCartQuantity(id)}
                                >
                                    + Add item to cart
                                </Button>
                                :
                                <>
                                    <HStack>
                                        <IconButton
                                            colorScheme='blue'
                                            aria-label='Search database'
                                            icon={<AiOutlineMinus />}
                                            onClick={() => decreaseCartQuantity(id)}
                                        />
                                        <Text>
                                            <Mark fontSize='1.5rem'>{quantityOfItem}</Mark> in cart
                                        </Text>
                                        <IconButton
                                            colorScheme='blue'
                                            aria-label='Search database'
                                            icon={<AiOutlinePlus />}
                                            onClick={() => increaseCartQuantity(id)}
                                        />
                                    </HStack>
                                    <Stack>
                                        <Button
                                            colorScheme='red'
                                            onClick={() => removeFromCart(id)}
                                        >
                                            Remove
                                        </Button>
                                    </Stack>
                                </>
                        }
                    </VStack>
                </VStack>
            </CardBody>
        </Card>
    )
}