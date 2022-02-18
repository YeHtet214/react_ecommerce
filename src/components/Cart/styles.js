import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        padding: '2rem 1rem',
    },
    toolbar: theme.mixins.toolbar,
    title: {
        marginTop: '5%',
    },
    emptyInfo: {
        // fontWeight: 300
        color: '#3339',
    },
    emptyButton: {
        minWidth: '150px',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5px',
        },
        [theme.breakpoints.up('xs')]: {
            marginRight: '20px',
        },
    },
    checkoutButton: {
        minWidth: '150px',
    },
    link: {
        textDecoration: 'none',
    },
    cardDetails: {
        display: 'flex',
        marginTop: '10%',
        width: '100%',
        justifyContent: 'space-between',
    },
}))