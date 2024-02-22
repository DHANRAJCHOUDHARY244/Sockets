import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { Container, Button, Typography, TextField, CardActionArea, Card, CardContent } from '@mui/material'
const Dashboard = () => {

  const [mesg, setMesg] = useState('')
  const [room, setRoom] = useState('')
  const [roomName, setRoomName] = useState('')
  const [socketId, setSocketId] = useState('')
  const socket = useMemo(() => io('http://localhost:3000'), []);
  const [msgArray, setMsgArray] = useState([])
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
      setSocketId(socket.id)
    })
    socket.on('disconnect', () => {
      console.log('disconnected');
    })
    socket.on('message', (data) => {
      setMsgArray((prev) => {
        return [...prev, data]
      })
    })
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    socket.emit('message', { mesg, room, socketId })
    setMesg('')
    setRoom('')

  }
  const JoinRoomHandler = (e) => {
    e.preventDefault()
    socket.emit('join-room', { roomName })
    setRoomName('')

  }



  return (
    <Container>
      <Typography variant='h6' component={'div'}>
        Welcome to socket.io
      </Typography>
      <Typography variant='h5' component={'div'} gutterBottom >
        {socketId}
      </Typography>
      <form onSubmit={JoinRoomHandler} >
        <h5>Join Room</h5>
        <TextField id='outlined-basic' label={'Room Name'} variant='outlined' value={roomName} onChange={(e) => { setRoomName(e.target.value) }} />
        <Button variant='contained' color='primary' type='submit' >Send</Button>
      </form>
      <form onSubmit={submitHandler} >
        <TextField id='outlined-basic' label={'Message'} variant='outlined' value={mesg} onChange={(e) => { setMesg(e.target.value) }} />
        <TextField id='outlined-basic' label={'Room'} variant='outlined' value={room} onChange={(e) => { setRoom(e.target.value) }} />
        <Button variant='contained' color='primary' type='submit' >Send</Button>
      </form>

      <Container>
        {/* {console.log(msgArray)} */}
        {msgArray.map((item, index) => (
          <Card sx={{ width:'80%',mt:'10px',mb:'10px',p:'10px' }} key={index}>
            <CardActionArea>
              <Typography gutterBottom variant="h6" component="div">
                Sender id:-  {item.socketId}
              </Typography>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Room id:-  {item.room}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.mesg}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>

    </Container>
  )
}

export default Dashboard