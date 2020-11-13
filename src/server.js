import dbConnection from './setup/db.js'; //Inicia banco de dados
import app from './app.js';

const { PORT } = process.env || 8081;

let server;

dbConnection.then(() => {
  console.log('BD conectado com sucesso. :)');
  server = app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}...`);
  });
});

//Global error handler (non async)
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); //0 = sucess, 1 = unhandledRejection
  });
});

//Heroku event to close the app
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
