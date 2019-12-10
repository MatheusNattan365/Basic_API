const env = process.env.NODE_ENV || 'dev';
require('dotenv/config')

const config = () => {
    switch (env) {
        case 'dev':
            return {
                db_connection_string: process.env.DB_CONNECTION_URL,
                port: process.env.PORT,
                jwt_secret_key: process.env.SECRET_KEY_JWT,
                jwt_expires: '7d'
            }
        case 'hml':
            return {
                db_connection_string: process.env.DB_CONNECTION_URL,
                port: process.env.PORT,
                jwt_secret_key: process.env.SECRET_KEY_JWT,
                jwt_expires: '7d'
            }
        case 'prod':
            return {
                db_connection_string: process.env.DB_CONNECTION_URL,
                port: process.env.PORT,
                jwt_secret_key: process.env.SECRET_KEY_JWT,
                jwt_expires: '7d'
            }
    }
};

console.log(`Executando API em modo ${env}`);


module.exports = config();