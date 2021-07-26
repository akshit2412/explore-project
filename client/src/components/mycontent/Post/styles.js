import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    card1: {
        height: '200px',
        width: '100%',
        background: '#212121',
        marginBottom: '5%',
        marginTop: '2%',

    },
    media: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        position: 'relative',
        margin: '3% 3% 7% 3%',
        height: '480px',
        background: '#212121',
    },

    overlay4: {
        position: 'absolute',
        top: '20px',
        right: '10px',
        cursor: 'pointer',
        color: 'white',
    },
    title: {
        // fontWeight: 'bold',
        fontSize: '1.4rem',
        margin: '3% 0% 3%',
        fontFamily: 'fell, Georgia, Cambria, Times New Roman, Times, serif',
        color: 'white',


    },
    post: {
        whiteSpace: 'pre-wrap',
        fontFamily: 'arial',
        fontSize: '15px',
        letterSpacing: '0.5px',
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
        bottom: '7%',


    },
    more: {
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'arial',
        letterSpacing: '1px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'inherit',
        color: 'white',
    },
    info: {
        fontSize: '0.9rem',
        marginBottom: '3%',
        marginLeft: '2%',
        fontFamily: 'fell, Georgia, Cambria, Times New Roman, Times, serif',
        color: 'white',
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
        color: 'white',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: 'bold',
        marginRight: '12px',
        color: 'white',
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '4%',

    },
    play: {
        border: 'none',
        backgroundColor: 'inherit',

    },
    items: {
        fontFamily: 'fell, Georgia, Cambria, Times New Roman, Times, serif'
    },
    delete: {
        textAlign: 'center',
        fontFamily: 'Georgia',
    },
    deletebutton: {
        margin: '2% 2% 2% 2%',
        border: 'none',
        borderRadius: '5%',
        backgroundColor: 'inherit',
        fontSize: '1.2rem',
        boxShadow: theme.shadows[3],
        padding: '0% 5%',
        fontFamily: 'monospace',


    },
    deleteTitle: {
        fontSize: '1.4rem',
        marginTop: '2%',
    }



}));