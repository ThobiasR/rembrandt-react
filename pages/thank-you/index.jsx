import Head from "next/head";
import ThankyouLeft from "components/ThankyouLeft";
import Header from "components/Header";
import ConfirmationMetaMask from "components/ConfirmationMetaMask";

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
          <div
            className="row d-flex justify-content-center"
            style={{ backgroundColor: "#1a1c1b" }}
          >
            <ThankyouLeft page="metamask" />
            <ConfirmationMetaMask />
          </div>
        </div>
      </section>
    </>
  );
}
