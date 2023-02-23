import Head from "next/head";
import ThankyouLeft from "components/ThankyouLeft";
import ThankyouRight from "components/ThankyouRight";
import Header from "components/Header";

export default function ThankyouPage() {
  return (
    <>
      <Head>
        <title>Thank you</title>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#000"></meta>
      </Head>
      <Header />
      <section className="checkout-section">
        <div className="container-fluid">
          <div className="row">
            <ThankyouLeft />
            <ThankyouRight />
          </div>
        </div>
      </section>
    </>
  );
}
