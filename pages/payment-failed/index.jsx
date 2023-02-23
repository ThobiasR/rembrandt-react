import Head from "next/head";
import PaymentFailedCom from "components/PaymentFailed";
export default function PaymentFailed() {
  return (
    <>
      <Head>
        <title>Payment failed</title>
        <meta name="theme-color" content="#000"></meta>
      </Head>

      <section className="payment-failed">
        <div className="container-fluid">
          <div className="row">
            <PaymentFailedCom />
          </div>
        </div>
      </section>
    </>
  );
}
