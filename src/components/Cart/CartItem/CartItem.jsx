import React from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({ item, onQuantityUpdate, onRemoveItem }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia image={item.image.url} src={item.image.url} title={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant='h5' >{item.name}</Typography>
                <Typography variant='h6' >{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={() => onQuantityUpdate(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small'  onClick={() => onQuantityUpdate(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={() => onRemoveItem(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem