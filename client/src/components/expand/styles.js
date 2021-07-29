import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    media: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
    [theme.breakpoints.down("sm")]: {
        expand: {
            padding: '1.5% 5%',
        },
        card: {
            width: '70%',
            height: '30vh',
            margin: '2% 10%',
        },

        heading: {
            fontSize: '2rem',
            margin: '0% 10%',
            fontFamily: 'fell, Georgia, Cambria, "Times New Roman", Times, serif',
        },
        info: {
            fontSize: 15,
            margin: '1% 15% 5% 10%',

        },
        post: {
            fontFamily: "Cambria, Times New Roman, Times, serif",
            margin: '5% 15% 2% 10%',
            fontSize: 10,
            whiteSpace: 'pre-wrap',
            wordSpacing: '3px',
        },

    },
    [theme.breakpoints.up("sm")]: {
        expand: {
            padding: '1.5% 9%',
        },
        card: {
            width: '50%',
            height: '50vh',
            margin: '0% 15%',
        },
        heading: {
            fontSize: '3rem',
            margin: '0% 15%',
            fontFamily: 'fell, Georgia, Cambria, "Times New Roman", Times, serif',
        },
        info: {
            fontSize: 15,
            margin: '1% 15% 2% 15%',

        },
        post: {
            fontFamily: "Cambria, Times New Roman, Times, serif",
            margin: '2% 15% 2%',
            fontSize: 22,
            whiteSpace: 'pre-wrap',
            wordSpacing: '3px',
        },

    },

    close: {
        position: 'sticky',
        top: 0,
        padding: '0.5%',
    },
    like: {

        position: 'sticky',
        bottom: 0,

    },
    likes: {
        fontFamily: "Times New Roman, Times, serif",
        fontSize: 18,
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '2%',
    },
    likeicon: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '1%',

    }




}));