import { createStyles, fade } from '@material-ui/core/styles';

const textColor = '#263238';
const styles = (theme) =>
  createStyles({
    root: {
      borderRadius: 2 * theme.shape.borderRadius,
    },
    content: {
      padding: theme.spacing(1.5, 2),
      backgroundColor: '#F0F0F0',
      color: textColor,
      '&:last-child': {
        paddingBottom: theme.spacing(1.5),
      },
    },
    title: {
      lineHeight: 1.25,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    token_data: {
      display: 'flex',
      marginTop: theme.spacing(0.5),
      '& > * + *': {
        marginLeft: theme.spacing(1),
      }
    },
    description: {
      marginRight: 'auto',
      flexGrow: 1,
      color: fade(textColor, 0.54),
      '& > p': {
        fontSize: theme.spacing(1.75),
        lineHeight: `${theme.spacing(2.5)}px`,
        letterSpacing: '0.005em',
      }
    },
    data: {
      width: theme.spacing(8.75),
      '& > p': {
        fontSize: theme.spacing(1.5),
        lineHeight: `${theme.spacing(2)}px`,
        fontWeight: theme.typography.fontWeightMedium,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },
  });

export default styles;
