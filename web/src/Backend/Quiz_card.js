import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";


const card = (
    <>
      <CardContent>
          <FormControl required={true} sx={{width: '25ch'}}>
              <InputLabel>Spørgsmål</InputLabel>
              <Input id={"question"} />
          </FormControl>

          <FormControl sx={{width: '25ch'}}>
              <InputLabel>Korrekt svar</InputLabel>
              <Select value={0}
              label={"Korrekt svar"}
              >
                  <MenuItem value={0}>Svar A</MenuItem>
                  <MenuItem value={1}>Svar B</MenuItem>
                  <MenuItem value={2}>Svar C</MenuItem>
                  <MenuItem value={3}>Svar D</MenuItem>
              </Select>
          </FormControl>
          <br />

          <FormControl required={true} sx={{width: '25ch'}}>
              <InputLabel>Svar A</InputLabel>
              <Input id={"answerA"} />
          </FormControl>

          <FormControl required={true} sx={{width: '25ch'}}>
              <InputLabel>Svar B</InputLabel>
              <Input id={"answerB"} />
          </FormControl>
          <br />

          <FormControl required={true} sx={{width: '25ch'}}>
              <InputLabel>Svar C</InputLabel>
              <Input id={"answerC"} />
          </FormControl>

          <FormControl required={true} sx={{width: '25ch'}}>
              <InputLabel>Svar D</InputLabel>
              <Input id={"answerD"} />
          </FormControl>
      </CardContent>

      <CardActions>
        <Button size="small" variant={"contained"} >Gem spørgsmål</Button>
      </CardActions>
    </>
);

export default function OutlinedCard() {
  return (
      <Box maxWidth={"500px"} alignItems={"center"} display={'flex'}>
        <Card variant="outlined">{card}</Card>
      </Box>
  );
}