// app/_layout.tsx
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
    const router = useRouter();
    const isAuthenticated = false; // Cambia esta variable según el estado de autenticación real

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/auth'); // Redirige a la pantalla de inicio de sesión si no está autenticado
        }
    }, [isAuthenticated]);

    return <Slot />; // Esto permite que las demás rutas carguen correctamente
}
