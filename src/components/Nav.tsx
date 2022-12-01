import {
    Flex,
    HStack,
    IconButton,
    Spacer,
    Button,
    Box,
    Text,
    Center,
    Circle,
    useDisclosure
} from "@chakra-ui/react"

import { Link } from "react-router-dom"

import { BsCart } from "react-icons/bs";

import { useShoppingCart } from "../context/ShoppingCartContext";

import { ShoppingCart } from "./ShoppingCart";

export function Nav() {
    const { cartQuantity } = useShoppingCart()

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex
                p='1rem'
                boxShadow='md'
                position='sticky'
                top='0'
                bgColor='#fff'
                zIndex='999'
            >
                <HStack spacing='1rem' >
                    <Button colorScheme='teal' variant='link'>
                        <Link to={'/'}>Home</Link>
                    </Button>
                    <Button colorScheme='teal' variant='link'>
                        <Link to={'/store'}>Store</Link>
                    </Button>
                    <Button colorScheme='teal' variant='link'>
                        <Link to={'/about'}>About</Link>
                    </Button>
                </HStack>
                <Spacer />
                <Box position='relative'>
                    <IconButton
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Cart'
                        icon={<BsCart />}
                        isRound
                        onClick={onOpen}
                    />
                    <Center>
                        <Circle
                            position='absolute'
                            bgColor='#38B2AC'
                            right='0rem'
                            bottom='0rem'
                            transform='translate(25%, 25%)'
                            size='1.5rem'
                            color='#fff'
                        >
                            <Text>
                                {cartQuantity}
                            </Text>
                        </Circle>
                    </Center>
                </Box>
            </Flex>
            <ShoppingCart 
                isOpen={ isOpen } 
                onClose={ onClose } 
            />
        </>
    )
}