import { useState, useEffect } from 'react';

export const useColorScheme = () => {
    const [mode, setMode] = useState<'light' | 'dark'>(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    );

    useEffect(() => {
        function handleModeChange(event: MediaQueryListEvent) {
            setMode(event.matches ? 'dark' : 'light');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleModeChange);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleModeChange);
        };
    }, []);

    return mode;
};
