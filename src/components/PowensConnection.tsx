'use client';
import { Button } from "@nextui-org/react";

export default function PowensConnection() {
    const handleRedirection = () => {
        console.log('Redirecting to auth URL for web2...');
        window.location.href = `https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-4 w-1/3">
                <Button className="bg-tiffany_blue py-6 text-xl font-semibold" onPress={handleRedirection}>Connect your bank account</Button>
            </div>
        </div>
    );
}