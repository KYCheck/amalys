'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from './header'
import { Button } from "@nextui-org/react";
import { keccak256 } from 'viem';
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { getAccount } from '@wagmi/core';
import { config } from '../wagmi';
import { abi, contractAddress } from '../constants/contractABI';

export default function State() {
    const [firstName, setFirstName] = useState('Ewan');
    const [lastName, setLastName] = useState('Hamon');
    const [bankName, setBankName] = useState('Boursorama');
    const [generatedHash, setGeneratedHash] = useState(''); 

    // CALL POWENS FOR KEY ECHANGES
    const searchParams = useSearchParams()
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        // Check if an access token is already stored in local storage
        const storedToken = localStorage.getItem('accessToken');
        const json = localStorage.getItem('result');

        if (storedToken) {
            setAccessToken(storedToken);
            console.log(json);
        } else {
            // If no token is stored, proceed to fetch a new one
            const code = searchParams.get('code');
            const data = {
                code: code,
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            };
            console.log('Code:', code);
            console.log('Client ID:', data.client_id);
            console.log('Secret:', data.client_secret);

            fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/token/access`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response: any) => response.json())
                .then((data: any) => {
                    console.log(data);
                    console.log('Access Token:', data.access_token);
                    localStorage.setItem('accessToken', data.access_token);
                    // Update the state with the new access token
                    setAccessToken(data.access_token);
                })
                .catch((error: any) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    // GET THE NAME OF THE ACCOUNT
    function getNameAccount() {
        const data = {
            "access_token": accessToken
        }

        console.log("Access Token111: " + accessToken);
        if (accessToken) {
            fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0//users/me/accounts`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then(data => {
                    console.log("data", data);
                    const fullName = data.accounts[0].name; // "M NOM PRENOM"
                    const parts = fullName.split(' ');
                    if (parts.length >= 3) {
                        setLastName(parts[1]); // Le nom
                        setFirstName(parts[2]); // Le prénom
                    }
                    console.log("lastName", lastName);
                    console.log("firstName", firstName);
                    console.log("data.accounts", data.accounts[0].bic); // BOUSFRPPXXX
                    setBankName('Boursorama'); // Need to change but here I test and they already put boursorama in the contract
                    console.log("bankName", bankName);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.log("Impossible to call Transaction function: access token is undefined.")
        }

    }
    useEffect(() => {
        if (accessToken) {
            getNameAccount();
        }
    }, [accessToken]);

    // Fonction pour convertir une chaîne UTF-8 en Uint8Array
    const toUint8Array = (str: string) => {
        return new TextEncoder().encode(str);
    };

    // Fonction pour hasher prénom, nom, et nom de banque
    const hashNameBank = () => {
        const combinedString = `${firstName}|${lastName}|${bankName}`;
        const combinedUint8Array = toUint8Array(combinedString);
        const hash = keccak256(combinedUint8Array);
        setGeneratedHash(hash);
        console.log(hash);
    };

    const AddData = async () => {
        const account = getAccount(config);
        console.log('Account:', account.address);

        if (generatedHash){
            console.log('Generated hash:', generatedHash);
            console.log('ADDDDDD')
            try {
                console.log('BONJ')
                const { request } = await simulateContract(config, { 
                    abi: abi,
                    address: contractAddress,
                    functionName: 'addData',
                    args: [
                        account.address,
                        generatedHash,
                    ],
                })
                console.log('Request:', request);
                console.log('Enrevoir')
                const hash = await writeContract(config, request) 
                const data = await waitForTransactionReceipt(config, {
                    hash: hash,
                } )
                console.log('Data:', data);
            } catch (error) { }
        } else {
            console.log('Impossible to call Transaction function: Generatedhash is undefined.')
        }
    };

    return (
        <div className='bg-zinc-900'>
            <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
                <Header />
                <main className="flex-grow">
                    <section className='text-center min-h-screen flex flex-col justify-center relative'>
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                                filter: 'blur(180px)',
                                width: '550px',
                                height: '550px',
                            }}
                        />
                        <div
                            className="absolute left-1/2 transform translate-x-40 -translate-y-80"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
                                filter: 'blur(80px)',
                                width: '330px',
                                height: '330px',
                            }}
                        />
                        <div
                            className="absolute transform -translate-x-10 -translate-y-80 "
                            style={{
                                background: 'linear-gradient(to bottom, rgba(83,32,73,1) 30%, rgba(82,55,149,1) 93%)',
                                filter: 'blur(80px)',
                                width: '330px',
                                height: '330px',
                            }}
                        />
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col gap-4 w-1/3">
                                <Button className="bg-tiffany_blue py-6 text-xl font-semibold" onPress={hashNameBank}>Generate hash</Button>
                                <Button className="bg-tiffany_blue py-6 text-xl font-semibold" onPress={AddData}>Put the hash on the SC</Button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div >
    );
}