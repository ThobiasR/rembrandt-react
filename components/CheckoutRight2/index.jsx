import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useFormikContext, Field } from "formik";
import { FaInfoCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";

import { isMobile } from "react-device-detect";
import CheckoutSteps from "components/CheckoutSteps";
import Footer from "components/Footer";
import {
  paymentTypes,
  PREORDER_PRICE,
  ETHEREUM_FEES,
  GAS_FEES,
} from "../../constants";

export default function CheckoutRight2(props) {
  const {
    handleChange,
    values,
    touched,
    setStep,
    noOfNft,
    price,
    showGasFee,
    totalPrice,
    step,
    buyUsingMetamask,
  } = props;
  const { errors, isSubmitting, isValidating } = useFormikContext();

  const handleChangeCustom = (e, handleChange) => {
    handleChange(e);
  };

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      let keys = Object.keys(errors);
      if (keys.length > 0) {
        const selector = `[name=${keys[0]}]`;
        const errorElement = document.querySelector(selector);
        if (errorElement) {
          errorElement.focus();
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);
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
              Choose payment method
            </h2>
          </div>
          {paymentTypes.map((p, idx) => (
            <div className="col-md-6 mb-4 payemnt-method" key={idx}>
              <Form.Check type="radio" id={`check-api-${idx}`}>
                <Form.Check.Label
                  className={`align-self-center d-flex justify-content-between payment-box w-100 ${
                    values.paymentMethod === p.type && "active"
                  }`}
                >
                  <div
                    className={`align-self-center d-flex justify-content-between payment-box-1 w-100`}
                  >
                    <div className="d-flex align-self-center">
                      <Form.Check.Input
                        type="radio"
                        value={p.type}
                        onChange={(e) => handleChangeCustom(e, handleChange)}
                        name="paymentMethod"
                        className="p-0"
                        isValid={touched.paymentMethod && !errors.paymentMethod}
                      />
                      <div className="align-self-center text ms-3">
                        {p.type}
                      </div>
                    </div>
                    <div className="align-self-center">
                      {" "}
                      <img
                        src={`img/${p.image}.svg`}
                        alt="checkcircle"
                        title="checkcircle"
                        className="img-fluid"
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                  </div>
                </Form.Check.Label>
              </Form.Check>
            </div>
          ))}

          <div className="col-12">
            <Button
              className="metamsk-btn"
              onClick={() => buyUsingMetamask()}
              style={{ width: "100%" }}
              id="button-connect-metamask"
            >
              <img
                src="/img/metamask.png"
                className="img-fluid me-3"
                alt="MetaMask"
              />
              Pay Using MetaMask
            </Button>
          </div>

          {touched.paymentMethod && errors.paymentMethod && (
            <div className="invalid-feedback" style={{ display: "block" }}>
              {errors.paymentMethod}
            </div>
          )}
          {/* <div className="col-md-12 ">
                  <Button className='metamsk-btn py-18 w-100'><img src="/img/metamask.png" className='img-fluid me-3' alt="MetaMask" />Pay with MetaMask</Button></div> */}
        </div>
        <div className="row mt-32">
          <div className="mb-3 col-12">
            <label
              htmlFor="confirmEmail"
              className="pre-order mb-3 primary-color"
            >
              Confirm your email address
            </label>
            <Form.Control
              id="confirmEmail"
              className="form-control"
              type="email"
              placeholder="jane.doe123@gmail.com"
              name="confirmEmail"
              value={values.confirmEmail}
              onChange={handleChange}
              isInvalid={touched.confirmEmail && !!errors.confirmEmail}
              isValid={touched.confirmEmail && !errors.confirmEmail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmEmail}
            </Form.Control.Feedback>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-12 d-flex mb-3 form-check-checkbox form-check-checkbox-1">
            <Form.Check
              label="I confirm that this is my correct email address."
              name="confirmCheckbox"
              type="checkbox"
              id="confirm-checkbox"
              onChange={handleChange}
              isInvalid={touched.confirmCheckbox && !!errors.confirmCheckbox}
              required
              className="d-flex"
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmCheckbox}
            </Form.Control.Feedback>
          </div>
          <div className="col-12 d-flex form-check-checkbox form-check-checkbox-1">
            <Form.Check
              label={
                <>
                  By clicking &quot;Place Order&quot;, I accept the Terms of
                  Service and have read the Privacy Policy .
                </>
              }
              name="placeOrder"
              type="checkbox"
              id="placeorder-checkbox"
              className="d-flex"
              onChange={handleChange}
              isInvalid={touched.placeOrder && !!errors.placeOrder}
            />
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
          {values.paymentMethod !== "Ethereum" && (
            <div className="col-12 d-sm-flex ">
              <div className="col-md-6 font-weight-700 wirefram-bg summary-content align-self-center  mb-1 mb-sm-0 me-3 me-md-0">
                Gas fees{" "}
                <FaInfoCircle
                  className="green-color"
                  style={{ cursor: "pointer" }}
                  onClick={() => showGasFee(true)}
                />
              </div>
              <div className="col-md-6 summary-content text-md-right">
                <span className="font-weight-700 ">{ETHEREUM_FEES} ETH </span>{" "}
                <span className="mx-2 font-weight-700 ">|</span>
                <span className="font-weight-700">${GAS_FEES.toFixed(2)} </span>
              </div>
            </div>
          )}
          <div className="col-12">
            <hr className="my-16" />
          </div>
          <div className="col-12 d-sm-flex ">
            <div className="col-md-6 wirefram-bg summary-content align-self-center font-weight-700 mb-1 mb-sm-0 me-3 me-md-0">
              Total
            </div>
            <div className="col-md-6 summary-content text-md-right">
              <span className="font-weight-700">
                {(ethPrice + ETHEREUM_FEES).toFixed(2)} ETH{" "}
              </span>{" "}
              <span className="mx-2 font-weight-700 ">|</span>
              <span className="font-weight-700">
                $
                {values.paymentMethod !== "Ethereum"
                  ? totalPrice.toFixed(2)
                  : price}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100"
              id="button-payment-stripe"
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
