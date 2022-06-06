const Hero = () => {
  return (
    <div className="wrapper-hero">
      <div className="container">
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
              src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550"
              alt="nft"
              className="rounded-t-lg"
            />
            <div className="info-container">
              <img src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64" alt="" className="h-[2.25rem] rounded-full" />
              <div className="author">
                <div className="name">Jolly</div>
                <a href="#" className="text-[#1868b7]">
                  hola-kanola
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
