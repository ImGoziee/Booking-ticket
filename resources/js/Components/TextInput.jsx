import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'shadow-sm p-3 text-sm focus:border-none bg-[#f2f2f2] rounded-lg w-full border-none focus:outline-none focus:ring-gray-200 text-black' +
                className
            }
            ref={localRef}
        />
    );
});
