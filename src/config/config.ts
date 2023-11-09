export default function config(key: string) {
    switch (key) {
        case 'fuDiscServerUri':
            return process.env.NODE_OPTIONS?.includes('useLocalBackend')
                ? 'http://localhost:4000'
                : 'https://fudisc-server.henzi.fi'
        default:
            return ''
    }
}