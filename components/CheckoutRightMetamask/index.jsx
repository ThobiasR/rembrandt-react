import Form from "react-bootstrap/Form";
import CheckoutSteps from "components/CheckoutSteps";
import Footer from "components/Footer";
import { PREORDER_PRICE } from "../../constants";

export default function CheckoutRightMetamask(props) {
  const { setStep, noOfNft, price, step, buyUsingMetamask, values } = props;

  const ethPrice = PREORDER_PRICE * noOfNft;

  return (
    <div className="card  border-0 border-radius-0">
      <div className="card-body">
        <div className="row mb-32">
          <div className="col-12">
            <a
              href="#"
              className="previous-link d-flex pb-0 "
              onClick={() => setStep(0)}
            >
              {" "}
              Previous step
            </a>
          </div>
        </div>
        <CheckoutSteps step={step} />
        <div className="row mt-32">
          <div className="col-12">
            <h2 className="pre-order mb-3 primary-color">
              Choose Payment method
            </h2>
          </div>
          <div className="col-12 mb-4 payemnt-method">
            <Form.Check type="radio">
              <Form.Check.Label
                className={`align-self-center d-flex justify-content-center payment-box w-100 active metamask-box`}
              >
                <div
                  className={`align-self-center d-flex justify-content-center payment-box-1 w-100`}
                >
                  <div className="d-flex align-self-center">
                    <Form.Check.Input
                      type="radio"
                      defaultChecked={true}
                      className="p-0 metamask-connected-checkbox"
                    />
                    <div className="align-self-center text ms-2 me-2">
                      Connected
                    </div>
                  </div>
                  <div className="align-self-center">
                    <img
                      src={`/img/metamask.png`}
                      alt="checkcircle"
                      title="checkcircle"
                      style={{
                        width: 20,
                        height: 20,
                        position: "relative",
                        top: "-2px",
                      }}
                    />
                  </div>
                </div>
              </Form.Check.Label>
            </Form.Check>
          </div>
        </div>

        <div className="row mt-32 checkout-card mx-0 border-0">
          <div className="col-12">
            <h2 className="pre-order mb-4">Order summary</h2>
          </div>
          <div className="col-12 d-sm-flex mb-3  ">
            <div className="col-md-6 wirefram-bg summary-content align-self-center mb-1 mb-sm-0 me-3 me-md-0 font-weight-500">
              {noOfNft} x NFT{noOfNft > 1 && "'s"}
            </div>
            <div className="col-md-6 summary-content text-md-right">
              <span className="font-weight-700 ">
                {ethPrice.toFixed(2)} ETH{" "}
              </span>{" "}
              <span className="mx-2 font-weight-700 ">|</span>
              <span className="font-weight-700">${price} </span>
            </div>
          </div>
          <div className="col-12">
            <hr className="my-16" />
          </div>
          <div className="col-12 d-sm-flex ">
            <div className="col-md-6 wirefram-bg summary-content align-self-center font-weight-700 mb-1 mb-sm-0 me-3 me-md-0">
              Total
            </div>
            <div className="col-md-6 summary-content text-md-right">
              <span className="font-weight-700">
                {ethPrice.toFixed(2)} ETH{" "}
              </span>{" "}
              <span className="mx-2 font-weight-700 ">|</span>
              <span className="font-weight-700">${price} </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => buyUsingMetamask(values.promocode)}
              id="button-payment-metamask"
            >
              Place Order
            </button>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
