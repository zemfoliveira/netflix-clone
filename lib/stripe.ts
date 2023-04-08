import app from "@/firebase";
import { getFunctions, httpsCallable } from "@firebase/functions";
import {
  getStripePayments,
  createCheckoutSession,
} from "@stripe/firestore-stripe-payments";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export const loadCheckout = async (priceId: string) =>
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error: Error) => console.log(error.message));

export const goToBillingPortal = async () => {
  const instance = getFunctions(app, "europe-west2");
  const functionRef = httpsCallable(
    instance,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message));
};

export default payments;
