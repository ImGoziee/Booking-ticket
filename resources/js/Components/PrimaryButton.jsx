export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `rounded-lg bg-[#5447FF] py-3 text-md font-medium text-[#fff] transition duration-150 ease-in-out hover:bg-[#5347ffcc] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
