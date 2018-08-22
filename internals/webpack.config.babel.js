import glob from 'glob'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'

const publicDir = path.resolve(__dirname, '../src/public')
const outDir = path.resolve(__dirname, '../dist/assets')
const pattern = `${ publicDir }/+(img|video)/**/*.*`
const staticFiles = glob.sync(pattern)

export default {
  mode: process.env.NODE_ENV === 'production' ?
    'production' : 'development',
  context: path.resolve(__dirname, '..'),
  entry: {
    static: staticFiles,
    '404': [
      './src/public/stylus/pages/404.styl'
    ],
    about: [
      './src/public/stylus/pages/about.styl'
    ],
    lp: [
      './src/public/stylus/pages/lp.styl',
      './src/public/js/lp'
    ],
    contact: [
      './src/public/stylus/pages/contact.styl'
    ],
    'contract-models': [
      './src/public/stylus/pages/contract-models.styl'
    ],
    domains: [
      './src/public/stylus/pages/domains.styl'
    ],
    post: [
      './src/public/stylus/pages/post.styl',
    ],
    posts: [
      './src/public/stylus/pages/posts.styl',
      './src/public/js/posts'
    ],
    rd: [
      './src/public/stylus/pages/rd.styl'
    ],
    'services': [
      './src/public/stylus/pages/services.styl'
    ],
    'success-stories': [
      './src/public/stylus/pages/success-stories.styl'
    ]
  },
  output: {
    path: outDir,
    publicPath: '/assets',
    filename: 'js/[name].[hash:5].js'
  },
  plugins: [
    new CleanWebpackPlugin([ outDir ], {
      verbose: true,
      watch: true,
      allowExternal: true
    }),
    new ExtractTextPlugin('css/[name].[hash:5].css'),
    new OptimizeCssAssetsPlugin(),
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist/manifest.json'),
      publicPath: 'http://d-14:3101/assets/',
      writeToDisk: true
    })
  ],
  module: {
    rules: [ {
      test: /.styl$/,
      use: ExtractTextPlugin.extract({
        use: [ {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'stylus-loader',
          options: {
            import: [
              '~kouto-swiss/index.styl'
            ]
          }
        } ]
      })
    }, {
      test: /\.(ico|jpg|png|gif|svg|bmp|webp|mp4)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash:5].[ext]',
            context: 'src/public',
            publicPath: '/assets',
            emitFile: true
          }
        }
      ]
    },
    {
      test: /\.(ttf|eot|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash:5].[ext]',
            context: 'src/public',
            publicPath: '/assets/',
            emitFile: true
          }
        }
      ]
    }, ]
  },
  resolve: {
    extensions: [ '.js', '.styl' ],
    modules: [
      'node_modules',
      'src/public'
    ]
  }
}
