export default function OauthButton({
    className = '',
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex gap-1 items-center justify-center text-sm border-2 rounded-xl border-[#171717] hover:bg-[#171717] duration-200 w-[145px] py-2` +
                className
            }
        >
            {children}
        </button>
    );
}
