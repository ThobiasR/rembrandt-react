import Link from "next/link";
export default function CheckoutLeft({ ifSoldout }) {
  return (
    <div className={`${ifSoldout ? "col-lg-12" : "col-lg-7"}  px-0`}>
      <div className="card checkout-left  ">
        <div className="card-body d-flex pt-200">
          <div className="row">
            <div className="col-12 text-center mb-40">
              {" "}
              <Link href="/">
                <a rel="index">
                  <img
                    src="img/TNWwit.svg"
                    alt="logo"
                    title="logo"
                    className="logo img-fluid  "
                  />
                </a>
              </Link>
              {/* <div className="mt-4">
                <span className="px-2 nftcollection">NFT COLLECTION</span>
              </div> */}
              <div className="mt-5">
                <h1 className="mb-4-1 text-white h1 text-xs-16 mb-0">
                  Phase 1
                </h1>
                <span className="shade-7 body-xl ">2,000 pieces</span>
              </div>
            </div>
            <div className=" col-lg-10  mx-auto">
              <div className=" left-content-area py-80">
                <h1 className="mb-4-1 text-white h1 text-xs-16 ">
                  Acquire your Night Watch NFT
                </h1>
                <h2 className="body-xl mb-4  text-white ">
                  Join the MetaRembrandt community and become a holder of a
                  prestigious Dutch masterpiece, only{" "}
                  <span className="shade-7 ">8,000 </span>available in total
                </h2>
                {/* <div className="d-flex benefit-list mb-lg-3 mb-2 list-withicon ">
               Embed your name in the wall of fame and be remembered for protecting Dutch Heritage
               </div>
               <div className="d-flex benefit-list mb-lg-3 mb-2 list-withicon ">
               Get rewarded for your role in preserving Rembrandt's legacy and earn a passive income with your NFT
               </div>
               <div className="d-flex benefit-list list-withicon ">
               Access exclusive events in and outside of the Metaverse
               </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
