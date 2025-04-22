const { spawn: nodeSpawn } = require('child_process')
const path = require('path')
const browsersync = require('browser-sync')
const { deleteAsync } = require('del')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const cssnano = require('gulp-cssnano')
const duration = require('gulp-duration')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const { gifsicle, mozjpeg, optipng, svgo } = require('gulp-imagemin')
const inline = require('gulp-inline-source')
const plumber = require('gulp-plumber')
const dartSass = require('sass')
const gulpSass = require('gulp-sass')
const sass = gulpSass(dartSass)
const size = require('gulp-size')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const webp = require('gulp-webp')
const configDev = require('./gulp_tasks/config/dev.js')
const configProd = require('./gulp_tasks/config/prod.js')
const errorHandler = require('./gulp_tasks/utils/errorHandler.js')

// Uyumlu bir spawn işlevi oluşturalım
function spawn(cmd, args, options) {
  // Windows'ta komutları düzeltme
  if (process.platform === 'win32') {
    options = options || {}
    options.shell = true
  }

  return nodeSpawn(cmd, args, options)
}

const argv = yargs(hideBin(process.argv)).argv

// We might not want to register the serviceworker for local dev.
// Very hacky way to do this!
process.env.SERVICEWORKER = argv.noserviceworker ? 'false' : 'true'

/**
 * Browsersync
 */
const bsServer = browsersync.create()
// let ngrokURL = null
// let browsersyncLocalURL = null
// let browsersyncExternalURL = null

function browser_sync(cb) {
  const bsOptions = Object.assign({}, configDev.browsersync, {
    // callbacks: {
    //   ready: async (_, bs) => {
    //     browsersyncLocalURL = bs.options.getIn(['urls', 'local'])
    //     browsersyncExternalURL = bs.options.getIn(['urls', 'external'])
    //     ngrokURL = await ngrok.connect(bs.options.get('port'))
    //     console.log(`Your ngrok URL is:`)
    //     console.log(`└── ${ngrokURL}`)
    //   },
    // },
  })
  bsServer.init(bsOptions)
  cb()
}

/**
 * Copy media and other files
 */
function copy_media_dev() {
  return gulp
    .src(configDev.copy.media.src)
    .pipe(gulp.dest(configDev.copy.media.dest))
}

function copy_media_prod() {
  return gulp
    .src(configProd.copy.media.src)
    .pipe(gulp.dest(configProd.copy.media.dest))
}

function copy_fonts_dev() {
  return gulp
    .src(configDev.copy.fonts.src)
    .pipe(gulp.dest(configDev.copy.fonts.dest))
}

function copy_fonts_prod() {
  return gulp
    .src(configProd.copy.fonts.src)
    .pipe(gulp.dest(configProd.copy.fonts.dest))
}

const copy_dev = gulp.series(copy_fonts_dev, copy_media_dev)

const copy_prod = gulp.series(copy_fonts_prod, copy_media_prod)

/**
 * Clean folders and files specified in the config
 */
function clean_dev() {
  return deleteAsync(configDev.delete.src)
}

function clean_prod() {
  return deleteAsync(configProd.delete.src)
}

function convert_media_webp() {
  try {
    return gulp
      .src('_assets/images/**/*')
      .pipe(plumber({ errorHandler }))
      .pipe(webp())
      .pipe(duration('Resimler Webp formatına çeviriliyor'))
      .pipe(gulp.dest(configProd.optimize.media.dest))
      .pipe(size(configProd.size))
  } catch (err) {
    console.error('Webp dönüşümü sırasında hata:', err)
    return Promise.resolve()
  }
}

/**
 * Optimize
 */
function optimize_media_prod() {
  return (
    gulp
      .src(configProd.optimize.media.src)
      .pipe(plumber({ errorHandler }))
      .pipe(
        imagemin([
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 5 }),
          svgo({
            plugins: [
              {
                name: 'removeViewBox',
                active: true,
              },
              {
                name: 'cleanupIDs',
                active: false,
              },
            ],
          }),
        ])
      )
      .pipe(duration('Optimizing media for production'))
      //.pipe(rename({ extname: '.webp' }))
      .pipe(gulp.dest(configProd.optimize.media.dest))
      .pipe(size(configProd.size))
  )
}

function optimize_svg_prod() {
  try {
    return gulp
      .src('_assets/images/svg/*.svg') // SVG dosyalarının bulunduğu klasör
      .pipe(plumber({ errorHandler }))
      .pipe(
        imagemin([
          svgo({
            plugins: [
              { name: 'removeViewBox', active: true }, // ViewBox'u kaldır
              { name: 'cleanupIDs', active: false }, // ID'leri temizleme (gerekirse açabilirsiniz)
            ],
          }),
        ])
      )
      .pipe(gulp.dest(configProd.optimize.media.dest))
      .pipe(size(configProd.size)) // Dosya boyutlarını yazdırma
  } catch (err) {
    console.error('SVG optimizasyonu sırasında hata:', err)
    return Promise.resolve()
  }
}

