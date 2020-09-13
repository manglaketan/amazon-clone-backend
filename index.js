const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51HPvwqH4QR9HL707SollzTXPmbz8rYNbEU0cJGMRpH5wC4x1RrT2HbxxwAeVWu111fVD0fXgATixlhg42mLrRcca00fPMgVZOk"
);
// API

// - App config
const app = express();
// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;
	console.log("Payment Request Received for the amount", total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, //amount in subunits
		currency: "inr",
		description: `payment of amount ${total / 100}`,
	});

	//OK- Created Something
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

// - Listen
exports.api = functions.https.onRequest(app);

//Example Endpoint
// http://localhost:5001/clone-a8a3b/us-central1/api
