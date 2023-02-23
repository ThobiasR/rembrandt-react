import Modal from 'react-bootstrap/Modal';

export default function GasModal(props) {
  const { setShow, show } = props;

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w gas-modal"
      centered
    >
      <Modal.Body>
        <div className="row feature-info-modal">
          <div className="d-flex w-100">
            <div className="align-self-center col-9">
              {' '}
              <h3 className="heading mb-0">What are gas fees?</h3>
            </div>
            <div className="align-self-center col-3 text-end">
              <img src="img/feature-cross.svg" onClick={() => setShow(false)} style={{ cursor: 'pointer' }}/>
            </div>
          </div>
          <div className="d-flex w-100 mt-3">
            <div className="col-12">
              <p className='mb-3'>
                Gas fees are payments made by users to compensate for the
                computing energy required to process and validate
                transactions on the Ethereum blockchain.
              </p>
                    <button onClick={() => setShow(false)} style={{ cursor: 'pointer' }}
                      className="btn btn-primary d-flex w-100 justify-content-center"
                      alt="Buy now"
                      title="Buy now"
                    >
                     Got it
                    </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>

  )
}