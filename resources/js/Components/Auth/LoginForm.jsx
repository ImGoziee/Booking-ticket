import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import OauthButton from '@/Components/OauthButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

const LoginForm = ({ data, setData, errors, processing, canResetPassword }) => {
    return (
        <>
            <h1 className='font-medium text-black text-2xl leading-loose'>Sign in your Account</h1>
            <p className='text-sm text-gray-400 txt-gradient'>Enter your account to continue exploring the application.</p>
            <div className="mt-6 flex gap-2">
                <OauthButton>
                    <img src="/assets/svg/google.svg" className='w-6 h-6 rounded-full' alt="" />
                    <p>Google</p>
                </OauthButton>
            </div>
            <div className="relative items-center justify-center w-full">
                <hr className="h-px my-8 !bg-gray-300 border-0 w-full"></hr>
                <span className="absolute px-3 text-gray-400 text-sm top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white">Or</span>
            </div>
            <div className='w-full'>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-2 text-black"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
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
                    className="mt-1 text-black"
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="mt-4 flex w-full justify-between items-center">
                <label className="">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                            setData('remember', e.target.checked)
                        }
                    />
                    <span className="ms-2 text-sm text-gray-600">
                        Remember me
                    </span>
                </label>
                {canResetPassword && (
                    <Link
                        href={route('password.request')}
                        className="rounded-md text-sm text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-0"
                    >
                        Forgot your password?
                    </Link>
                )}
            </div>
            <div className="mt-4 w-full">
                <PrimaryButton className="w-full" disabled={processing}>Sign in</PrimaryButton>
            </div>
        </>
    );
};

export default LoginForm;