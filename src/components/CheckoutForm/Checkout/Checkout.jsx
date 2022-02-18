import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, Divider, CircularProgress, Button, CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';

import commerce from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error, timeout, isFinished }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
               
                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }

        generateToken(); 
    }, [cart]);

    const goNextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1 );
    const goPreviousStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1 );

    const next = (data) => {
        setShippingData(data);

        goNextStep();
    }

    const Confirmation = () => (
        order.cutstomer ? (
            <>
                <div>
                    <Typography variant='h5' >Thank you for your purchase {order.cutsomer.firstname} {order.customer.lastname}</Typography>   
                    <Divider className={classes.divider} /> 
                    <Typography variant='subtitle2'>Order ref:{order.customer_reference}</Typography>
                </div>    
                <br />
                <Button component={Link} to='/' variant='outlined' type='button'>Back To Home</Button>
            </>
        ) : isFinished ? (
            <>
                <div>
                    <Typography variant='h5' >Thank you for your purchase</Typography>   
                    <Divider className={classes.divider} /> 
                </div>    
                <br />
                <Button component={Link} to='/' variant='outlined' type='button'>Back To Home</Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        ) 
    );

    if (error) {
        // timeout is called in error to show the order summary in anyways just for testing purpose
        timeout(); 
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button type='button' variant='outlined' component={Link} to='/'>Back to Home</Button>
        </>
    }

    const Form = () => (
        activeStep === 0 
        ? <AddressForm checkoutToken={checkoutToken} next={next}  />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={next} backStep={goPreviousStep} onCaptureCheckout={onCaptureCheckout} />
    );
    
    return (
        <>
            <CssBaseline />
            <div className={classes.toolBar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>step</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout