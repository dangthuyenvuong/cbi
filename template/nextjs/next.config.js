const path = require('path')
const withImages = require('next-images')

module.exports = withImages({
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        disableStaticImages: true
    }
})


// module.exports = withImages({
//     webpack(config, options) {
//         return config
//     }
// })