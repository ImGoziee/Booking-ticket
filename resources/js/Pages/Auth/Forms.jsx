import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import LoginForm from '@/Components/Auth/LoginForm';
import RegisterForm from '@/Components/Auth/RegisterForm';
import FormSwticher from '@/Components/Auth/FormSwticher';

export default function Forms({ status, canResetPassword }) {
    const [isLogin, setIsLogin] = useState(true);
    const [process, setProcess] = useState(false);

    const handleClick = (event) => {
        if (process) {
            event.preventDefault();
            return;
        }
        setProcess(true);
        setIsLogin((prev) => !prev);
        setTimeout(() => setProcess(false), 1000);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        name: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isLogin) {
            post(route('login'), {
                onFinish: () => reset('password'),
            });
        } else {
            post(route('register'), {
                onFinish: () => reset('password'),
            });
        }
    };

    return (
        <GuestLayout submit={submit}>
            <Head title={isLogin ? 'Login' : 'Register'} />

            <div className='w-1/2 p-16 flex flex-col justify-center items-center'>
                {isLogin && (
                    <LoginForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        canResetPassword={canResetPassword}
                    />
                )}
            </div>
            <div className='grow  p-16 flex flex-col justify-center items-center'>
                {!isLogin && (
                    <RegisterForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                    />
                )}
            </div>
            <FormSwticher
                isLogin={isLogin}
                handleClick={handleClick}
                process={process}
                processing={processing}
            />
        </GuestLayout>
    );
}