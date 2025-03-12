import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import OauthButton from '@/Components/OauthButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const RegisterForm = ({ data, setData, errors, processing }) => {
    return (
        <>
            <h1 className='font-medium text-2xl leading-loose'>Sign Up Account</h1>
            <p className='text-sm text-gray-400 txt-gradient'>Enter your personal data to create your account.</p>
            <div className="mt-6 flex gap-2">
                <OauthButton>
                    <img src="/assets/svg/google.svg" className='w-6 h-6 rounded-full' alt="" />
                    <p>Google</p>
                </OauthButton>
                <OauthButton>
                    <img src="/assets/svg/metamask.svg" className='w-6 h-6 rounded-full' alt="" />
                    <p>MetaMask</p>
                </OauthButton>
            </div>
            <div className="relative items-center justify-center w-full">
                <hr className="h-px my-8 !bg-[#171717] border-0 w-full"></hr>
                <span className="absolute px-3 text-gray-400 text-sm top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black">Or</span>
            </div>
            <div className='w-full'>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-2"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="w-full mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-2"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="w-full mt-4">
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1"
                    onChange={(e) => setData('password', e.target.value)}
                    required
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="w-full mt-4">
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="mt-4 w-full">
                <PrimaryButton className="w-full" disabled={processing}>Sign Up</PrimaryButton>
            </div>
        </>
    );
};

export default RegisterForm;
