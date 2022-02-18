import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    media: {
        maxHeight: 50,
        objectFit: 'cover',
        paddingTop: '54.98%',
        margin: 'auto',
    },
    description: {
        fontSize: '.5rem',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

