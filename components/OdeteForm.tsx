import { useEffect, useState } from 'react';
import { sayInput, populateVoiceList} from '../api';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import useSpeechRecognition from './hooks/useSpeechRecognitionHook'

import {
  Box,
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
  Slider,
  TextField,
  InputLabel,
  Button,
} from '@mui/material';

const selectValues = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

interface voiceProps {
  voiceURI: string;
  name: string;
  lang: string;
  default: boolean;
}

const OdeteForm = () => {
  const [textInput, setTextInput] = useState('');
  const [voiceList, setVoiceList] = useState<any>([]);
  const [able, setAble] = useState<boolean>();
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [voice, setVoice] = useState('Alex');
  const [pitch, setPitch] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [focus, setFocus] = useState(false);
  const {
    text,
    startListening, 
    stopListening, 
    isListening, 
    hasRecognitionSupport
  } = useSpeechRecognition();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const fetchVoices = () => {
      try {
        window.speechSynthesis.onvoiceschanged = () => {
          const data = populateVoiceList();
          setVoiceList(data);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchVoices();
  }, []);

  useEffect(() => {
    setVoiceOptions(
      voiceList.length ? (
        voiceList?.map(({ name, lang }: voiceProps, i: number) => (
          <MenuItem value={name} key={i}>
            {name} - {lang}
          </MenuItem>
        ))
      ) : (
        <MenuItem value='Alex'>Odete</MenuItem>
      )
    );
  }, [voiceList]);

  useEffect(() => {
    setVoice((prevVoice: any) =>
      voiceList.length > 0
        ? voiceList?.filter((voice: any) => voice.default)[0].name
        : prevVoice
    );
  }, [voiceList]);

  useEffect(() => {
    setIsClient(true)
  }, []);



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    textInput.length && sayInput(textInput, voice, pitch, rate);
  };



  return (
    <>{ isClient &&
    <Box textAlign='center'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <FormControl
          sx={{ width: '25%', minWidth: '150px', m: '0.5rem 0.5rem 1.5rem' }}
        >
          <InputLabel htmlFor='voices-id'>Vozes</InputLabel>
          <Select
            labelId='voices-id'
            label='Vozes'
            id=''
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            {voiceOptions}
          </Select>
        </FormControl>
        <FormControl
          sx={{ width: '10%', m: '0.5rem 0.5rem 1.5rem', minWidth: '75px' }}
        >
          <InputLabel>Ritmo</InputLabel>
          <Select
            label='Ritmo'
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            {selectValues.map((value, i) => (
              <MenuItem value={value} key={i}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{ width: '10%', m: '0.5rem 0.5rem 1.5rem', minWidth: '75px' }}
        >
          <InputLabel>Tom</InputLabel>
          <Select
            label='Tom'
            defaultValue={pitch}
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
          >
            {selectValues.map((value, i) => (
              <MenuItem value={value} key={i}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            onChange={(e) => setTextInput(e.target.value)}
            label='Insira o Texto'
            variant='outlined'
            color='primary'
            multiline
            rows={8}
            required
            sx={{ mb: 4 }}
            value={text ? text : textInput}
          />
          { hasRecognitionSupport && 
            <IconButton
              sx={{
                width: "3rem",
                position: 'absolute',
                marginTop: '10.5rem',
                marginLeft: '50rem'
              }}
              onClick={startListening}
            ><MicIcon sx={{fontSize: 32} }/></IconButton>
          }
        </FormControl>
        <ButtonGroup aria-label='Talkify Controls'>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            size='large'
            disableElevation
            onClick={() => textInput ? setTextInput(textInput) : setTextInput(text)}
          >
            Fale Comigo
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='large'
            disableElevation
            onClick={() => window.speechSynthesis.pause()}
          >
            Pausar
          </Button>
          <Button
            variant='contained'
            color='success'
            size='large'
            disableElevation
            onClick={() => window.speechSynthesis.resume()}
          >
            Retomar
          </Button>
          <Button
            variant='contained'
            color='error'
            size='large'
            disableElevation
            onClick={() => window.speechSynthesis.cancel()}
          >
            Parar
          </Button>
        </ButtonGroup>
      </form>
    </Box>
    }
    </>
  );
};

export default OdeteForm;
