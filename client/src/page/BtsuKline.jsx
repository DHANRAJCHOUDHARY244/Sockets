import { useEffect, useMemo, useState } from 'react';
import { Stack, Paper, Typography, Box, Card, CardActionArea, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { io } from 'socket.io-client'

const xLabels = [
    'E',
    'e',
    's',
];

const Klabels = [
    'B',
    'L',
    'Q',
    'T',
    'V',
    'c',
    'f',
    'h',
    'i',
    'l',
    'n',
    'o',
    'q',
    's',
    't',
    'v',
    'x',
]

const BtsuKline = () => {
    const socket = useMemo(() => io('http://localhost:3000'), []);
    const [Karray, setKArray] = useState([]);
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
        socket.on('btcusdt@kline_1d', (data) => {
            setUData(data.data)
            setstream1(data.stream)
            setKArray(data.data.k)
            console.log(data);
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
                <br />
                <br />
                <Typography gutterBottom variant="h5" component="div">
                               ------------------- K index data--------------------
                            </Typography>
                            <Stack
                            sx={{display:'flex',flexWrap:'wrap',gap:3}}
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    mt={5}
                >
                    {Klabels.map((item) => (
                        <Item key={item} sx={{ backgroundColor: 'rgba(255,255,0,0.5)', marginTop: '20px' }}  >
                            <Typography variant="body1" display={'inline'} color="text.primary" sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>K:- {item}</Typography>
                            <Typography variant="body2" display={'inline'} color="text.secondary">{
                                Karray[item] ? `${Karray[item]}` : 'false'
                            }</Typography>
                        </Item>
                    ))}
                </Stack>
            </Box>
            ) : 'Loading......'}</>
    );
};

export default BtsuKline;
