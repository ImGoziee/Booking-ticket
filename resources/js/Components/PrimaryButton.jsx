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
                `rounded-lg bg-white py-3 text-md font-medium text-[#171717] transition duration-150 ease-in-out hover:bg-gray-200 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
