import { makeStyles } from '@mui/styles';

interface MessageProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  footer: {
    border: 'thin solid rgba(0,0,0,.2)',
    borderRadius: '.5rem .5rem .5rem 0',
    padding: '.5rem',
    bottom: 0,
    width: 'fit-content',
    height: 'fit-content',
    textAlign: 'left',
    background: '#00000099',
    margin: '0 auto',
    marginBottom: '.5rem',
    alignSelf: 'left',
    color: 'white',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)',
  },
});

const Footer: React.FC<MessageProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.footer}>{children}</div>;
};

export default Footer;
