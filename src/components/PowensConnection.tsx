'use client';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";

export default function PowensConnection() {
    const handleRedirection = () => {
        console.log('Redirecting to auth URL for web2...');
        window.location.href = `https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-4 w-1/3">
                <Card className=" p-3 bg-opacity-50 bg-gray-800 max-w-lg w-full">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col mx-auto justify-center mt-2">
                            <p className="mx-auto mb-1 text-2xl text-old_rose">Connect & Secure Your Identity</p>
                        </div>
                    </CardHeader>
                    <CardBody className="flex justify-center items-center">
                        <div className="flex flex-col justify-center items-center mx-auto">
                            <p className="text-sm text-gray-300 text-center">Click to effortlessly link your bank account for one-time, secure verification. No more document uploads—just one click for seamless access and privacy protection.</p>
                        </div>
                    </CardBody>
                    <CardFooter className="mb-2 flex justify-center items-center">
                        <div className="flex gap-4">
                            <Button className="bg-old_rose py-6 text-lg text-white" onPress={handleRedirection}>Connect your bank account</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}