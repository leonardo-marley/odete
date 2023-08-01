import { makeStyles, propsToClassKey } from '@mui/styles';

interface MessageProps {
  content: string,
  fromUser?: boolean,
  key?: number
}

const useStyles = makeStyles({
  chat: {
    border: 'thin solid rgba(0,0,0,.2)',
    borderRadius: '.5rem .5rem .5rem 0',
    padding: '.5rem',
    bottom: 0,
    width: 'fit-content',
    height: 'fit-content',
    textAlign: 'left',
    background: '#00000099',
    margin: '0',
    marginBottom: '.5rem',
    alignSelf: 'left',
    color: 'white',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)',
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
  },
});

const Footer: React.FC<MessageProps> = ({content,fromUser}) => {
  const classes = useStyles();

  return <div className={fromUser===true ? classes.user : classes.chat}>{content}</div>;
};

export default Footer;
