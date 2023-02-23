import Modal from 'react-bootstrap/Modal';

export default function ValidateModal(props) {
  const { setShow, show } = props;

  return (
    <Modal
      show={show}
      // onHide={() => setShow(false)}
      dialogClassName="modal-90w gas-modal"
      centered
    >
      <Modal.Body>
        <div className="row feature-info-modal">
          <div className="d-flex w-100">
            <div className="align-self-center col-9">
              {' '}
              <h3 className="heading">Validating transaction</h3>
            </div>
            {/* <div className="align-self-center col-3 text-end">
              <img src="img/feature-cross.svg" onClick={() => setShow(false)} style={{ cursor: 'pointer' }}/>
            </div> */}
          </div>
          <div className="d-flex w-100">
            <div className="col-12">
              <p className='mb-0'>
                Your transaction is being validated on the Ethereum blockchain. This typically takes about ~30 seconds.
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>

  )
}