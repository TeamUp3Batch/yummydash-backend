const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrderByStripe = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 100000, // Amount in cents
          currency: 'cad',
        });
    console.log("opayment intent",paymentIntent)
        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}

module.exports = {
    placeOrderByStripe,
}
