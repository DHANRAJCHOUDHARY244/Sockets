import { useEffect, useState } from 'react';
import { Stack, Paper, Typography, Box, Card, CardActionArea, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const xLabels = [
    'E',
    'M',
    'T',
    'a',
    'f',
    'l',
    'm',
    'p',
    'q',
    's'
];

const BTCULine = ({ data, stream, socketId }) => {
    const [uData, setUData] = useState([]);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        const fetchData = async () => {
            const jsonData = await data;
            setUData(jsonData);
        };

        fetchData();
    }, [data]);

    return (
       <>
        {stream ? (<Box>
            <Card sx={{ width: '80%', mt: '10px', mb: '10px', p: '10px' }} >
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Room id:-  {socketId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stream Name:-  {stream}
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
        </Box>):'Loading......'}</>
    );
};

export default BTCULine;
