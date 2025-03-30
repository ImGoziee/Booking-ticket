export default function OauthButton({
    className = '',
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex gap-1 items-center justify-center text-sm rounded-xl bg-[#E8E6EF] hover:bg-[#f2f2f2] text-black duration-200 w-[165px] py-2` +
                className
            }
        >
            {children}
        </button>
    );
}
