import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function SoldoutModal(props) {
  const { saveEmailForFutureUse, show } = props;
  const [email, setEmail] = useState("");

  return (
    <Modal show={show} dialogClassName="modal-90w gas-modal" centered>
      <Modal.Body>
        <div className="row soldout-modal">
          <div className="content text-center ">
            <img
              src="img/tnw-zwart.svg"
              alt="logo"
              title="logo"
              className="d-table mx-auto img-fluid logo mb-2"
            />
            {/* <div className="mt-2 mb-2">
              <span className=" nft">NFT COLLECTION</span>
            </div> */}
            <div className="heading-top"></div>
            <p className="heading-1 mb-0">Phase Sold Out</p>
            <p className="mb-2 text">Get ready for the next one</p>
            <div className="d-flex w-100 mt-3">
              <div className="col-12">
                <div className="form-soldout">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-primary d-flex w-100 justify-content-center"
                    alt="Buy now"
                    title="Buy now"
                    onClick={() => saveEmailForFutureUse(email)}
                    id="button-keep-me-posted"
                  >
                    Keep me updated
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-center align-items-center">
              <span className="poweredby-text">Powered By</span>
              <img
                src="/img/HenriPay.png"
                className="img-fluid me-3"
                style={{ width: 100 }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
