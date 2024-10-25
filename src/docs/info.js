export const info = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Farmacia", 
        version: "1.0.0",
        description: "API para la gestión de usuarios",
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./src/docs/*.yml"], 
  };