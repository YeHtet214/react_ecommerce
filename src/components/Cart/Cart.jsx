import React from 'react';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Cart = ({ cart, handleItemQtyUpdate, handleRemoveCartItem, handleEmptyCart }) => {

    const classes = useStyles();

    const EmptyCart = () => <Typography variant='h6' className={classes.emptyInfo} >There is no items in the cart, 
        <Link to='/' className={classes.link}>start adding some</Link>!
    </Typography>

    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3} >
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id} >
                            <CartItem 
                                item={item} 
                                onQuantityUpdate={handleItemQtyUpdate} 
                                onRemoveItem={handleRemoveCartItem}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails} >
                    <Typography variant='h4' >Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} type='button' size='large' color='secondary' variant='contained' onClick={handleEmptyCart} >Empty Cart</Button>
                        <Button component={Link} to='/checkout' className={classes.checkoutButton} type='button' size='large' color='primary' variant='contained' >Checkout</Button>
                    </div>
                </div>
            </>
        )
    }

    if (!cart.line_items) return 'Loading...';

    return (
        <Container className={classes.root}>
            <div className={classes.toolBar} />
            <Typography variant='h4' className={classes.title} gutterBottom >Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart