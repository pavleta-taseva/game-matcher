import React, { useState, useEffect } from 'react';
import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { FcGoogle } from 'react-icons/fc';

type GoogleSignInProps = {
  content: string;
};

const GoogleSignInElement = ({ content }: GoogleSignInProps) => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <>
      {providers &&
        Object.values(providers)?.map((provider, index) => (
          <div
            key={index}
            onClick={() => signIn(provider.id)}
            className="mt-4 h-10 w-full rounded-lg bg-primaryLight px-3 py-2 text-base font-bold text-primaryDark outline-none md:w-1/2 lg:w-64"
          >
            <div
              id="g_id_onload"
              data-client_id={`${process.env.GOOGLE_CLIENT_ID}`}
              data-login_uri={`${process.env.NEXT_PUBLIC_DOMAIN}/login`}
              data-auto_prompt="false"
            ></div>
            <div
              className="g_id_signin flex cursor-pointer items-center justify-center gap-2"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"
            >
              <FcGoogle /> {content}
            </div>
          </div>
        ))}
    </>
  );
};

export default GoogleSignInElement;
