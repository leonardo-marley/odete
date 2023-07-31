import { makeStyles } from '@mui/styles';

interface FooterProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  footer: {
    display: 'grid',
    border: 'thin solid rgba(0,0,0,.2)',
    borderRadius: '.3rem',
    padding: '1rem',
    bottom: 0,
    width: '100%',
    height: '15rem',
    textAlign: 'center',
    background: 'white',
    margin: '0 auto',
    marginBottom: '.5rem',
    overflowY: 'auto',
  },
});

const Footer: React.FC<FooterProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.footer}>{children}</div>;
};

export default Footer;
