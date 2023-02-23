import Modal from "react-bootstrap/Modal";

export default function MetamaskModal(props) {
  const { setShow, show } = props;

  return (
    <Modal
      show={show}
      // onHide={() => setShow(false)}
      dialogClassName="gas-modal"
      centered
      size="md"
    >
      <Modal.Body>
        <div className="row feature-info-modal">
          <div className="d-flex w-100">
            <div className="align-self-center col-10">
              {" "}
              <h3 className="heading">Continue with MetaMask</h3>
            </div>
            <div className="align-self-center col-2 text-end">
              <img
                src="img/feature-cross.svg"
                onClick={() => setShow(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="d-flex w-100">
            <div className="col-12">
              <div className="">
                <img
                  src="img/metamask.png"
                  className="d-flex justify-content-center img-fluid"
                />
              </div>
              <p className="mb-3">
                To pay with Ethereum, please complete this transaction in your
                MetaMask browser.
              </p>
              <a
                className="btn btn-primary w-100 d-flex justify-content-center"
                href="https://metamask.app.link/dapp/minting.metarembrandt.com/"
              >
                Continue with MetaMask
              </a>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
