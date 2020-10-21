function managerEntries(entry = []) {
    return [...entry, require.resolve("./register")];
}

function webpack(webpackConfig = {}, options = {}) {
    const { module = {} } = webpackConfig;
    const { loaderOptions, rule = {} } = options;

    return {
        ...webpackConfig,
        module: {
            ...module,
            rules: [
                ...(module.rules || []),
                {
                    test: [/\.(jsx?$|tsx?$)/],
                    ...rule,
                    enforce: "pre",
                    use: [
                        {
                            loader: require.resolve("@storybook/source-loader"),
                            options: {
                                loaderOptions,
                                injectStoryParameters: true
                            }
                        }
                    ]
                }
            ]
        }
    };
}

module.exports = { webpack, managerEntries };