import Link from "next/link";
import CheckoutSteps from "components/CheckoutSteps";
export default function ThankyouRight() {
  return (
    <div className="col-lg-5  checkout-right thankyou-section without-scroll px-md-0">
      <div className="card  border-0 border-radius-0">
        <div className="card-body ">
          <CheckoutSteps />
          {/* <div className='checkout-card  mt-32 mt-xs-34'>
            <p className="mb-3 h2-xl  text-white ">
            Thank you!
            </p>
            <h1 className="thankyou-heading primary-color pb-0">
            You are about to be an official Night Watch NFT holder!
            </h1>
          </div> */}
          <div className="mt-32 checkout-card bg-transparent py-2 border-0">
            <h2 className="mb-3 h2-xl primary-color">Next steps</h2>
            <p className="body-s1 shade-black mb-0">
              Read the following next steps carefully to ensure that you will
              receive your NFT without any problems.
            </p>
          </div>
          {/*  */}

          <div className="d-flex thankyou-box mb-1 mt-40 ">
            <div className="align-self-md-center left col-2 px-0">
              <div className="d-flex">
                <div className="align-self-md-center">
                  <img
                    src="img/circle-1.svg"
                    loading="eager"
                    alt="#1"
                    title="#1"
                    className="img-fluid "
                  />
                </div>
                <div className="align-self-center d-none d-md-inline-block">
                  <img
                    src="img/union.svg"
                    loading="eager"
                    alt="#1"
                    title="#1"
                    className="img-fluid w-12"
                  />
                </div>
              </div>
            </div>
            <div className="align-self-md-center right col-10 ps-3 position-relative">
              <p className="mb-0 thankyou-text">
                Once you have paid and entered your email address, you will
                receive a confirmation of your payment in your inbox.
              </p>
            </div>
          </div>
          <div className="d-flex thankyou-box my-1">
            <div className="align-self-md-center left col-2 ">
              <div className="d-flex">
                <div className="align-self-md-center">
                  <img
                    src="img/circle-2.svg"
                    loading="eager"
                    alt="#2"
                    title="#2"
                    className="img-fluid "
                  />
                </div>
                <div className="align-self-center d-none d-md-inline-block">
                  <img
                    src="img/union.svg"
                    loading="eager"
                    alt="#2"
                    title="#2"
                    className="img-fluid w-12"
                  />
                </div>
              </div>
            </div>
            <div className="align-self-md-center right col-10 ps-3 position-relative">
              <p className="mb-0 thankyou-text">
                We will follow up shortly with further instructions about how to
                claim the NFT to your wallet.
              </p>
            </div>
          </div>
          <div className="d-flex thankyou-box my-1">
            <div className="align-self-md-center left col-2 ">
              <div className="d-flex">
                <div className="align-self-md-center">
                  <img
                    src="img/circle-3.svg"
                    alt="#3"
                    title="#3"
                    className="img-fluid "
                  />
                </div>
                <div className="align-self-center d-none d-md-inline-block">
                  <img
                    src="img/union.svg"
                    loading="eager"
                    alt="#3"
                    title="#3"
                    className="img-fluid w-12"
                  />
                </div>
              </div>
            </div>
            <div className="align-self-md-center right col-10 ps-3 position-relative">
              <p className="mb-0 thankyou-text">
                After you followed the instructions and claimed the NFT to your
                wallet, enjoy the benefits of The Night watch NFT and it&apos;s
                utilities.
              </p>
            </div>
          </div>
          <p className="mb-0 thankyou-text-1 mt-5 mb-1">
            If you require any further assistance, please do not hesitate to
            contact us on:
          </p>

          <a
            className="mb-0 thankyou-link"
            href="mailto:support@metarembrandt.com"
          >
            support@metarembrandt.com
          </a>
        </div>
      </div>
    </div>
  );
}
