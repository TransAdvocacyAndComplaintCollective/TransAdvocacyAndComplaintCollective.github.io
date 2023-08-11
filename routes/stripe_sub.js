const express = require("express");
const stripe = require("stripe")("sk_test_w46qxMuKLG6m3O8QWhbsSIl300F3QuzMsa");
const admin = require("firebase-admin");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const YOUR_DOMAIN = "http://localhost:8080"; // Replace with your domain

function validateDOB(dob) {
  // Parse the input date string
  const dateParts = dob.split("/");
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);

  // Create a Date object using the parsed values
  const date = new Date(year, month - 1, day);

  // Perform additional checks
  const isDateValid =
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year;

  const isPastDate = date <= new Date();

  return isDateValid && isPastDate;
}
function validateCountry(country) {
  // Define the minimum length for country name
  const minLength = 2;

  // Check if the country name is empty or below the minimum length
  if (!country || country.length < minLength) {
    return false;
  }

  // Define the regular expression pattern for country name validation
  const regex = /^[a-zA-Z\s-]+$/;

  // Check if the country name matches the regex pattern
  return regex.test(country);
}
function validateCity(city) {
  // Define the minimum length for city name
  const minLength = 2;

  // Check if the city name is empty or below the minimum length
  if (!city || city.length < minLength) {
    return false;
  }

  // Define the regular expression pattern for city name validation
  const regex = /^[a-zA-Z\s-]+$/;

  // Check if the city name matches the regex pattern
  return regex.test(city);
}

function validateCounty(county) {
  // Define the minimum length for county name
  const minLength = 2;

  // Check if the county name is empty or below the minimum length
  if (!county || county.length < minLength) {
    return false;
  }

  // Define the regular expression pattern for county name validation
  const regex = /^[a-zA-Z\s-]+$/;

  // Check if the county name matches the regex pattern
  return regex.test(county);
}
function validateUKPostcode(postcode) {
  // Define the regular expression for UK postcode validation
  const regex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

  // Check if the postcode matches the regex pattern
  return regex.test(postcode);
}
function validateEmail(email) {
  // Define the regular expression for email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the regex pattern
  return regex.test(email);
}
function validatePhoneNumber(phoneNumber) {
  // Remove any non-digit characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // Define the regular expression for phone number validation
  const regex = /^[0-9]{7,15}$/;

  // Check if the cleaned number matches the regex pattern
  return regex.test(cleanedNumber);
}
function validateAddressLine1(addressLine1) {
  // Define the minimum length for address line 1
  const minLength = 2;
  // Check if the address line 1 is empty or below the minimum length
  if (!addressLine1 || addressLine1.length < minLength) {
    return false;
  }
  // Define the regular expression pattern for address line 1 validation
  const regex = /^[a-zA-Z0-9\s\.,#-]+$/;
  // Check if the address line 1 matches the regex pattern
  return regex.test(addressLine1);
}
function validateFirstName(firstName) {
  // Define the minimum length for first name
  const minLength = 2;

  // Check if the first name is empty or below the minimum length
  if (!firstName || firstName.length < minLength) {
    return false;
  }

  // Define the regular expression pattern for first name validation
  const regex = /^[\p{L}'][\p{L}'\s-]*[\p{L}]$/u;

  // Check if the first name matches the regex pattern
  return regex.test(firstName);
}

function validateLastName(lastName) {
  // Define the minimum length for last name
  const minLength = 2;

  // Check if the last name is empty or below the minimum length
  if (!lastName || lastName.length < minLength) {
    return false;
  }

  // Define the regular expression pattern for last name validation
  const regex = /^[\p{L}'][\p{L}'\s-]*[\p{L}]$/u;

  // Check if the last name matches the regex pattern
  return regex.test(lastName);
}
const prices_mapping = {
  volunteer: "price_1NDws6I39QBFoSmHiXtlmiV2",
  reduced_month: "price_1NDwscI39QBFoSmH2tmz9gyI",
  reduced_year: "price_1NDwt0I39QBFoSmH4BUfv82H",
  standard_month: "price_1NDwtxI39QBFoSmHJTGVS6oe",
  standard_year: "price_1NDwuRI39QBFoSmH3Iw8K2z4",
};
router.post("/create-checkout-session", async (req, res) => {
  // if (validateDOB(req.body.dob)) {
  //   res.json({ error: "DOB" });
  //   return;
  // }
  // if (validateUKPostcode(req.body.email)) {
  //   res.json({ error: "UKPostcode" });
  //   return;
  // }
  // // if (validateEmail(req.body.email)) {
  // //   res.json({ error: "Email" });
  // //   return;
  // // }
  // // if (validatePhoneNumber(req.body.phone)) {
  // //   res.json({ error: "PhoneNumber" });
  // //   return;
  // // }
  // if (validateAddressLine1(req.body.address1)) {
  //   res.json({ error: "AddressLine1" });
  //   return;
  // }
  // if (validateFirstName(req.body.firstName)) {
  //   res.json({ error: "FirstName" });
  //   return;
  // }
  // // if (validateLastName(req.body.lastName)) {
  // //   res.json({ error: "LastName" });
  // //   return;
  // // }
  // // if (validateCountry(req.body.country)) {
  // //   res.json({ error: "Country" });
  // //   return;
  // // }
  // // if (validateCity(req.body.city)) {
  // //   res.json({ error: "City" });
  // //   return;
  // // }
  // // if (validateCounty(req.body.county)) {
  // //   res.json({ error: "County" });
  // //   return;
  // // }
  // // if (checkUserExists(req.body.userId)) {
  // //   res.json({ error: "userId" });
  // // }
  console.log(prices_mapping[req.body.membershipRate]);
  const priceId = prices_mapping[req.body.membershipRate];
  const prices = await stripe.prices.list({
    lookup_keys: [prices_mapping[req.body.membershipRate]],
    expand: ["data.product"],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log("session");
  console.log(session);
  console.dir(session);
  res.json({ url: session.url, session: session });
});

router.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = "whsec_12345";
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case "customer.subscription.trial_will_end":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case "customer.subscription.updated":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

module.exports = router;
