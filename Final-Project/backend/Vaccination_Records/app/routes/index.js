
import router from './vaccination-record-routes.js'

export default (app) => {
    app.use('/records', router )
}