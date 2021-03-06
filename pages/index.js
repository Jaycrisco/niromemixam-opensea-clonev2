import { useAddress,  useNetworkMismatch,useNetwork } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import Header from "../components/Header";
import Hero from "../components/Hero";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const address = useAddress();

  const welcomeUser = (userName, toastHandler = toast) => {

    toastHandler.success(
      `Welcome back ${userName !== "Unnamed" ? ` ${userName}` : ""}!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
          maxWidth: "1000px",
        },
      }
    );
  };

  useEffect(() => {
    if (!address) return;

    try {
      if (networkMismatched) {
        switchNetwork(3000);
        return;
      }
    } catch (error) {
      console.log(error)
    }
    
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: address,
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);
      welcomeUser(result.userName);
    })();
  }, [address]);

  return (
    <div>
      <Toaster position="bottom-left" reverseOrder={false} />
      <>
        <Header />
        <Hero />
      </>
    </div>
  );
}
