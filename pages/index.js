import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import detectEthereumProvider from "@metamask/detect-provider";
import { isMobile } from "react-device-detect";

import CheckoutLeft from "components/CheckoutLeft";
import CheckoutRight1 from "components/CheckoutRight1";
import CheckoutRight2 from "components/CheckoutRight2";
import CheckoutRightMetamask from "components/CheckoutRightMetamask";

import GasModal from "components/GasModal";
import ValidateModal from "components/ValidateModal";
import MetamaskModal from "components/MetamaskModal";
import Header from "components/Header";
import SoldoutModal from "components/SoldoutModal";

import {
  getCurrencyVal,
  payment,
  ethPaymentSuccess,
  checkIfWhitelist,
  validateWalletAddress,
  soldout,
  saveEmailAddress,
} from "services/checkout";
import {
  connectWallet,
  ethPayment,
  getConfirmations,
  getCurrentWalletConnected,
} from "services/interect";
import { PREORDER_PRICE, GAS_FEES } from "constants";
import { validatePromocode } from "services/checkout";

const Error = dynamic(() => import("components/Error"));

const schema = yup.object().shape({
  email: yup.string().email("Enter Valid email").required("Email is Required"),
  paymentMethod: yup.string().required("Please select a payment method"),
  confirmEmail: yup
    .string()
    .email("Enter Valid email")
    .oneOf([yup.ref("email"), null], "Confirm email did not match")
    .required("Confirm email is required"),
  confirmCheckbox: yup.boolean().oneOf([true], "Please accept"),
  placeOrder: yup.boolean().oneOf([true], "Please accept"),
});

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [price, setPrice] = useState();
  const [noOfNft, setNoOfNft] = useState(1);
  const [gasFee, showGasFee] = useState(false);
  const [validateEth, showValidateEth] = useState(false);
  const [error, setError] = useState(false);
  const [metamaskMessage, setMetamaskShow] = useState(false);
  const [walltedConnected, setWalletConnected] = useState(false);
  const [ifSoldout, setSoldout] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const errorEndRef = useRef(null);

  useEffect(() => {
    async function bootstrap() {
      await handleNftChange();
    }

    bootstrap();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  useEffect(() => {
    async function checkIfAlreadyConnected() {
      const { address } = await getCurrentWalletConnected();
      if (address) {
        setWalletConnected(address);
      }
    }
    checkIfAlreadyConnected();
  }, []);

  useEffect(() => {
    async function checkIfSoldOut() {
      const res = await soldout();
      if (res) {
        setSoldout(true);
      }
    }

    checkIfSoldOut();
  }, []);

  const checkWhitelist = async (email) => {
    try {
      const check = await checkIfWhitelist(email, noOfNft);
      if (check < noOfNft) {
        enqueueSnackbar(
          `Only ${check} tokens are whitelisted for given email address`,
          {
            variant: "error",
          }
        );

        return false;
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar(e, {
        variant: "error",
      });

      return false;
    }
  };

  const handleNftChange = async (val) => {
    const selectVal = val?.target?.value;
    const newPrice = await getCurrencyVal(selectVal || noOfNft);
    setPrice(newPrice);
    if (selectVal) {
      setNoOfNft(selectVal);
    }
  };

  const checkIfMetamaskInstalled = async () => {
    const provider = await detectEthereumProvider({
      mustBeMetaMask: true,
    });

    return provider;
  };

  const connectWithMetamask = async () => {
    try {
      if (!window.ethereum && isMobile) {
        setMetamaskShow(true);
        return;
      }
      const metamask = await checkIfMetamaskInstalled();
      if (metamask) {
        await connectWallet();
      } else {
        enqueueSnackbar(
          <p className="mb-1 mt-1">
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser. Click here to install
            </a>
          </p>,
          {
            variant: "error",
          }
        );
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const buyUsingMetamask = async (promocode) => {
    try {
      const resAddress = await connectWallet();
      await validateWalletAddress(resAddress.address);
      let newPrice = String(PREORDER_PRICE * noOfNft);
      newPrice = parseFloat(newPrice).toFixed(3);
      const ethRes = await ethPayment(noOfNft, newPrice);
      if (ethRes.code === 4001) {
        enqueueSnackbar(ethRes.status, {
          variant: "error",
        });
        return;
      }
      if (ethRes.success) {
        showValidateEth(true);
        ethPaymentSuccess(
          promocode,
          noOfNft,
          resAddress.address,
          ethRes.status
        );
        confirmEtherTransaction(
          promocode,
          noOfNft,
          ethRes.status,
          resAddress.address
        );
      } else {
        if (ethRes.walletIssue) {
          setError(ethRes.status);
          errorEndRef.current.scrollIntoView({ behavior: "smooth" });
          return;
        }
        router.push("/payment-failed");
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar(e, {
        variant: "error",
      });
    }
  };

  const handleForm = async (values, resetForm, totalPrice) => {
    try {
      const newValues = {
        ...values,
        price: totalPrice,
        tokens: noOfNft,
        currency: "EUR",
      };

      const data = await payment(newValues);
      window.location = data.url;
    } catch (e) {
      console.log(e);
      enqueueSnackbar(e.message ? e.message : e, {
        variant: "error",
      });
    }
  };

  const checkIfPromocodeIsValid = async (promocode) => {
    try {
      await validatePromocode(promocode);
    } catch (e) {
      enqueueSnackbar("Promocode is invalid", {
        variant: "error",
      });
      throw "Promocode is invalid";
    }
  };

  const confirmEtherTransaction = (
    promocode,
    noOfNft,
    txHash,
    address,
    confirmations = 1
  ) => {
    setTimeout(async () => {
      // Get current number of confirmations and compare it with sought-for value
      const trxConfirmations = await getConfirmations(txHash);

      console.log(
        "Transaction with hash " +
          txHash +
          " has " +
          trxConfirmations +
          " confirmation(s)"
      );

      if (trxConfirmations === false) {
        showValidateEth(false);
        router.push("/payment-failed");
        return;
      }

      if (trxConfirmations >= confirmations) {
        // Handle confirmation event according to your business logic

        console.log(
          "Transaction with hash " + txHash + " has been successfully confirmed"
        );

        showValidateEth(false);
        router.push("/thank-you");
        return;
      }
      // Recursive call
      return confirmEtherTransaction(
        promocode,
        noOfNft,
        txHash,
        address,
        confirmations
      );
    }, 3 * 1000);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
  };

  const saveEmailForFutureUse = async (email) => {
    try {
      const res = await saveEmailAddress(email);
      enqueueSnackbar(res, {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar(e, {
        variant: "error",
      });
    }
  };

  const totalPrice = price + GAS_FEES;

  return (
    <>
      <Head>
        <title>The Night Watch</title>
        <meta name="theme-color" content="#000"></meta>
      </Head>
      <Header />
      <section className="checkout-section">
        <div className="container-fluid">
          <div className="row">
            <CheckoutLeft ifSoldout={ifSoldout} />
            {ifSoldout === false && (
              <div className="col-lg-5  checkout-right ">
                <Formik
                  validationSchema={schema}
                  onSubmit={async (values, { resetForm }) => {
                    await handleForm(values, resetForm, totalPrice);
                  }}
                  initialValues={{
                    email: "",
                    confirmEmail: "",
                    paymentMethod: "",
                    walletAddress: "",
                    confirmCheckbox: false,
                    placeOrder: false,
                    promocode: "",
                  }}
                  enableReinitialize
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate>
                      <>
                        <div style={{ display: step === 0 ? "block" : "none" }}>
                          <CheckoutRight1
                            handleChange={handleChange}
                            setStep={setStep}
                            errors={errors}
                            values={values}
                            touched={touched}
                            price={price}
                            handleNftChange={handleNftChange}
                            noOfNft={noOfNft}
                            showGasFee={showGasFee}
                            totalPrice={totalPrice}
                            step={step}
                            setFieldValue={setFieldValue}
                            checkWhitelist={checkWhitelist}
                            connectWithMetamask={connectWithMetamask}
                            walltedConnected={walltedConnected}
                            checkIfPromocodeIsValid={checkIfPromocodeIsValid}
                            disconnectWallet={disconnectWallet}
                          />
                        </div>
                        <div style={{ display: step === 1 ? "block" : "none" }}>
                          <CheckoutRight2
                            handleChange={handleChange}
                            values={values}
                            errors={errors}
                            touched={touched}
                            setStep={setStep}
                            noOfNft={noOfNft}
                            price={price}
                            showGasFee={showGasFee}
                            totalPrice={totalPrice}
                            setMetamaskShow={setMetamaskShow}
                            step={step}
                            buyUsingMetamask={buyUsingMetamask}
                          />
                        </div>
                        <div style={{ display: step === 2 ? "block" : "none" }}>
                          <CheckoutRightMetamask
                            setStep={setStep}
                            noOfNft={noOfNft}
                            price={price}
                            totalPrice={totalPrice}
                            step={step}
                            buyUsingMetamask={buyUsingMetamask}
                            values={values}
                          />
                        </div>
                      </>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
        <GasModal setShow={showGasFee} show={gasFee} />
        <ValidateModal setShow={showValidateEth} show={validateEth} />
        <MetamaskModal setShow={setMetamaskShow} show={metamaskMessage} />
        <div ref={errorEndRef}>
          <Error
            show={error}
            setShow={setError}
            title={error}
            message={error?.message}
          />
        </div>
      </section>
      <SoldoutModal
        show={ifSoldout}
        saveEmailForFutureUse={saveEmailForFutureUse}
      />
    </>
  );
}
