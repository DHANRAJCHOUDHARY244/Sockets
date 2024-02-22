import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import BTCULine from './graphs/BTCULine';
import MiniTracker from './graphs/MiniTracker';

const WebSockets = () => {
  const socket = useMemo(() => io('http://localhost:3000'), []);
  const [socketId, setSocketId] = useState('');
  const [miniTicker, setminiTicker] = useState([]);
  const [aggTrade, setaggTrade] = useState([]);
 


  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
      setSocketId(socket.id)
    })
    socket.on('disconnect', () => {
      console.log('disconnected');
    })
    socket.on('miniTickerArr', (data) => {
      setminiTicker(data)
    })
    socket.on('btcusdt@aggTrade', (data) => {
      setaggTrade(data)
    })
  }, [])
  return (
    <div>
      {/* {console.log(miniTicker)} */}
     {aggTrade.data? <BTCULine data={aggTrade.data} stream={aggTrade.stream} socketId={socketId} />:''}
     {miniTicker.data? <MiniTracker data={miniTicker.data} stream={miniTicker.stream} socketId={socketId} />:''}
    </div>
  )
}

export default WebSockets