import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        marginBottom: '1%',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        marginRight: '2%',
        marginTop: '1%',
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    but: {
        fontSize: '17px',
        fontWeight: 'bold',
        color: 'black',
        marginRight: '20px',
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    user: {
        marginRight: '5%',
        marginTop: '0.9%'

    },
    title: {
        marginLeft: '4%',
        marginTop: '1%'
    },
    icon: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'Black',
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    signin: {
        background: 'linear- gradient(45deg, #2196F3 30 %, #21CBF3 90 %)',
        width: '100px',
        height: '35px'
    },
    purple: {
        backgroundColor: '#4f4f52',
        height: '38px',
        width: '38px',
        cursor: 'pointer',
    },
    items: {
        fontFamily: 'fell, Georgia, Cambria, Times New Roman, Times, serif',
        fontSize: '100%',

    }

    

}));


