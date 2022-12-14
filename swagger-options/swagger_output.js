const options =
{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "REST API - PIZZARIA",
    "description": "Swagger para o trabalho de web 2"
  },
  "host": (process.env.NODE_ENV ? "pgsql-web-2.herokuapp.com" : "localhost:3000"),
  "basePath": "/",
  "schemes": [
    "http",
    "https"
  ],
  "securityDefinitions": {
    "api_key": {
    "type": "apiKey",
    "name": "authorization",
    "in": "header",
    "description": "Authentication token"
    }
  },
  "security": [
    {"api_key":[]}
  ],
  "paths": {
    "/auth/": {
      "post": {
        "description": "Endpoint para se autenticar",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "example": "admin@hotmail.com"
                },
                "password": {
                  "example": "admin12345"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/user/": {
      "get": {
        "description": "Endpoint para buscar todos os usuários",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "description": "Endpoint para criar usuário",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "example": "armando@hotmail.com"
                },
                "password": {
                  "example": "1234a"
                },
                "nome" : {
                  "example" : "José"
                },
                "user_role_id" : {
                    "example" : 1
                  }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/user/{id}": {
      "delete": {
        "description": "Endpoint para deletar usuário",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "put": {
        "description": "Endpoint para editar usuário. Edição de user_role_id é limitado apenas para admins. Validação de role nas rotas.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "example": "armando@hotmail.com"
                },
                "password": {
                  "example": "1234a"
                },
                "nome" : {
                  "example" : "José"
                },
                "user_role_id" : {
                    "example" : 1
                  }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/user/myself": {
      "put": {
        "description": "Endpoint para editar a si mesmo",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "password": {
                  "example": "1234a"
                },
                "nome" : {
                  "example" : "José"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/publication/": {
      "post": {
        "description": "",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "descricao": {
                  "example": "Pizza grande"
                },
                "ingredientes": {
                  "example": "Calabresa"
                },
                "foto": {
                  "example": "http://link.foto.com.br"
                },
                "valor" : {
                  "example": 12.4
                },
                "nome" : {
                  "example" : "Pizza de Calabresa"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "get": {
        "description": "Buscar publicação por ingredientes ou valor máximo",
        "parameters": [
          {
            "name": "valor",
            "in": "query",
            "type": "string"
          },
          {
            "name": "ingredientes",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/publication/mostlikes": {
      "get": {
        "description": "Buscar publicação com maior numero de likes",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/publication/comment/{idpublicacao}": {
      "post": {
        "description": "Adicionar um comentário a uma publicação",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "mensagem": {
                  "example": "Pizza muito boa!!"
                }
              }
            }
          },
          {
            "name": "idpublicacao",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "get": {
        "description": "Endpoint para buscar comentários de uma publicação",
        "parameters": [
          {
            "name": "idpublicacao",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/publication/like/{id}": {
      "put": {
        "description": "Endpoint para dar like em uma publicação",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/publication/comment/like/{id}": {
      "put": {
        "description": "Endpoint para dar like em um comentário",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/publication/comment/dislike/{id}": {
      "put": {
        "description": "Endpoint para dar dislike em um comentário",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
  }
}

module.exports = options