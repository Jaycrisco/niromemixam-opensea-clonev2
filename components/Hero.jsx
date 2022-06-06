import Link from "next/link";

const Hero = () => {
  return (
    <div className="wrapper-hero">
      <div className="container-hero">
        <div className="content-wrapper">
          <div className="copy-container">
            <div className="title">
              Discover, collect and sell extraordinary NFTs
            </div>
            <div className="description">
              Opensea is the world&apos;s first and largest NFT marketplace
            </div>
            <div className="cta-container">
              <button className="accent-button">Explore</button>
              <button className="button">Create</button>
            </div>
          </div>

          <div className="card-container">
            <img
              src="https://cdn.sanity.io/images/75n3h4qs/production/57e3d9defc2ba83f6c75dce7b54a0720b54863d0-1200x1200.png"
              alt="nft"
              className="rounded-t-lg"
            />
            <div className="info-container">
              <img
                src="https://cdn.sanity.io/images/75n3h4qs/production/57e3d9defc2ba83f6c75dce7b54a0720b54863d0-1200x1200.png"
                alt=""
                className="h-[2.25rem] rounded-full"
              />
              <div className="author">
                <div className="name">Momo</div>
                <Link href="/collections/0x8459d4EC2a107d1d439D6C3d9Cad070d9A01009a">
                  <a className="text-[#1868b7]">Invisible Man Test</a>
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
