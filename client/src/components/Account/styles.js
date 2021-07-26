import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    details: {
        margin: '5% 0%',
        fontSize: '1.5rem',
        padding: '5% 0% 5% 10%',
    },
    info: {
        marginBottom: '3%',
        fontSize: '3.2vh',
        fontFamily: "Cambria, Times New Roman, Times, serif",

    },
    data: {
        fontFamily: " monospace",
        fontSize: '3vh',
        marginLeft: '5%',
        textDecoration: 'underline'
        // float: 'right',
        // clear: 'left',

    },
    password: {
        border: 'none',
        backgroundColor: 'inherit',
        // float: 'right',
        fontWeight: 'bold',
        color: 'green',
        fontSize: '1.3rem',

    }

}));