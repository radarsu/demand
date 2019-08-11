import * as http2 from 'http2';
interface Config {
    devServer: {
        host: string;
        port: number;
        https: http2.SecureServerOptions;
    };
}
export default Config;
