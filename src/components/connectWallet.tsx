'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';

function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        // Button base style
        const baseStyle =
          "ml-auto px-2 py-1 rounded-xl transition-colors duration-300 ease-in-out";

        // Style variations
        const connectStyle = `bg-tiffany_blue hover:bg-alice_blue-200 text-white text-lg font-bold py-2 px-6 ${baseStyle}`;
        const chainStyle = ` text-white ${baseStyle}`;
        const accountStyle = `text-white ${baseStyle}`;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className={connectStyle}>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className={chainStyle}>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={openChainModal} type="button" className={chainStyle} style={{ display: 'flex', alignItems: 'center' }}>
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: '24px',
                          height: '24px',
                          borderRadius: '9999px',
                          overflow: 'hidden',
                          marginRight: '4px',
                          display: 'flex',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: '24px', height: '24px' }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button" className={`${accountStyle} flex items-center gap-2`}>
                    <span className="text-white">{account.displayName}</span>
                    {account.displayBalance && (
                      <span className="text-old_rose-400 bg-customLight2 rounded px-2">
                        ({account.displayBalance})
                      </span>
                    )}
                  </button>

                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;