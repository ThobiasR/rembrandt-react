import Link from "next/link";

export default function ThankyouLeft({ page }) {
  return (
    <div className={`${page === "metamask" ? "d-block px-3" : ""} col-lg-7`}>
      <div className="card checkout-left ">
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
                    className="img-fluid"
                  />
                </a>
              </Link>
            </div>
            <div className=" col-lg-10  mx-auto">
              <div className=" left-content-area py-80 thankyou-area">
                <h1 className="mb-4-1 shade-7 h1-xs shade-7">
                  Congratulations,
                </h1>
                <p className="body-xl mb-4  text-white ">
                  You now own a piece of the Night Watch NFT collection!
                </p>
                <p className="body-xl mb-4  text-white ">
                  Dear <span className="shade-7">NightWatcher</span>,<br />
                  On behalf of everyone at MetaRembrandt, we want to thank you
                  for your support! You have now successfully minted a piece of
                  The Night Watch NFT. Enjoy all the exclusive benefits!
                </p>
                <p className="body-xl mb-4  text-white">
                  We hope that you will stick with us to experience this ongoing
                  journey to bring traditional art into the Metaverse.
                </p>
                <p className="body-xl mb-4  text-white">
                  With great regards,
                  <br />
                  The MetaRembrandt Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
