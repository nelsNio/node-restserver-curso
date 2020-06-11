/**
 * Puerto
 */

process.env.PORT = process.env.PORT || 3000;
/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Vencimiento de token
 * 60 segundos
 * 60 minutos
 * 24 horas
 */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 2;

/**
 * Seed de auntenticacion
 */
process.env.SEED = 'este-es-secret-code';

/**
 * Base de datos
 */
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://nelsNio:jukses-riqzit-4bIqco@cluster0-q6kyb.mongodb.net/cafe';

}
process.env.URL_DB = urlDB;
// process.env.URL_DB = 'mongodb+srv://nelsNio:jukses-riqzit-4bIqco@cluster0-q6kyb.mongodb.net/cafe';