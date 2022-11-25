import React, { useEffect } from "react";
import tw from "tailwind-styled-components";

import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { WEB3_CONNECT_MODAL_ID } from "web3modal";

const provider_options = {
	// walletconnect: {
	// 	package:WalletConnectProvider,
	// 	options: {
	// 		infuraId
	// 	}
	// }

}


function Login() {
  const router = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // router("/");
      }
    });
  }, []);

  return (
    <Wrapper>
      <GyroLogo src="/logo.png" />

      <Title>Log in to access your account</Title>

      <HeadImage src="/head.png" />

      <SignInButton onClick={async () => {

        if(typeof window !== "undefined")
        {
          const web3modal = new Web3Modal(
            {
            network : 'testnet',
            cacheProvider: true,
            //@ts-ignore
            provider_options ,

        })
        const provider = await web3modal.connect();
				const web3 = new Web3(provider);
				// window.open('http://127.0.0.1:5500/template/index.html', '_blank');
        router("/");
        }
			
			}}>
				Sign in with metamask
			</SignInButton>
    </Wrapper>
  );
}

export default Login;
const Wrapper = tw.div<any>`
    flex flex-col h-screen w-screen bg-white-200  p-4 
`;

const GyroLogo = tw.img<any>`
    h-20 w-auto object-contain self-start
`;

const Title = tw.div<any>`
    text-5xl  pt-4 text-white-500
`;

const HeadImage = tw.img<any>`
    object-contain w-full h-1/2
`;

const SignInButton = tw.button<any>`
    bg-transparent hover:bg-purple-500 text-blue-400 font-bold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded
`;
