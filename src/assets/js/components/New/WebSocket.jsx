import React, { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

function WebSocket() {
    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
    });
    setTimeout(() => {
        window.Echo.channel('test')
            .listen('TestEvent', e => {
                console.log('Event received', e);
            });

    }, 500); 
    return <div>WebSocket</div>;
}

export default WebSocket;   

