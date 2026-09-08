import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.4',
        info: {
            title: 'Gestion de mes contacts',
            description: 'API REST pour chercher, ajouter, mettre à jour, supprimer des contacts',
            version: '1.0.0',
        },
        servers : [
            {
                url : 'http://localhost:3000/',
            },
        ],
        "components":
        {
            "schemas":
            {
                "contact":
                {
                    "type": "object",
                    "properties":
                    {
                        "id": { "type": "integer", "example" :1, "description":"id de l'activité" },
                        "name": { "type": "string", "example" :"toto", "description" : "nom du contact"  },
                        "email" : { "type": "string", "example" :"toto@gmail.com", "description" : "email"  }
                    },
                    required: ['id', 'name', 'email']
                },
            },
        }
    },
    apis: ['./routes/*.mjs'], // where to find information to generate documentation
};

const openApiSpecification = swaggerJsdoc(options);
export {openApiSpecification};
