import os from 'os';

export async function GET() {
    try {
        const networkInterfaces = os.networkInterfaces();
        let macAddress = null;

        // Loop through all network interfaces to find one with a MAC address
        for (const interfaceName in networkInterfaces) {
            const interfaces = networkInterfaces[interfaceName];
            if (!interfaces)
                continue;
            for (const interfaceInfo of interfaces) {
                // Filter out loopback interfaces (no MAC address for them)
                if (interfaceInfo.family === 'IPv4' && interfaceInfo.mac && interfaceInfo.mac !== '00:00:00:00:00:00') {
                    macAddress = interfaceInfo.mac;
                    break;
                }
            }
            if (macAddress) break; // Break if MAC address is found
        }

        if (macAddress) {
            return new Response(JSON.stringify({ macAddress }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'MAC address not found' }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to retrieve MAC address' }), { status: 500 });
    }
}
