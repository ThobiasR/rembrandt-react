import CheckoutSteps from "components/CheckoutSteps";
export default function ConfirmationMetaMask() {
  return (
    <div className="col-lg-5  checkout-right thankyou-section without-scroll px-md-0">
      <div className="card  border-0 border-radius-0">
        <div className="card-body ">
          <CheckoutSteps />
          <p className="mb-0 thankyou-text mt-5 mb-1">
            You have received an unrevealed piece of the{" "}
            <span className="primary-color">Night Watch NFT</span>. This piece
            will be disclosed at a later date, so stay tuned on our socials and
            don&lsquo;t miss a single update.
          </p>

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
