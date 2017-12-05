import createRoutes from './create-routes'
import createStore from './create-store'

export default (context, options = {}, register) => {
  options = { scope: 'danju', prefix: '/', ...options }

  return {
    routes: createRoutes(options),
    store: createStore(options),
    options
  }
}
