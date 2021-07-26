import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: "6%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        padding: "0px 0px 20px 0px",
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        textAlign: "center",
        paddingTop: "16px",
    },
    submit1: {
        width: "40%",
        height: '44px',
        borderRadius: "4px",
        margin: '15px 25px 20px 0px',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',

    },
    query: {
        fontSize: "15px",
        fontFamily: "sans-serif",
        fontWeight: "bold",

    },
    query1: {
        fontSize: "16px",
        color: "green",
        fontWeight: "bold",
        fontFamily: " Arial"
    },
    title: {
        textAlign: 'center',
    },
    label: {
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '3vw',

    },
    error: {
        color: 'red',
        marginLeft: '4%',
        marginTop: '0%',
    }
}));
