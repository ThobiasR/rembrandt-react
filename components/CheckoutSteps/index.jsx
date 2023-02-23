export default function CheckoutSteps(props) {
  const { step } = props;
  let active1 = false;
  let active2 = false;
  let active3 = false;

  if (step === 0) {
    active1 = true;
  }

  if (step === 1 || step === 2) {
    active1 = true;
    active2 = true;
  } 

  if (step === undefined) {
    active1 = true;
    active2 = true;
    active3 = true;
  }

  return (
    <div className="row">
      <div className="col-12">
        <ul className="checkout-step" >
          <li className={`${active1 ? 'active' : 'step-title-1'} ${active2 && 'step-check'}`}><span>Order details</span></li>
          <li className={`${active2 ? 'active' : 'step-title-1'} ${active3 && 'step-check'}`}><span >Payment Method</span></li>
          <li className={`${active3 ? 'step-check' : 'step-title-2'}`}><span>Confirmation</span></li>
        </ul>
      </div>
    </div>
  )
}
