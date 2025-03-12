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
                'shadow-sm p-3 text-sm focus:border-none bg-[#121212] rounded-lg w-full border-none focus:outline-none focus:ring-gray-700 text-gray-400' +
                className
            }
            ref={localRef}
        />
    );
});