function optimize_styles_prod() {
  return gulp
    .src(configProd.optimize.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(cssnano(configProd.optimize.styles.options))
    .pipe(duration('Optimizing and minifying CSS for production'))
    .pipe(gulp.dest(configProd.optimize.styles.dest))
    .pipe(size(configProd.size))
}

function optimize_scripts_prod() {
  return gulp
    .src(configProd.optimize.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(terser(configProd.optimize.scripts.options))
    .pipe(duration('Optimizing, minifying and minifying JS for production'))
    .pipe(gulp.dest(configProd.optimize.scripts.dest))
    .pipe(size(configProd.size))
}

function optimize_html_prod() {
  return gulp
    .src(configProd.optimize.html.src)
    .pipe(plumber({ errorHandler }))
    .pipe(htmlmin(configProd.optimize.html.options))
    .pipe(duration('Optimizing and minifying HTML for production'))
    .pipe(gulp.dest(configProd.optimize.html.dest))
    .pipe(size(configProd.size))
}

function optimize_inline_prod() {
  return gulp
    .src(configProd.optimize.html.src)
    .pipe(plumber({ errorHandler }))
    .pipe(
      inline({
        rootpath: configProd.buildDir,
      })
    )
    .pipe(duration('Inlining CSS into HTML for production'))
    .pipe(gulp.dest(configProd.optimize.html.dest))
}

const optimize_prod = gulp.series(
  convert_media_webp,
  optimize_media_prod,
  optimize_svg_prod,
  optimize_styles_prod,
  optimize_scripts_prod,
  optimize_html_prod,
  optimize_inline_prod
)

/**
 * Scripts
 */
function scripts_dev() {
  return gulp
    .src(configDev.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(duration('Compiling ES6 js for development'))
    .pipe(gulp.dest(configDev.scripts.dest))
    .pipe(bsServer.stream())
}

function scripts_prod() {
  return gulp
    .src(configProd.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(sourcemaps.write('.'))
    .pipe(duration('Compiling ES6 js for production'))
    .pipe(gulp.dest(configProd.scripts.dest))
}

/**
 * Styles
 */
function styles_dev() {
  const processors = [
    autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false }),
  ]

  return gulp
    .src(configDev.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(duration('Compiling SCSS and vendor prefixing CSS for development'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(configDev.styles.dest))
    .pipe(bsServer.stream())
}

function styles_prod() {
  const processors = [
    autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false }),
  ]

  return gulp
    .src(configProd.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(duration('Compiling SCSS and minifying CSS for production'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(configProd.styles.dest))
}

/**
 * Run the build
 */
const build_dev = gulp.series(
  clean_dev,
  jekyll_build_dev,
  gulp.parallel(
    styles_dev,
    scripts_dev,
    copy_dev,
    convert_media_webp,
    optimize_svg_prod
  )
)

const build_prod = gulp.series(
  clean_prod,
  jekyll_build_prod,
  gulp.parallel(
    styles_prod,
    scripts_prod,
    copy_prod,
    convert_media_webp,
    optimize_svg_prod
  )
)

const deploy_dryrun = gulp.series(build_prod, optimize_prod)

const deploy = gulp.series(build_prod, optimize_prod)

/**
 * Jekyll
 */
function jekyll_build_dev(cb) {
  let args = [
    'exec',
    'jekyll',
    'build',
    `--source=${configDev.jekyll.src}`,
    `--destination=${configDev.jekyll.dest}`,
    `--config=${configDev.jekyll.config}`,
    `--trace`,
  ]

  // Activate the profiler if needed
  if (argv.profile) {
    args = args.concat('--profile')
  }

  return spawn('bundle', args, { stdio: 'inherit' }).on('close', cb)
}

function jekyll_build_prod(cb) {
  let args = [
    'exec',
    'jekyll',
    'build',
    `--source=${configProd.jekyll.src}`,
    `--destination=${configProd.jekyll.dest}`,
    `--config=${configProd.jekyll.config}`,
  ]

  // Activate the profiler if needed
  if (argv.profile) {
    args = args.concat('--profile')
  }

  return spawn('bundle', args, { stdio: 'inherit' }).on('close', cb)
}

/**
 * Watch
 */
function watch() {
  gulp.watch(
    configDev.watch.jekyll,
    gulp.series(jekyll_build_dev, function browsersync_reload(cb) {
      bsServer.reload()
      /*
        console.log(`** Reminder **`)
        console.log(`BrowserSync URLs`)
        console.log(`├── ${browsersyncLocalURL}`)
        console.log(`└── ${browsersyncExternalURL}`)
        console.log(`ngrok URL`)
        console.log(`└── ${ngrokURL}`)
        */
      cb()
    })
  )
  gulp.watch(configDev.watch.styles, styles_dev)
  gulp.watch(configDev.watch.scripts, scripts_dev)
}

/**
 * Build the development environment and watch files for changes
 */
const defaultTask = gulp.series(build_dev, browser_sync, watch)

// Exports
exports.browser_sync = browser_sync
exports.copy_media_dev = copy_media_dev
exports.copy_media_prod = copy_media_prod
exports.copy_fonts_dev = copy_fonts_dev
exports.copy_fonts_prod = copy_fonts_prod
exports.copy_dev = copy_dev
exports.copy_prod = copy_prod
exports.optimize_prod = optimize_prod
exports.scripts_dev = scripts_dev
exports.scripts_prod = scripts_prod
exports.styles_dev = styles_dev
exports.styles_prod = styles_prod
exports.build_dev = build_dev
exports.build_prod = build_prod
exports.deploy_dryrun = deploy_dryrun
exports.deploy = deploy
exports.watch = watch
exports.default = defaultTask
