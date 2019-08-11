// import * as demand from '../demand-core';

const config: any = {
    devServer: {
        host: `localhost.radrat.pl`,
        port: 8500,
        https: {
            key: `/mnt/c/Users/rkroh/.ssh/radrat.pl/privkey.pem`,
            cert: `/mnt/c/Users/rkroh/.ssh/radrat.pl/cert.pem`,
        },
    },
};

export default config;