import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

// Custom Styling
const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: '10px 0',
    },
    total: {
        fontWeight: 700,
    },
    totalItem: {
        paddingLeft: 0,
        paddingRight: 0,
    }
}))

const Reviews = ({ checkoutToken }) => {
    const classes = useStyles();
    
    return (
        <>
            <Typography variant='h6' gutterBottom>Order Summery</Typography>
            <List disablePadding className={classes.root}>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem, classes.totalItem} >
                    <ListItemText primary='Total' />
                    <Typography className={classes.total} variant='subtitle1'>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Reviews