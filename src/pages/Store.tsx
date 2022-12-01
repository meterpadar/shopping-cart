import { 
    Box, 
    Heading,
    SimpleGrid
} from "@chakra-ui/react"

import storeItems from "../data/items.json"

import { StoreItem } from "../components/StoreItem"

export function Store() {
    return (
       <Box 
            padding='1rem' 
            bgColor='#F1F1F1'
        >
            <Heading 
                size='xl' 
                marginBottom='1rem'
            >
                Store
            </Heading>
            <SimpleGrid 
                minChildWidth='20rem' 
                spacing='2rem'
            >
            {
                storeItems.map(item => (
                    <StoreItem {...item} key={item.id} />
                ))
            }   
            </SimpleGrid>
       </Box>
    )
}