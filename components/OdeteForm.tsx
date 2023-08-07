import { useEffect, useState } from 'react';
import { sayInput, populateVoiceList} from '../api';
import { IconButton, Container } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import useSpeechRecognition from './hooks/useSpeechRecognitionHook'
import ContentChat from './ContentChat';
import Message from './Message';
import {type ChatGPTMessage} from './Message';
import { useCookies } from 'react-cookie'

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

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
  const [cookie, setCookie] = useCookies([COOKIE_NAME])
  // const [pitch, setPitch] = useState<number>(1);
  // const [rate, setRate] = useState<number>(1);
  // const [focus, setFocus] = useState(false);
  // const array = [{content: 'Seja bem vindo.', fromUser: false},{content: 'Como fazer uma extração CSV?', fromUser: true}]
  
  // interface Mensagens {
  //   content: string,
  //   fromUser: boolean
  // }
  // let array: Array<Mensagens> = [];

  const initialMessages: ChatGPTMessage[] = [
    {
      role: 'assistant',
      content: 'Oi! Sou sua assistente. Me pergunte qualquer coisa!',
    },
  ]
  
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const {
    text,
    startListening, 
    stopListening, 
    isListening, 
    hasRecognitionSupport
  } = useSpeechRecognition();
  const [isClient, setIsClient] = useState(false)

  // useEffect(() => {
  //   const fetchVoices = () => {
  //     try {
  //       window.speechSynthesis.onvoiceschanged = () => {
  //         const data = populateVoiceList();
  //         setVoiceList(data);
  //       };
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchVoices();
  // }, []);

  // useEffect(() => {
  //   setVoiceOptions(
  //     voiceList.length ? (
  //       voiceList?.map(({ name, lang }: voiceProps, i: number) => (
  //         <MenuItem value={name} key={i}>
  //           {name} - {lang}
  //         </MenuItem>
  //       ))
  //     ) : (
  //       <MenuItem value='Alex'>Odete</MenuItem>
  //     )
  //   );
  // }, [voiceList]);

  // useEffect(() => {
  //   setVoice((prevVoice: any) =>
  //     voiceList.length > 0
  //       ? voiceList?.filter((voice: any) => voice.default)[0].name
  //       : prevVoice
  //   );
  // }, [voiceList]);

  useEffect(() => {
    setIsClient(true);
    // let mensagemData: Mensagens = {
    //   content: 'Seja bem vindo.',
    //   fromUser: false
    // }
    // array.push(mensagemData)
  }, []);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie])



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    textInput.length && sayInput(textInput, 'Microsoft Maria - Portuguese (Brazil)', 0, 1.25);
  };

  const enviar = () => {
    // let mensagemData: Mensagens = {
    //   content: `${textInput}`,
    //   fromUser: true
    // }
    // textInput !== '' &&
    // array.push(mensagemData)
    // setMessages(array.concat(messages))
    // setTextInput('')
    // console.log(messages)
  }

  const sendMessage = async (message: string) => {
    // setLoading(true)
    setTextInput('')
    const newMessages = [
      ...messages,
      { role: 'user', content: message } as ChatGPTMessage,
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    const response = await fetch('./api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    })

    console.log('Edge function returned.')

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let lastMessage = ''

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      lastMessage = lastMessage + chunkValue

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage } as ChatGPTMessage,
      ])

      // setLoading(false)
    }
  }

  return (
    <>{ isClient &&
    <Box textAlign='center'>
      <ContentChat>
          {
            messages.map(({ content, role }, index) => (
              <Message content={content} role={role} key={index}/>
            ))
          }
          <IconButton
            sx={{
              width: "2.7rem",
              position: 'absolute',
              alignSelf: 'end',
            }}
            onClick={startListening}
          > <HeadsetIcon sx={{fontSize: 25}} />
          </IconButton>
      </ContentChat>
      <form autoComplete='off' onSubmit={handleSubmit}>
        {/* <FormControl
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
        </FormControl> */}
        <FormControl fullWidth>
          <TextField
            onChange={(e) => setTextInput(e.target.value)}
            label='Insira o Texto'
            variant='outlined'
            color='warning'
            multiline
            rows={4}
            required
            sx={{ mb: 4 }}
            value={text ? text : textInput}
            onKeyDown={(e) => (e.key === 'Enter' && !e.shiftKey) && sendMessage(textInput)}
          />
          { hasRecognitionSupport && 
            <IconButton
              sx={{
                width: "2.7rem",
              alignSelf: 'end',
              marginTop: '-4.8rem',
              }}
              onClick={startListening}
            ><MicIcon sx={{fontSize: 25}}/></IconButton>
          }
          <IconButton
            sx={{
              width: "2.7rem",
              alignSelf: 'end',
              marginTop: '-5.4rem',
            }}
            onClick={() => sendMessage(textInput)}
          >
            <SendIcon sx={{fontSize: 25} }/>
          </IconButton>
        </FormControl>
        <ButtonGroup aria-label='Talkify Controls' sx={{mt: 10}}>
          <Button
            type='submit'
            variant='contained'
            color='warning'
            size='large'
            disableElevation
            onClick={() => textInput ? setTextInput(textInput) : setTextInput(text)}
          >
            Fale Comigo
          </Button>
          <Button
            variant='contained'
            color='secondary'
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
