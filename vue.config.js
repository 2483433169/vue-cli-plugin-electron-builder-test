module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.bmp$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'files/[name].[ext]'
                    }
                }]
            }]
        }
    }
}