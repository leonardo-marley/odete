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

const initialMessages: ChatGPTMessage[] = [
  {
    role: 'assistant',
    content: 'Oi! Sou sua assistente. Me pergunte qualquer coisa!',
  },
]

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

interface PropsMic {
  onClick: any;
  isActive: boolean;
}

const MicButton = (props: PropsMic) => {
  return(
    <>{ props.isActive === true ?
      <IconButton
        onClick={props.onClick}
      >
        <MicIcon sx={{fontSize: 25}}/>
      </IconButton>
      :
      <IconButton
        onClick={props.onClick}
      >
        <MicOffIcon sx={{fontSize: 25}}/>
      </IconButton>
      }
    </>
  )
}

const OdeteForm = () => {
  const [textInput, setTextInput] = useState('');
  const [cookie, setCookie] = useCookies([COOKIE_NAME])
  const [micAble, setMicAble] = useState(false)
  
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const {
    text,
    esvazia,
    startListening, 
    stopListening, 
    isListening, 
    hasRecognitionSupport
  } = useSpeechRecognition();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
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
    console.log(response)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = await response.body
    console.log(data)
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
    sayInput(lastMessage, 'Microsoft Maria - Portuguese (Brazil)', 0, 1.5)
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
          > <HeadsetOffIcon sx={{fontSize: 25}} />
          </IconButton>
      </ContentChat>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            onChange={(e) => setTextInput(e.target.value)}
            label='Pergunte o que desejar'
            variant='outlined'
            color='warning'
            multiline
            rows={4}
            required
            sx={{ mb: 4 }}
            value={text ? text : textInput}
            onKeyDown={(e) => (e.key === 'Enter' && !e.shiftKey) && textInput !== '' && sendMessage(textInput)}
          />
          { hasRecognitionSupport && 
            <div 
              onClick={() => micAble === false ? setMicAble(true) : setMicAble(false)} 
              style={{width: "2.7rem",
                      alignSelf: 'end',
                      marginTop: '-4.8rem'
                    }}
            >
              <MicButton isActive={micAble} onClick={micAble === false ? startListening : stopListening} />
            </div>
          }
          <IconButton
            sx={{
              width: "2.7rem",
              alignSelf: 'end',
              marginTop: '-5rem',
            }}
            onClick={() => text.length > 0 ? sendMessage(text).then(esvazia()) : textInput.length > 0 && sendMessage(textInput)}
          >
            <SendIcon sx={{fontSize: 25} }/>
          </IconButton>
        </FormControl>
        {/* <ButtonGroup aria-label='Talkify Controls' sx={{mt: 10}}>
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
            onClick={() => console.log(micAble)}
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
        </ButtonGroup> */}
      </form>
    </Box>
    }
    </>
  );
};

export default OdeteForm;
