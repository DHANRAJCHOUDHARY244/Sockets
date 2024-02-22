import { useEffect, useMemo, useState } from 'react';
import { Stack, Paper, Typography, Box, Card, CardActionArea, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { io } from 'socket.io-client'

const xLabels = [
    'E',
    'U',
    'e',
    's',
    'u',
];

const MiniTracker = () => {
    const socket = useMemo(() => io('http://localhost:3000'), []);
    const [Aarray, setaArray] = useState([]);
    const [Barray, setbArray] = useState([]);
    const [uData, setUData] = useState([]);
    const [socketId, setSocketId] = useState('');
    const [stream1, setstream1] = useState([]);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    useEffect(() => {
        socket.on('connect', () => {
            console.log('connect');
            setSocketId(socket.id)
        })
        socket.on('disconnect', () => {
            console.log('disconnected');
        })
        socket.on('btcusdt@depth', (data) => {
            setUData(data.data)
            setstream1(data.stream)
            setaArray(data.data.a)
            setbArray(data.data.b)
            // console.log(data);
        })
    }, [])
    return (
        <>
        {stream1 ? (<Box>
            <Card sx={{ width: '80%', mt: '10px', mb: '10px', p: '10px' }} >
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Room id:-  {socketId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stream Name:-  {stream1}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={5}
            >
                {xLabels.map((item) => (
                    <Item key={item} sx={{ backgroundColor: 'rgba(255,255,0,0.5)', marginTop: '20px' }}  >
                        <Typography variant="body1" display={'inline'} color="text.primary" sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>{item}</Typography>
                        <Typography variant="body2" display={'inline'} color="text.secondary">{
                            uData[item] ? `${uData[item]}` : 'false'
                        }</Typography>
                    </Item>
                ))}
            </Stack>
            <Box width={'100%'} sx={{display:'flex',gap:5}}>
                <Box display={'inline'}>
                    {Aarray.map((item,index)=>(
                         <Stack key={index}
                         direction={{ xs: 'column', sm: 'row' }}
                         spacing={{ xs: 1, sm: 2, md: 4 }}
                         mt={5}
                     >
                             <Item  sx={{ backgroundColor: 'rgba(255,255,0,0.5)', marginTop: '20px' }}  >
                                 <Typography variant="body1" display={'inline'} color="text.primary" sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>| A0 | </Typography>
                                 <Typography variant="body2" display={'inline'} color="text.secondary">{
                                     item[0] ? `${item[0]}` : 'false'
                                 }</Typography>
                             </Item>
                             <Item  sx={{ backgroundColor: 'rgba(255,255,0,0.5)', marginTop: '20px' }}  >
                                 <Typography variant="body1" display={'inline'} color="text.primary" sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>| A1 | </Typography>
                                 <Typography variant="body2" display={'inline'} color="text.secondary">{
                                     item[1] ? `${item[1]}` : 'false'
                                 }</Typography>
                             </Item>
                     </Stack>
                    ))}
                </Box>
                <Box display={'inline'}>
                {Barray.map((item,index)=>(
                         <Stack key={index}
                         direction={{ xs: 'column', sm: 'row' }}
                         spacing={{ xs: 1, sm: 2, md: 4 }}
                         mt={5}
                     >
                             <Item  sx={{ backgroundColor: 'rgba(255,255,0,0.5)', marginTop: '20px' }}  >
                                 <Typography variant="body1" display={'inline'} color="text.primary" sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>| B0 | </Typography>
                                 <Typography variant="body2" display={'inline'} color="text.secondary">{
                                     item[0] ? `${item[0]}` : 'false'
                                 }</Typography>
                             </Item>
                             <Item  sx={{ backgroundColor: 'rgba(255,255,0,0.5)', marginTop: '20px' }}  >
                                 <Typography variant="body1" display={'inline'} color="text.primary" sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>| B1 | </Typography>
                                 <Typography variant="body2" display={'inline'} color="text.secondary">{
                                     item[1] ? `${item[1]}` : 'false'
                                 }</Typography>
                             </Item>
                     </Stack>
                    ))}
                </Box>
            </Box>
        </Box>
        ):'Loading......'}</>
    );
};

export default MiniTracker;
