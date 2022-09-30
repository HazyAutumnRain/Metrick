// @ts-nocheck
import { Box, Button, Drawer, Link, Heading, Icon, useDisclosure, useBoolean, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React from 'react'

const Navbar = () => {

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [ lofiFlag, setLofiFlag ] = useBoolean()
	const [ coffeeFlag, setCoffeeFlag ] = useBoolean()
	const [ animeFlag, setAnimeFlag ] = useBoolean()
	const btnref = React.useRef()

	return (
		<Box color='white' display='flex' justifyContent='space-between' padding={4} alignItems='center'>
			<Heading fontSize='xl'>Metrick</Heading>
			<Button ref={btnref} onClick={onOpen} colorScheme={''}><Icon as={ HamburgerIcon }/></Button>

			<iframe id="lofi-girl" class="radio" width="560" height="315" src={lofiFlag ? "https://www.youtube.com/embed/jfKfPfyJRdk?controls=0&autoplay=1&mute=0" : "https://www.youtube.com/embed/jfKfPfyJRdk?controls=0&autoplay=1&mute=1"} title="Lofi Girl Radio" frameborder="0" allow="autoplay;" allowfullscreen></iframe>
			<iframe id="coffee-shop" class="radio" width="560" height="315" src={coffeeFlag ? "https://www.youtube.com/embed/-5KAN9_CzSA?controls=0&autoplay=1&mute=0" : "https://www.youtube.com/embed/-5KAN9_CzSA?controls=0&autoplay=1&mute=1"} title="Coffee Shop Radio" frameborder="0" allow="autoplay;" allowfullscreen></iframe>
			<iframe id="anime-lofi" class="radio" width="560" height="315" src={animeFlag ? "https://www.youtube.com/embed/WDXPJWIgX-o?controls=0&autoplay=1&mute=0" : "https://www.youtube.com/embed/WDXPJWIgX-o?controls=0&autoplay=1&mute=1"} title="Anime Lofi Radio" frameborder="0" allow="autoplay;" allowfullscreen></iframe>

			<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnref}>
				<DrawerOverlay />
				<DrawerContent color='white' backgroundColor='#242424'>
					<DrawerCloseButton />
					<DrawerHeader>Radio Stations</DrawerHeader>
					<DrawerBody display='flex' flexDirection='column'>
						<Link onClick={setLofiFlag.toggle}>Lofi Girl Radio</Link>
						<Link onClick={setCoffeeFlag.toggle}>Coffee Lofi Radio</Link>
						<Link onClick={setAnimeFlag.toggle}>Anime Lofi Radio</Link>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	)
}

export default Navbar
