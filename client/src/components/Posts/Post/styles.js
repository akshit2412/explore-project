import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        position: 'relative',
        margin: '3% 3% 7% 3%',
        height: '525px',
        background: '#212121',
    },
    creator: {
        fontWeight: 'bold',

    },
    card1: {
        height: '210px',
        width: '100%',
        background: '#212121',
        marginBottom: '5%',
        marginTop: '4%',
    },
    media: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',

    },
    title: {
        // fontWeight: 'bold',
        fontSize: '1.6rem',
        margin: '2% 2% 1%',
        fontFamily: 'fell, Georgia, Cambria, Times New Roman, Times, serif',
        color: 'white',

    },
    post: {
        whiteSpace: 'pre-wrap',
        fontFamily: 'arial',
        fontSize: '15px',
        letterSpacing: '0.5px',
        margin: '0% 2%',
        color: 'white',


    },
    love: {
        position: 'absolute',
        bottom: '3%',
        left: '7%',
        fontWeight: 'bold',
        fontFamily: 'monospace,sans-serif',
        color: 'white',

    },

    readmore: {
        // display: 'flex',
        // justifyContent: 'flex-end',
        position: 'absolute',
        right: '5%',
        bottom: '8%',

    },
    more: {
        fontWeight: 'bold',
        fontSize: '13px',
        fontFamily: 'arial',
        letterSpacing: '1px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'inherit',
        color: 'white',
    },
    info: {
        fontSize: '0.85rem',
        marginBottom: '1%',
        marginLeft: '2%',
        fontFamily: 'monospace',
        color: 'white',

        textTransform: 'uppercase'
        // display: 'flex',
        // justifyContent: 'flex-end',

    },
    head: {
        marginTop: '2%',
        marginBottom: '6%',
        // display: 'flex',
        // justifyContent: 'space-between',
    },
    pen: {
        width: '1.8vh',
        height: '1.8vh'
    },
    date: {
        fontSize: '0.85rem',
        fontWeight: 'bold',
        marginLeft: '2%',
        color: 'white',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: 'bold',
        marginRight: '4%',
        color: 'white',
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '4%',

    }


});