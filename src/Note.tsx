// @ts-nocheck
import { Icon, Flex, Textarea, Box, Button, Text, Code, Input, useBoolean, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import { writeJsonFile } from 'write-json-file'
import { useState, useRef, useEffect, forwardRef, JSXElementConstructor, ReactElement, ReactFragment, SetStateAction } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import ReactMarkdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import remarkGfm from 'remark-gfm'
import remarkImages from 'remark-images'
import CodeMirror from '@uiw/react-codemirror'
import rehypeHighlight from 'rehype-highlight'
import SaveButton from './SaveButton'
import Theme from './Theme'
import { AiFillSave } from 'react-icons/ai'
const fs = require('fs')

const Note = () => {

	const [ value, setValue ] = useState('')
	const currentVal = useRef('')
	const inputEl = useRef(null)
	const markEl = useRef()
	const [showFlag, setShowFlag ] = useState(0)
	const [ areaClass, setAreaClass ] = useState('')
	const [ notes, setNotes ] = useState([{id: 0, text: ""}])
	const [ openTab, setOpenTab ] = useState(0)
	const tabs: string | number | boolean | ReactFragment | JSX.Element[] | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined = []
	const [ change, setChange ] = useState(0)
	const [ load, setLoad ] = useState(0)
	const md: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | JSX.Element[] | null | undefined = []
	let notesNum: number = parseInt(localStorage.getItem('noNotes')!)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const fileSaveRef = useRef()

	const handleChange = (e: string) => {
		currentVal.current = e
		setValue(currentVal.current)
		notes[openTab].text = e
		//localStorage.setItem('notes0', e)
	}

	const tabClick = () => {
		let newNotes = [...notes, {id: notes.length, text: ""}]
		setNotes(newNotes)
		setOpenTab(notes.length)
		localStorage.setItem('noNotes', String(notesNum+1))
	}

	const changeTextArea = (e: { target: { id: SetStateAction<number> } }) => {
		setOpenTab(e.target.id)
		currentVal.current = notes[openTab].text
		setChange(1)
	}

	/* TO FINISH ANOTHER TIME
	for (var i = 0; i < notesNum; i++) {
		// Loading Notes
		tabs.push(<Button key={i} id={i} onClick={changeTextArea} borderBottomLeftRadius='0' borderBottomRightRadius='0' colorScheme='' border='1px solid rgba(255,255,255,0.1)'>{i}</Button>)
		console.log(notes[i])
		if (i == 0) {notes[i].text = localStorage.getItem('notes'+i)}

	}
	*/

	useEffect(() => {
		inputEl.current!.value = notes[openTab].text
		currentVal.current = inputEl.current!.value
		inputEl.current!.id = areaClass
		//console.log(openTab)
		//console.log(inputEl.current.value)
		//console.log(markEl.current.innerHTML)
		//console.log(currentVal.current)
		//console.log(md)
		if (change == 1) {
			//idk what did here but it works so dont touch it
			md[0] = (<p>Bruh</p>)
			setChange(0)
		}
	})

	notes.forEach((obj) => {
		tabs.push(<Button key={obj.id} id={obj.id} onClick={changeTextArea} borderBottomLeftRadius='0' borderBottomRightRadius='0' colorScheme='' border='1px solid rgba(255,255,255,0.1)'>{obj.id}</Button>)
	})

	const handleShow = (e) => {
		if (showFlag == 0) {
			//change icon and hide input
			setShowFlag(1)
			setAreaClass('hide')
		} else {
			setShowFlag(0)
			setAreaClass('input')
		}
	}

	const handleSaving = () => {
		console.log("saving")
    //console.log(inputEl.current.value)
    //console.log(fileSaveRef.current.value)
    fs.writeFile('/saves/' + fileSaveRef.current.value + ".md" , inputEl.current.value, err => {
      if (err) {console.error(err)}
    })
    onClose.call()

	}

	const codeOnLoad = (e) => {
		console.log(notes)
	}


	return (
		<Flex direction='column' alignItems='left' justify='center' marginTop='4'>
			<Flex>
				{tabs}
				<Button onClick={tabClick} colorScheme={''}><Icon as={ AddIcon } /></Button>
				<Button colorScheme={''} onClick={ handleShow }><Icon as={showFlag ? RiEyeCloseFill : RiEyeFill} /></Button>
				<Button colorScheme={''} onClick={onOpen}><Icon as={AiFillSave} /></Button>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Saving File</AlertDialogHeader>

              <AlertDialogBody>
                <Text>Insert Name Of File</Text>
                <Input ref={fileSaveRef} type='text' />
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={handleSaving} marginRight={'6'}>Save</Button>
                <Button ref={cancelRef} onClick={onClose} colorScheme={'red'}>Cancel</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
			</Flex>
			<Box display='flex' onLoad={codeOnLoad}>
				{/*
				<Textarea id={areaClass} color='white' focusBorderColor='none' resize='none' ref={inputEl} w='50%' h='200px'  autoFocus value={value} onChange={handleChange} placeholder='Take notes here...' borderTopLeftRadius='0' border='none'/>
				*/}
				<CodeMirror className="editor" ref={inputEl} theme={okaidia} id={areaClass} value={currentVal.current} onChange={handleChange} extensions={[markdown({ base: markdownLanguage, codeLangauges: languages})]} />
				<Box ref={markEl} color='white' marginLeft={12}>
					<ReactMarkdown remarkPlugins={[remarkGfm, remarkImages]} skipHtml>{currentVal.current}</ReactMarkdown>
					{md}
				</Box>
			</Box>
		</Flex>
	)
}

export default Note
