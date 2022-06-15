import Link from "next/link";

const Hero = () => {
  return (
    <div className="wrapper-hero">
      <div className="container-hero">
        <div className="content-wrapper">
          <div className="copy-container">
            <div className="title">
              Maso Market your home to
              Discover, collect and sell extraordinary NFTs
            </div>
            <div className="description">
              Maso Market is the Echelons&apos;s Premiere and largest NFT marketplace
            </div>
            <div className="cta-container">
              <button className="accent-button">Explore</button>
              <button className="button">Create</button>
            </div>
          </div>

          <div className="card-container">
            <img
              src="https://gateway.pinata.cloud/ipfs/QmR2oshArCb3B3frxX99LTmb2ym9xjpsHbV94PHz7c7AbF"
              alt="nft"
              className="rounded-t-lg"
            />
            <div className="info-container">
              <img
                src="https://gateway.pinata.cloud/ipfs/QmR2oshArCb3B3frxX99LTmb2ym9xjpsHbV94PHz7c7AbF"
                alt=""
                className="h-[2.25rem] rounded-full"
              />
              <div className="author">
                <div className="name">Momo</div>
                <Link href="/collections">
                  <a className="text-[#1868b7]">The Maso</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
