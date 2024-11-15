import { makeStyles, propsToClassKey } from '@mui/styles';

// interface MessageProps {
//   content: string,
//   fromUser?: boolean,
//   key?: number
// }

type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

const useStyles = makeStyles({
  chat: {
    border: 'thin solid rgba(0,0,0,.2)',
    borderRadius: '.5rem .5rem .5rem 0',
    padding: '.5rem',
    bottom: 0,
    width: 'fit-content',
    maxWidth: '70%',
    height: 'fit-content',
    textAlign: 'left',
    background: '#00000099',
    margin: '0',
    marginBottom: '.5rem',
    alignSelf: 'left',
    color: 'white',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)',
    display:'grid'
  },
  user: {
    border: 'thin solid rgba(0,0,0,.2)',
    borderRadius: '.5rem .5rem 0 .5rem',
    padding: '.5rem',
    bottom: 0,
    width: 'fit-content',
    height: 'fit-content',
    maxWidth: '70%',
    textAlign: 'right',
    background: '#ed6c02',
    marginBottom: '.5rem',
    position: 'relative',
    alignSelf: 'self-end',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)',
    flexDirection: 'column'
  },
});

const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br/>
    </span>
  ))

const Footer: React.FC<ChatGPTMessage> = ({content, role}) => {
  const classes = useStyles();
  const formatteMessage = convertNewLines(content)

  return <div className={role==='user' ? classes.user : classes.chat}>{formatteMessage}</div>;
};

export default Footer;
