// stripe.button.component.jsx
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price, onToken }) => {
    const priceForStripe = price
    const publishableKey = 'pk_test_51JiZbvSEkwWaUTSyvNRELLUjqY1fRRW0GX0oh5TB6sqw6cSzzxHi0u2706WXYgioF8POzzqXUzuNAmJEi6R1DPz200kRsOr9lS';

    return (
        <StripeCheckout
            label='Pay Now'
            name='CreateWebsiteEasily'
            // billingAddress
            // shippingAddress
            image='/favicon.ico'
            // image='https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png'
            description={`Your have to pay ${price}₹`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            currency="INR"
        />
    )
}

export default StripeCheckoutButton;