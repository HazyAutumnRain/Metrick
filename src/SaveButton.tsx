// @ts-nocheck
import { Box, AlertDialog, Text, AlertDialogBody, AlertDialogContent, Icon, AlertDialogFooter, Button, AlertDialogHeader, useDisclosure, AlertDialogOverlay, Input} from '@chakra-ui/react'
import { AiFillSave } from 'react-icons/ai'
import React from 'react'
const fs = require('fs')


const SaveButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = React.useRef()
	const inputRef = React.useRef()

	const handleSave = () => {
		console.log("saving")
		console.log(inputRef.current.value)
		fs.writeFile("./"+inputRef.current.value+".md", )

	}

	return (
		<Box>
			<Button onClick={onOpen} colorScheme={''}><Icon as={ AiFillSave } /></Button>


		</Box>
	)
}

export default SaveButton
