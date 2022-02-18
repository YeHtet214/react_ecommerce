import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Linkt } from 'react-router-dom';
import { CardElement, PaymentElement, Elements, useElements, ElementsConsumer, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Reviews from './Reviews';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51KUBqGEWeizE607MXScqgQBuSynIEqnzqoTRBxtNWV9nuBEgzSvOOYyJxM5UvmCBxOa4JLbL9ABeFatOWqthaVxA00qNX41gFR');

class PaymentForm extends React.Component {

  render () {
    const checkoutToken = this.props.checkoutToken;
    const shippingData = this.props.shippingData;
    const onCaptureCheckout = this.props.onCaptureCheckout;
  
    const handleSubmit = async (event, elements, stripe ) => {
      event.preventDefault();

      if (!elements || !stripe) return;

      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

      if (error) {
        console.log(error)
      } else {
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
          shipping: {
            name: 'Primary',
            street: shippingData.address1,
            city_town: shippingData.city,
            country_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
          },
          fulfillment: { shipping_payment: shippingData.shippingOption},
          payment: {
            gateway: 'stripe',
            stripe: {
              payment_method_id: paymentMethod.id,
            }
          }
        }

        onCaptureCheckout(checkoutToken.id, orderData);

        this.props.nextStep();
      }
    }
    return (  
        <>
          <Reviews checkoutToken={checkoutToken} />
          <Divider />
          <Typography variant='h6' gutterBottom style={{ margin: '20px 0'}}>Payment methods</Typography>
          <Elements stripe={stripePromise}>
            <ElementsConsumer> 
              {({elements, stripe}) => (
                <form onSubmit={e => handleSubmit(e, elements, stripe)}>
                  <CardElement style={{ width: '100%' }} />
                  <br /> <br />
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant='outlined' onClick={this.props.backStep}>Back</Button>
                    <Button type='submit' variant='contained' color='primary' >
                      Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Button>
                  </div>
                </form>
               )} 
            </ElementsConsumer>
          </Elements>
        </>
    )
  }
}

export default PaymentForm