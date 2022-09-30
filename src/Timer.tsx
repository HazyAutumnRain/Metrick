// @ts-nocheck
import { Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const Timer = ({seconds}) => {
	seconds = 0
	const [ timer, setTimer ] = useState(seconds)
	const [ minutes, setMinutes ] = useState(Math.floor(localStorage.getItem('studied') / 60))
	const [ secs, setSecs ] = useState(localStorage.getItem('studied') - (minutes * 60))
	let minutesGone = Math.floor(timer / 60)
	let secondsGone = timer - (minutesGone * 60)
	let minuteClass = ""


	useEffect(() => {
		const intId = setInterval(() => {
			setTimer((t) => t + 1)
			var getTime = parseInt(localStorage.getItem('studied')) + 1
			localStorage.setItem('studied', getTime)
			setMinutes(Math.floor(getTime / 60))
			setSecs(getTime - (minutes * 60))
		},1000)
		return () => clearInterval(intId)
	}, [])

	if (minutesGone != 0) {minuteClass = ""} else {minuteClass = "hidden"}

	return (
		<Box display='flex' justifyContent='center' paddingBottom='12'>
			<Box position='absolute' left='4' color='whiteAlpha.300'>
				<Text fontSize='xl' color='whiteAlpha.600'>Study Stats</Text>
				<Text>Minutes Studied: {minutes}</Text>
				<Text>Seconds Studied: {secs}</Text>
			</Box>
			<Text fontWeight='bold' fontSize='4xl' className={minuteClass} marginRight={''} color='white'>{minutesGone}</Text>
			<Text fontSize='2xl' color='white'>{secondsGone}</Text>
		</Box>
	)
}

export default Timer
