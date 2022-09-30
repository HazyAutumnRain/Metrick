import { Box, Button, Flex } from '@chakra-ui/react'
import Navbar from './Navbar'
import Timer from './Timer'
import Note from './Note'

const App = () => {
  return (
    <Box>
      <Navbar />
      <Timer seconds={0} />
      <Note />
    </Box>
  )
}

export default App



