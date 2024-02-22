import { useEffect, useState } from 'react';
import { Stack, Paper, Typography, Box, Card, CardActionArea, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';



const MiniTracker = ({ data, stream, socketId }) => {
    const [uData, setUData] = useState([]);
    const [stream1, setstream1] = useState([]);
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
            setstream1(await stream)
            setUData(jsonData);
        };

        fetchData();
    }, [data]);

    return (
       <>
        {stream ? (<Box>
            <Card sx={{ width: '100%', mt: '10px', mb: '10px', p: '10px' }} >
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
          {uData.map((ITEM, index) => (
  <Stack
    key={index}
    direction={{ xs: 'column', sm: 'row' }}
    spacing={{ xs: 1, sm: 2, md: 4 }}
    mt={5}
  >
    {Object.keys(ITEM).map((key) => (
      <Item key={key} sx={{ backgroundColor: 'rgba(255,255,0,0.5)', marginTop: '20px' }}  >
        <Typography variant="body1" display={'inline'} color="text.primary" sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>{key}</Typography>
        <Typography variant="body2" display={'inline'} color="text.secondary">
          {ITEM[key] ? `${ITEM[key]}` : 'false'}
        </Typography>
      </Item>
    ))}
  </Stack>
))}
        </Box>):'Loading......'}
        </>
    );
};

export default MiniTracker;
