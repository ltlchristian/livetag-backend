const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const stripeController = {
  async getStripe(req, res) {
    let { amount, id } = req.body;
    console.log("amout & id", amount, id);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "EUR",
        description: "Description de l'entreprise",
        payment_method: id,
        confirm: true,
      });
      res.json({
        message: "Paiement réussi",
        success: true,
      });
    } catch (error) {
      console.log("Error-----", error);
      res.json({
        message: "Le paiement a échoué",
        success: false,
      });
    }
  },
};

module.exports = stripeController;
