import * as fs from 'fs'
import * as _ from 'lodash'
import * as webpack from 'webpack'

// info
const name = `Shard`
const description = `Dark Fantasy MMORPG`
const title = `${name} - ${description}`

// host
const port = 8500
const host = {
    dev: `localhost.radrat.pl`,
    prod: `shard.pl`,
}

// backend
const backend = {
    dev: {
        port: port + 1,
    },
    prod: {
        port: port + 2,
    },
}

// theme
const theme = {
    color: `#252626`,
}

// metadata for template
const data = {
    description,
    fallback: ``,
    html: ``,
    name,
    theme,
    title,
}
data.html = _.template(fs.readFileSync('./src/bootstrap/meta.html', 'utf-8'))(data)
data.fallback = fs.readFileSync('./src/app/main/main.template.html', 'utf-8')

// paths
const sshPath = `/mnt/c/Users/rkroh/.ssh/radrat.pl`

// webpack
const webpackConfig: webpack.Configuration & { devServer: any } = {
    devServer: {
        host: host.dev,
        hot: true,
        http2: true,
        https: {
            cert: fs.readFileSync(`${sshPath}/cert.pem`),
            key: fs.readFileSync(`${sshPath}/privkey.pem`),
        },
        open: false,
        port,
    },
}

// export
const meta = {
    host,
    backend,
    data,
    webpack: webpackConfig,
}

export default meta;