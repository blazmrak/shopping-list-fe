const config = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  tailwindcss: {
    jit: true,
    darkMode: 'media'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'shopping-list-fe',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  server: {
    port: process.env.PORT || 3000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios-accessor'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    https: process.env.NODE_ENV === 'production',
    proxy: true,
    credentials: true,
    headers: {
      common: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  },

  proxy: {
    '/api/': {
      target: process.env.API_BASE_URL || 'http://localhost:8080/shopping-list/',
      pathRewrite: { '^/api/': process.env.API_VERSION || '/v1/' }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
  },

  auth: {
    cookie: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          maxAge: 60 * 60 * 24
        },
        refreshToken: {
          property: 'accessToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: {
            headers: { 'Content-Type': 'application/json' },
            url: '/api/users/login',
            method: 'post'
          },
          refresh: { url: '/api/users/login', method: 'post' },
          user: { url: '/api/users/me', method: 'get', userProperty: false },
          logout: { url: '/api/auth/logout', method: 'post' }
        }
      }
    },
    redirect: {
      login: '/login/',
      logout: '/',
      home: '/lists/'
    }
  },
  vuetify: {
    treeShake: true
  }
}

export default config
