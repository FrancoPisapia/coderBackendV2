import __dirname from '../../shared/direname.js'

export const swaggerOptions= {
    definition:{
      openapi:'3.0.0',
      info:{
        title:'Documentacion del poder y saber',
        description:'API pensada para clase de Swagger '
      }
    },
      //apis:[`${__dirname}/docs/**/*.yaml`]
      apis:[`src/docs/**/*.yaml`]
}