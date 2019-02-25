define({ "api": [
  {
    "type": "post",
    "url": "/chpass",
    "title": "05) Change password",
    "group": "Authentication",
    "name": "changePassword",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/forgot",
    "title": "06) Forgot Password",
    "group": "Authentication",
    "name": "forgotPassword",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>valid email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if the email was sucessfuly sended</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/reset",
    "title": "07) Reset password",
    "group": "Authentication",
    "name": "resetPassword",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>valid email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly reseted</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "03) Login user",
    "group": "Authentication",
    "name": "userLogin",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>valid email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>jwt valid for 8 hours and must be placed at &quot;Authorization&quot; header</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>user name</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "is_admin",
            "description": "<p>flag indicating if is admin</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "is_doctor",
            "description": "<p>flag indicating if is doctor</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "photo",
            "description": "<p>user photo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "warnings",
            "description": "<p>unseen warnings count,</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "errors",
            "description": "<p>unseen errors count (if not admin always 0)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n     \"token\": \"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0YmIyNTFjLWYxY2EtNGVjZC04OTNlLTU2YWU0MDRlZjhlZiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNTI1MzQzNTg4LCJleHAiOjE1MjUzNzIzODgsInN1YiI6Ijo6ZmZmZjoxMC4wLjIuMiJ9.eZQ9dmDROpIh_6aEcoTTgH_DGauqNxqIsYSsW-tNoXQsLyBQb0VPLnFRzi7n_yKB_D43SGfj8PxBaDmt0WWgbjlKOJdP6WZYz5W_eVWDjpcNjzIq2nj8W1B3AstxZ5RmnP-NFd96Vot-O7mXXk96zGqTzIPYZcL3eX-MvgugCbGr2ikzyJ9y4oWxedzZTsY7u1C_Fy9ZuIG_LFUAZ7yBFXOWYSYdI8VEwxF3rgU1eagUZKO8ZMzVsRQPptSWA3i5-fJW3-k6tfstRcr-nUBOda7diBmuw6cT7zDgtuEyctouuH_RAP-lNuoIpn8pbiSunrNB2D8CGh7RP7CPvu3NSA\",\n     \"id\": \"84bb251c-f1ca-4ecd-893e-56ae404ef8ef\",\n     \"name\": \"Administrator Exemple\",\n     \"email\": \"admin@some.thing\",\n     \"is_admin\": true,\n     \"is_doctor\": false,\n     \"photo\": \"8b2fe0d0-0311-494a-8e27-522407d21b0e44fe0662-1271-4f42-a764-eeb0ba87cd87a2d6f862-c7e9-43a1-8066-87f157da7147.jpeg\",\n     \"warnings\": 0,\n     \"errors\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/register",
    "title": "01) Register user",
    "group": "Authentication",
    "name": "userRegister",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>valid email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>valid name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>jwt valid for 8 hours and must be placed at &quot;Authorization&quot; header</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>user name</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "is_admin",
            "description": "<p>flag indicating if is admin</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "is_doctor",
            "description": "<p>flag indicating if is doctor</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "photo",
            "description": "<p>user photo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n     \"token\": \"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0YmIyNTFjLWYxY2EtNGVjZC04OTNlLTU2YWU0MDRlZjhlZiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNTI1MzQzNTg4LCJleHAiOjE1MjUzNzIzODgsInN1YiI6Ijo6ZmZmZjoxMC4wLjIuMiJ9.eZQ9dmDROpIh_6aEcoTTgH_DGauqNxqIsYSsW-tNoXQsLyBQb0VPLnFRzi7n_yKB_D43SGfj8PxBaDmt0WWgbjlKOJdP6WZYz5W_eVWDjpcNjzIq2nj8W1B3AstxZ5RmnP-NFd96Vot-O7mXXk96zGqTzIPYZcL3eX-MvgugCbGr2ikzyJ9y4oWxedzZTsY7u1C_Fy9ZuIG_LFUAZ7yBFXOWYSYdI8VEwxF3rgU1eagUZKO8ZMzVsRQPptSWA3i5-fJW3-k6tfstRcr-nUBOda7diBmuw6cT7zDgtuEyctouuH_RAP-lNuoIpn8pbiSunrNB2D8CGh7RP7CPvu3NSA\",\n     \"id\": \"84bb251c-f1ca-4ecd-893e-56ae404ef8ef\",\n     \"name\": \"Administrator Exemple\",\n     \"email\": \"admin@some.thing\",\n     \"is_admin\": true,\n     \"is_doctor\": false,\n     \"photo\": \"8b2fe0d0-0311-494a-8e27-522407d21b0e44fe0662-1271-4f42-a764-eeb0ba87cd87a2d6f862-c7e9-43a1-8066-87f157da7147.jpeg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/check",
    "title": "04) Verify Token",
    "group": "Authentication",
    "name": "userVerifyToken",
    "description": "<p>endpoint to check token validity.</p>",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/validate/:token",
    "title": "02) Validate Email",
    "group": "Authentication",
    "name": "validateEmail",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>token provided to validate the eamil</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "html",
            "optional": false,
            "field": "web",
            "description": "<p>page to confirm the reception</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/board/:id/patient",
    "title": "04) Add Patient",
    "group": "Board",
    "name": "addPatientToBoard",
    "description": "<p>Associate a patient with a board</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient id to add</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"patient_id\":\"5d93585b-f511-4fa8-b69e-692c2474d5e8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "booleam",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly added</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board.js",
    "groupTitle": "Board",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/board",
    "title": "01) Create Board",
    "group": "Board",
    "name": "createBoard",
    "description": "<p>register a new board on the system</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "model",
            "description": "<p>model id of the board</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mac_address",
            "description": "<p>board MAC address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"model\":\"5d93585b-f511-4fa8-b69e-692c2474d5e8\",\n     \"mac_addr\": \"00:12:4b:00:06:0d:60:fb\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>return the id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "mac_addr",
            "description": "<p>return the mac address</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>return the generated password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n     \"id\":\"c293462b-fac1-4f67-b69e-47841274d5e8\",\n     \"mac_addr\": \"00:12:4b:00:06:0d:60:fb\",\n     \"password\": \"aj34Ah1DA1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/board.js",
    "groupTitle": "Board",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/board/:id",
    "title": "02) Change MAC or description",
    "group": "Board",
    "name": "exchangeBoard",
    "description": "<p>alter MAC address to board exchange</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>board id to exchange</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mac_addr",
            "description": "<p>new MAC address (just for admin)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>new description (just for sponsor)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"mac_addr\": \"45:44:54:65:65:16:51:31\",\n     \"description\": \"new description\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "booleam",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board.js",
    "groupTitle": "Board",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/board/:id",
    "title": "03) Get Board",
    "group": "Board",
    "name": "getBoardById",
    "description": "<p>get Board</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>model id of the board</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"board\": {\n        \"id\": \"6b6899af-89bf-453b-a0ce-52523bb6aefd\",\n        \"mac_addr\": \"45:44:54:65:65:16:51:31\",\n        \"Boardmodel\": {\n            \"id\": \"c5e10ee8-9d80-43e0-af6c-29e95a0ca66e\",\n            \"type\": \"non-wearable\",\n            \"name\": \"MySignals Blood Pressure\"\n        },\n        \"Sensors\": [\n            {\n                \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n                \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n                \"last_values\": [  17, 16, 13, 16, 15 ],\n                \"Sensormodel\": {\n                    \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n                    \"transducer\": \"dht22\",\n                    \"measure\": \"humidity\",\n                    \"min_acceptable\": \"30.00000\",\n                    \"max_acceptable\": \"50.00000\",\n                    \"min_possible\": \"20.00000\",\n                    \"max_possible\": \"60.00000\",\n                    \"min_graph\": \"20.00000\",\n                    \"max_graph\": \"60.00000\",\n                }\n            }\n        ]\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/board.js",
    "groupTitle": "Board",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/board/:id/sensor",
    "title": "06) Get Sensors",
    "group": "Board",
    "name": "getSensorsFromBoard",
    "description": "<p>Get sensors from a board</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>board id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"sensors\": [\n        {\n            \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n            \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n            \"last_values\": [  17, 16, 13, 16, 15 ],\n            \"Sensormodel\": {\n                \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n                \"transducer\": \"dht22\",\n                \"measure\": \"humidity\",\n                \"min_acceptable\": \"30.00000\",\n                \"max_acceptable\": \"50.00000\",\n                \"min_possible\": \"20.00000\",\n                \"max_possible\": \"60.00000\"\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/board.js",
    "groupTitle": "Board",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/inactive/board",
    "title": "07) Get inactive",
    "group": "Board",
    "name": "listInactive",
    "description": "<p>list all inactive boards</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "boards",
            "description": "<p>list of boards</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of each board</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "mac_addr",
            "description": "<p>mac address of each board</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of each board</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "created_at",
            "description": "<p>date of production</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"vitaboxes\": [\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"created_at\": \"2018-02-22T11:57:53.000Z\",\n         \"password\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"mac_addr\": \"45:44:54:65:65:16:51:31\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/board.js",
    "groupTitle": "Board",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/boardmodel",
    "title": "01) Create",
    "group": "Boardmodel",
    "name": "createBoardModel",
    "description": "<p>create a new board model.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>board model name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>board type, must be 'environmental', 'wearable' or 'non-wearable'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"name\": \"Zolertia RE-Mote\",\n     \"type\": \"environmental\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>created board model id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board_model.js",
    "groupTitle": "Boardmodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/boardmodel/:id",
    "title": "04) Delete",
    "group": "Boardmodel",
    "name": "deleteBoardModel",
    "description": "<p>remove a board model.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>board model id to delete</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return &quot;true&quot; if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board_model.js",
    "groupTitle": "Boardmodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "boardmodel/:id/sensor",
    "title": "06) Get Sensors",
    "group": "Boardmodel",
    "name": "getSensors",
    "description": "<p>list sensors of a board model</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>board model unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "models",
            "description": "<p>list of sensors</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "transducer",
            "description": "<p>transducer name</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "measure",
            "description": "<p>transducer measure</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "min_acceptable",
            "description": "<p>minimum acceptable value to sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "max_acceptable",
            "description": "<p>maximum acceptable value to sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "min_possible",
            "description": "<p>minimum possible value to sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "max_possible",
            "description": "<p>maximum possible value to sensor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n \"sensors\": [\n     {\n          \"id\": \"e783b552-567f-499b-b480-9d373fe62a17\"\n          \"transducer\": \"dht22\",\n          \"measure\":\"temperature\",\n          \"min_acceptable\": \"10\",\n          \"max_acceptable\": \"25\",\n          \"min_possible\": \"-20\",\n          \"max_possible\": \"50\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/board_model.js",
    "groupTitle": "Boardmodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/boardmodel",
    "title": "02) List",
    "group": "Boardmodel",
    "name": "listsBoardsModel",
    "description": "<p>list all board models.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "models",
            "description": "<p>list of board models</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of each board model</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>type of the model (must be 'environmental', 'wearable' or 'non-wearable')</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>name of the model</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"models\": [\n     {\n         \"id\": \"5d93585b-f511-4fa8-b69e-692c2474d5e8\",\n         \"type\": \"non-wearable\",\n         \"name\": \"MySignals\"\n     },\n     {\n         \"id\": \"d4710130-4c8c-4ade-96c7-0d5c00738eda\",\n         \"type\": \"environmental\",\n         \"name\": \"Zolertia RE-Mote\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/board_model.js",
    "groupTitle": "Boardmodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "boardmodel/:id/sensor",
    "title": "07) Remove Sensor",
    "group": "Boardmodel",
    "name": "removeSensor",
    "description": "<p>remove sensor from a board model</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>board model unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor to remove ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"sensor_id\": \"00397579-0a11-42ee-b522-b25e11630eda\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board_model.js",
    "groupTitle": "Boardmodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/boardmodel/:id/sensor",
    "title": "05) Add Sensor",
    "group": "Boardmodel",
    "name": "setSensors",
    "description": "<p>add sensors to a board model</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensors unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n \"sensor_id\": \"75a60f5f-ef3d-4556-9cdd-981894c8f1dc\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly added</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board_model.js",
    "groupTitle": "Boardmodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/boardmodel/:id",
    "title": "03) Update",
    "group": "Boardmodel",
    "name": "updateBoardModel",
    "description": "<p>update a board model.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>board model id to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>board model name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"name\": \"Zolertia RE-Mote\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return &quot;true&quot; if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board_model.js",
    "groupTitle": "Boardmodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/board/:id/patient",
    "title": "05) Remove Patient",
    "group": "Board",
    "name": "removePatientFromBoard",
    "description": "<p>Disassociate a patient from a board</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient id to add</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"patient_id\":\"5d93585b-f511-4fa8-b69e-692c2474d5e8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "booleam",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/board.js",
    "groupTitle": "Board",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/error/:id",
    "title": "02) Check",
    "group": "Error",
    "name": "checkError",
    "description": "<p>get all warnings from vitabox</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>error unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/error.js",
    "groupTitle": "Error",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/error/:page",
    "title": "01) List",
    "group": "Error",
    "name": "listAllErrors",
    "description": "<p>get all errors</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"errors\":[\n   {\n     \"id\": \"0e35251fdd9c4928-9b8d\",\n     \"title\": \"Os valores do sensor estão fora dos limites possíveis\",\n     \"datetime\": \"2018-02-19T14:55:59.000Z\",\n     \"message\": \"\",\n     \"seen_date\": \"2018-02-19T15:13:23.000Z\",\n     \"seen_user\":\"Administrator Name\"\n   },\n   {\n     \"id\": \"0e35251fdd9c4928-9b8d\",\n     \"title\": \"Os valores do sensor estão fora dos limites possíveis\",\n     \"datetime\": \"2018-02-19T14:55:59.000Z\",\n     \"message\": \"\",\n     \"seen_date\": null,\n     \"seen_user\": null\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/error.js",
    "groupTitle": "Error",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/file/:id",
    "title": "01) Download",
    "group": "Files",
    "name": "fileDownload",
    "version": "1.0.0",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>filename</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/manage.js",
    "groupTitle": "Files"
  },
  {
    "type": "put",
    "url": "/notification",
    "title": "03) Check notifications",
    "group": "Notification",
    "name": "checkNotifications",
    "description": "<p>check notifications as seen</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly checked</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/notification.js",
    "groupTitle": "Notification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/notification/:page",
    "title": "01) Get Notifications",
    "group": "Notification",
    "name": "getNotifications",
    "description": "<p>get sent notifications by page</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example to user:",
          "content": "{\n    \"notifications\": [\n        {\n            \"vitabox_id\": \"4561ab4-9823-1fea-783d-a32764fab23\",\n            \"vitabox\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n            \"patient_id\": \"2561cdf-dd9c-4fea-783d-a327645236a\",\n            \"patient\": \"Maria Albertina\",\n            \"send_date\": \"2018-07-16T13:36:23.149Z\",\n            \"check_date\": \"2018-07-16T13:36:25.102Z\",\n            \"message\": \"Relembro que tem uma consulta dia 25 de Abril\"\n        }]\n}",
          "type": "json"
        },
        {
          "title": "Response example to Vitabox:",
          "content": "{\n    \"notifications\": [\n        {\n            \"emitter_id\": \"0e35251f-dd9c-4928-9b8d-a94a44f22770\",\n            \"emitter\": \"Joaquim Simões\"\n            \"patient_id\": \"2561cdf-dd9c-4fea-783d-a327645236a\",\n            \"patient\": \"Maria Albertina\",\n            \"send_date\": \"2018-07-16T13:36:23.149Z\",\n            \"check_date\": \"2018-07-16T13:36:25.102Z\",\n            \"message\": \"Relembro que tem uma consulta dia 25 de Abril\"\n        }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/notification.js",
    "groupTitle": "Notification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/notification",
    "title": "02) Send Notification",
    "group": "Notification",
    "name": "postNotification",
    "description": "<p>sent notificationto patient or to vitabox</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiver",
            "description": "<p>patient id, if directed to a patient, or vitabox id, if directed to all patients at home</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>profile name</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "to_patient",
            "description": "<p>flag indicating if the notification is to a patient or not</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly sent</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/notification.js",
    "groupTitle": "Notification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/patient/:id/doctor",
    "title": "05) Accept as Doctor",
    "group": "Patient",
    "name": "acceptAsDoctor",
    "description": "<p>doctor accept patient</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "accept",
            "description": "<p>flag indicating if accept patient</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"accept\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/patient/:id/doctor",
    "title": "04) Add Doctor",
    "group": "Patient",
    "name": "addDoctor",
    "description": "<p>add doctor to a specific patient if the requester is sponsor of him.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user to add</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"email\": \"user-example@some.thing\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n doctor:{\n     \"id\":\"585402ef-68dd-44a4-a44b-04152e659d11\",\n     \"name\":\"Jose Manel\",\n     \"email\": \"jmanfns@a.aa\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/patient/:id/board",
    "title": "07) Get Boards",
    "group": "Patient",
    "name": "getBoardsFromPatient",
    "description": "<p>Get boards from a patient</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n \"boards\": [\n     {\n         \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\",\n         \"description\": \"kitchen\",\n         \"mac_addr\": \"00:12:4b:00:06:0d:60:c8\",\n         \"Boardmodel\": {\n             \"id\": \"17770821-6f5a-41b3-8ea3-d42c000326c6\",\n             \"type\": \"environmental\",\n             \"name\": \"Zolertia RE-Mote\"\n         },\n         \"Sensors\": [\n             {\n                 \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n                 \"last_values\": [ 17, 16, 13, 16, 15 ],\n                 \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n                 \"Sensormodel\": {\n                     \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n                     \"transducer\": \"dht22\",\n                     \"measure\": \"humidity\",\n                     \"min_acceptable\": \"30.00000\",\n                     \"max_acceptable\": \"50.00000\",\n                     \"min_possible\": \"20.00000\",\n                     \"max_possible\": \"60.00000\"\n                 }\n             }\n         ]\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "patient/:id/info",
    "title": "01) Get patient info",
    "group": "Patient",
    "name": "getPatientInfo",
    "description": "<p>get patient info.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "doctor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n patient:{\n     \"name\": \"José António\",\n     \"medication\": [\"paracetamol\", \"brufen\"],\n     \"info\": \"problemas a dormir\",\n     \"Boards\": [\n             {\n                 \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\",\n                 \"description\": \"kitchen\",\n                 \"mac_addr\": \"00:12:4b:00:06:0d:60:c8\",\n                 \"since\": \"2018-07-23T05:15:27.000Z\",\n                 \"schedules\": [10, 20],\n                 \"Boardmodel\": {\n                     \"id\": \"17770821-6f5a-41b3-8ea3-d42c000326c6\",\n                     \"type\": \"environmental\",\n                     \"name\": \"Zolertia RE-Mote\",\n                     \"tag\": \"zolertiaremote\"\n                 },\n                 \"Sensors\": [\n                     {\n                         \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n                         \"last_values\": [ 17, 16, 13, 16, 15 ],\n                         \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n                         \"Sensormodel\": {\n                             \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n                             \"transducer\": \"dht22\",\n                             \"measure\": \"humidity\",\n                             \"unit\": \"%\",\n                             \"min_acceptable\": \"30.00000\",\n                             \"max_acceptable\": \"50.00000\",\n                             \"min_possible\": \"20.00000\",\n                             \"max_possible\": \"60.00000\",\n                             \"to_read\": \"temperature\",\n                             \"tag\": \"humi\"\n                         }\n                     }\n                 ]\n             }\n         ],\n         \"Profiles\":[\n             {\n                 \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\", \n                 \"measure\": \"body fat\", \n                 \"tag\": \"bodyfat\", \n                 \"min\": 19,\n                 \"max\": 25,\n                 \"last_values\": [22, 23, 25, 23]\n             },\n             {\n                 \"id\": \"32443b5e-28cd-ab43-b86b-a423442401b8\", \n                 \"measure\": \"weight\", \n                 \"tag\": \"weight\", \n                 \"min\": 58, \n                 \"max\": 64,\n                 \"last_value\": [63, 64]\n             }\n         ],\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/patient/:id/doctor",
    "title": "06) Remove Doctor",
    "group": "Patient",
    "name": "removeDoctor",
    "description": "<p>remove doctor from a patient if the requester is sponsor of him.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "doctor_id",
            "description": "<p>doctor unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"doctor_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/patient/:id/photo",
    "title": "08) Update photo",
    "group": "Patient",
    "name": "setPhotoFromPatient",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient id</p>"
          },
          {
            "group": "Parameter",
            "type": "FormData",
            "optional": false,
            "field": "image",
            "description": "<p>FormData type file (max 70KB allowed)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly reseted</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "patient/:id/info",
    "title": "01) Update personal data",
    "group": "Patient",
    "name": "updateInfoToPatient",
    "description": "<p>update profile from patient.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "doctor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>patient name</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "birthdate",
            "description": "<p>patient birthdate (date only)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "gender",
            "description": "<p>patient gender (must be 'male', 'female' or 'undefined')</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cc",
            "description": "<p>patient citizen card number</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nif",
            "description": "<p>patient fiscal number</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"name\": \"José António\",\n     \"birthdate\": \"1987-02-28\",\n     \"gender\": \"male\",\n     \"cc\": \"123456789\",\n     \"nif\": \"987654321\",\n     \"info\": \"sofre do sono\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "patient/:id/biometric",
    "title": "02) Update Biometric Data",
    "group": "Patient",
    "name": "updateProfilesToPatient",
    "description": "<p>update height and weight from patient.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "doctor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient id</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "height",
            "description": "<p>patient height</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "weight",
            "description": "<p>patient weight</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"height\": 1.72,\n     \"weight\": 78.2m,\n     \"medication\": [\"paracetamol\", \"brufen\"],\n     \"info\": \"sofre do sono\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "patient/:id/profile",
    "title": "03) Update profile",
    "group": "Patient",
    "name": "updateProfilesToPatient",
    "description": "<p>update profile from patient.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "doctor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>clinical profile description</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "profiles",
            "description": "<p>list of profiles to define with the minimum and maximum acceptable values and the profile id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"profiles\":[\n         {\n           \"id\": \"585402ef-68dd-44a4-a44b-04152e659d11\",\n           \"min\": 100,\n           \"max\": 110  \n         }\n     ],\n     \"description\": \"Diabetes tipo 1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/patient/:id/exam",
    "title": "09) Update Exam",
    "group": "Patient",
    "name": "updateSchedule",
    "description": "<p>update exam scheduling to patient</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>patient id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board id</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "schedules",
            "description": "<p>list of times in hours</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"board_id\":\"5d93585b-f511-4fa8-b69e-692c2474d5e8\",\n     \"schedules\": [10, 20]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "booleam",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/patient.js",
    "groupTitle": "Patient",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/profilemodel/:id/measure",
    "title": "05) Add measure",
    "group": "Profilemodel",
    "name": "AddMaesureToProfileModel",
    "description": "<p>add measure to profile model.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>profile model id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "tag",
            "description": "<p>measure tag</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "measure",
            "description": "<p>measure name</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "min",
            "description": "<p>minimum acceptable value</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "max",
            "description": "<p>maximum acceptable value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n   \"min\": \"10\",\n   \"max\": \"50\",\n   \"tag\": \"musclemass\",\n   \"measure\": \"muscle mass\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>created profile measure id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/profile_model.js",
    "groupTitle": "Profilemodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/profilemodel",
    "title": "01) Create",
    "group": "Profilemodel",
    "name": "createProfileModel",
    "description": "<p>create a new profile model.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>profile model name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"name\": \"MySignals Balance\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>created profile model id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/profile_model.js",
    "groupTitle": "Profilemodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/profilemodel/:id",
    "title": "04) Remove",
    "group": "Profilemodel",
    "name": "deleteProfileModel",
    "description": "<p>remove a profile model.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>profile model id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/profile_model.js",
    "groupTitle": "Profilemodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/profilemodel",
    "title": "02) List",
    "group": "Profilemodel",
    "name": "listProfileModel",
    "description": "<p>list all profile models.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "profiles",
            "description": "<p>list of profile models</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of each profile model</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>profile name</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "measures",
            "description": "<p>measures list of each profile</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n\"profiles\": [\n        {\n            \"measures\": [\n                {\n                    \"min\": 90,\n                    \"max\": 120,\n                    \"tag\": \"pulse\",\n                    \"measure\": \"pulsação arterial\",\n                    \"id\": \"5b58452ca0b2a007d78f7974\"\n                },\n                {\n                    \"min\": 95,\n                    \"max\": 100,\n                    \"tag\": \"spo2\",\n                    \"measure\": \"oximetria do pulso\",\n                    \"id\": \"5b5845369e5e0807dc694fde\"\n                }\n            ],\n            \"name\": \"Diabetico\",\n            \"id\": \"5b5845209e5e0807dc694fdd\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/profile_model.js",
    "groupTitle": "Profilemodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/profilemodel/:pid/measure/:mid",
    "title": "06) Remove measure",
    "group": "Profilemodel",
    "name": "removeMeasureFromProfileModel",
    "description": "<p>remove meaure from a profile model.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":pid",
            "description": "<p>profile model id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":mid",
            "description": "<p>measure model id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/profile_model.js",
    "groupTitle": "Profilemodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/profilemodel/:id",
    "title": "03) Update name",
    "group": "Profilemodel",
    "name": "updateProfileModel",
    "description": "<p>list all profile models.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>profile id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>profile name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/profile_model.js",
    "groupTitle": "Profilemodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/record",
    "title": "1) Receive",
    "group": "Record",
    "name": "createRecord",
    "description": "<p>receive data from vitabox about it sensors</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "value",
            "description": "<p>value catched</p>"
          },
          {
            "group": "Parameter",
            "type": "datetime",
            "optional": false,
            "field": "datetime",
            "description": "<p>moment when the value was catched</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>(optional) patient unique ID related to the value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n \"records\":[\n     {\n         \"value\": 10,\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     },\n     {\n         \"value\": 13,\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly recorded</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/record.js",
    "groupTitle": "Record",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/record/sensor/:id/start/:sdate/end/:edate",
    "title": "4) List (Dates)",
    "group": "Record",
    "name": "listBetweenDates",
    "description": "<p>list all records from a sensor between dates</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>sensor unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": ":sdate",
            "description": "<p>start date in UTC format</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": ":edate",
            "description": "<p>end date in UTC format</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "records",
            "description": "<p>records list</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "value",
            "description": "<p>value catched</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "datetime",
            "description": "<p>moment when the value was catched</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "analyzed",
            "description": "<p>indicate if data was already analyzed</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value, may be null</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"records\": [\n     {\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"value\": 10,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": false,\n         \"patient_id\": null\n     },\n     {\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"value\": 13,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": true,\n         \"patient_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/record.js",
    "groupTitle": "Record",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/record/sensor/:sid/patient/:pid/start/:sdate/end/:edate",
    "title": "5) List to patient (Dates)",
    "group": "Record",
    "name": "listBetweenDatesByPatient",
    "description": "<p>list all records from a sensor between dates related to a patient</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":sid",
            "description": "<p>sensor unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":pid",
            "description": "<p>patient unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": ":sdate",
            "description": "<p>start date in UTC format</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": ":edate",
            "description": "<p>end date in UTC format</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "records",
            "description": "<p>records list</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "value",
            "description": "<p>value catched</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "datetime",
            "description": "<p>moment when the value was catched</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "analyzed",
            "description": "<p>indicate if data was already analyzed</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value, may be null</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"records\": [\n     {\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"value\": 10,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": false,\n         \"patient_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     },\n     {\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"value\": 13,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": true,\n         \"patient_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/record.js",
    "groupTitle": "Record",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/record/sensor/:id/page/:page",
    "title": "2) List (Page)",
    "group": "Record",
    "name": "listFromPage",
    "description": "<p>list all records from a sensor in a page</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>sensor unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":page",
            "description": "<p>each page has 25 records, page must be greater or equal to 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "records",
            "description": "<p>records list</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "value",
            "description": "<p>value catched</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "datetime",
            "description": "<p>moment when the value was catched</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "analyzed",
            "description": "<p>indicate if data was already analyzed</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value, may be null</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"records\": [\n     {\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"value\": 10,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": false,\n         \"patient_id\": null\n     },\n     {\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"value\": 13,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": true,\n         \"patient_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/record.js",
    "groupTitle": "Record",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/record/sensor/:sid/patient/:pid/page/:page",
    "title": "3) List to patient (Page)",
    "group": "Record",
    "name": "listFromPageByPatient",
    "description": "<p>list all records from a sensor in a page related to a patient</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":sid",
            "description": "<p>sensor unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":pid",
            "description": "<p>patient unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":page",
            "description": "<p>each page has 25 records, page must be greater or equal to 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "records",
            "description": "<p>records list</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "value",
            "description": "<p>value catched</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "datetime",
            "description": "<p>moment when the value was catched</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "analyzed",
            "description": "<p>indicate if data was already analyzed</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value, may be null</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"records\": [\n     {\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"value\": 10,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": false,\n         \"patient_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     },\n     {\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"value\": 13,\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n         \"analyzed\": true,\n         \"patient_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/record.js",
    "groupTitle": "Record",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/sensor/:id",
    "title": "01) Get",
    "group": "Sensor",
    "name": "findSensorById",
    "description": "<p>find Sensor</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>sensor id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"sensor\": {\n      \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n      \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n      \"last_values\": [  17, 16, 13, 16, 15 ],\n      \"Sensormodel\": {\n          \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n          \"transducer\": \"dht22\",\n          \"measure\": \"humidity\",\n          \"min_acceptable\": \"30.00000\",\n          \"max_acceptable\": \"50.00000\",\n          \"min_possible\": \"20.00000\",\n          \"max_possible\": \"60.00000\",\n          \"min_graph\": \"20.00000\",\n          \"max_graph\": \"60.00000\"\n      },\n      \"Board\": {\n        \"id\": \"6b6899af-89bf-453b-a0ce-52523bb6aefd\",\n        \"mac_addr\": \"45:44:54:65:65:16:51:31\",\n        \"description\": \"José António\"\n        \"Boardmodel\": {\n            \"id\": \"c5e10ee8-9d80-43e0-af6c-29e95a0ca66e\",\n            \"type\": \"non-wearable\",\n            \"name\": \"MySignals Blood Pressure\"\n        }\n      }\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/sensor.js",
    "groupTitle": "Sensor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/sensormodel",
    "title": "01) Create",
    "group": "Sensormodel",
    "name": "createSensormodel",
    "description": "<p>create a new sensor.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "transducer",
            "description": "<p>transducer name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "measure",
            "description": "<p>transducer measure</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "unit",
            "description": "<p>transducer measurement unit</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "tag",
            "description": "<p>transducer tag</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "min_acceptable",
            "description": "<p>minimum acceptable value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "max_acceptable",
            "description": "<p>maximum acceptable value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "min_possible",
            "description": "<p>minimum possible value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "max_possible",
            "description": "<p>maximum possible value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "min_graph",
            "description": "<p>minimum value to graph thresholds</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "max_graph",
            "description": "<p>maximum value to graph thresholds</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "to_read",
            "description": "<p>text to text-to-speech</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"transducer\": \"dht22\",\n     \"measure\":\"temperature\",\n     \"unit\": \"ºC\",\n     \"tag\": \"temp\",\n     \"min_acceptable\": \"10\",\n     \"max_acceptable\": \"25\",\n     \"min_possible\": \"-20\",\n     \"max_possible\": \"50\",\n     \"to_read\": \"temperature\",\n     \"min_graph\": \"0\",\n     \"max_graph\": \"13\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>created sensor id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/sensor_model.js",
    "groupTitle": "Sensormodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/sensormodel/:id",
    "title": "04) Delete",
    "group": "Sensormodel",
    "name": "deleteSensormodel",
    "description": "<p>remove a sensor</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>sensor ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return &quot;true&quot; if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/sensor_model.js",
    "groupTitle": "Sensormodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/sensormodel",
    "title": "02) List",
    "group": "Sensormodel",
    "name": "listSensormodels",
    "description": "<p>list all sensors.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "models",
            "description": "<p>list of sensors</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "transducer",
            "description": "<p>transducer name</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "measure",
            "description": "<p>transducer measure</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "min_acceptable",
            "description": "<p>minimum acceptable value to sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "max_acceptable",
            "description": "<p>maximum acceptable value to sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "min_possible",
            "description": "<p>minimum possible value to sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "max_possible",
            "description": "<p>maximum possible value to sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "min_graph",
            "description": "<p>minimum value to graph thresholds</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "max_graph",
            "description": "<p>maximum value to graph thresholds</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "to_read",
            "description": "<p>text to text-to-speech</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"sensors\": [\n     {\n         \"transducer\": \"dht22\",\n         \"measure\":\"temperature\",\n         \"tag\": \"temp\",\n         \"min_acceptable\": \"10\",\n         \"max_acceptable\": \"25\",\n         \"min_possible\": \"-20\",\n         \"max_possible\": \"50\",\n         \"min_graph\": \"5\",\n         \"max_graph\": \"30\",\n     },\n     {\n         \"transducer\": \"mq-7\",\n         \"measure\":\"carbon_monoxide\",\n         \"tag\": \"mono\",\n         \"min_acceptable\": \"2\",\n         \"max_acceptable\": \"10\",\n         \"min_possible\": \"10\",\n         \"max_possible\": \"500\",\n         \"min_graph\": \"0\",\n         \"max_graph\": \"13\",\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/sensor_model.js",
    "groupTitle": "Sensormodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/sensormodel/:id",
    "title": "03) Update",
    "group": "Sensormodel",
    "name": "updateSensormodel",
    "description": "<p>update a sensor.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>sensor id to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "transducer",
            "description": "<p>transducer name</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "min_acceptable",
            "description": "<p>minimum acceptable value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "max_acceptable",
            "description": "<p>maximum acceptable value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "min_possible",
            "description": "<p>minimum possible value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "max_possible",
            "description": "<p>maximum possible value to sensor</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "min_graph",
            "description": "<p>minimum value to graph thresholds</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "max_graph",
            "description": "<p>maximum value to graph thresholds</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"transducer\": \"dht22\",\n     \"min_acceptable\": \"10\",\n     \"max_acceptable\": \"25\",\n     \"min_possible\": \"-20\",\n     \"max_possible\": \"50\",\n     \"min_graph\": \"0\",\n     \"max_graph\": \"13\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return &quot;true&quot; if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/sensor_model.js",
    "groupTitle": "Sensormodel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user/:id/log",
    "title": "03) Get Logs",
    "group": "User",
    "name": "getLogs",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"logs\": [\n        {\n            \"datetime\": \"2018-06-18T15:40:14.742Z\",\n            \"message\": \"logged in\",\n            \"user_id\": \"1c64c510-4e17-46f8-bc97-c968d6b2e09b\",\n            \"id\": \"5b27d25e176a610eafa34a43\"\n        },\n        {\n            \"datetime\": \"2018-06-18T15:40:14.789Z\",\n            \"message\": \"logged in\",\n            \"user_id\": \"1c64c510-4e17-46f8-bc97-c968d6b2e09b\",\n            \"id\": \"5b27d25e176a610eafa34a44\"\n        },\n        {\n            \"datetime\": \"2018-06-18T15:40:14.792Z\",\n            \"message\": \"logged in\",\n            \"user_id\": \"1c64c510-4e17-46f8-bc97-c968d6b2e09b\",\n            \"id\": \"5b27d25e176a610eafa34a45\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/doctor/patient",
    "title": "04) Get patients",
    "group": "User",
    "name": "getPatientsAsDoctor",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "doctor"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"patients\": [\n     {\n         \"id\": \"a77ea0fe-5e34-4189-9702-95cb69b4cd1d\",\n         \"birthdate\": \"1987-02-28\",\n         \"name\": \"José António\",\n         \"gender\": \"male\",\n         \"since\": \"2018-02-19T14:55:59.000Z\",\n         \"active\": true,\n         \"weight\": 79.6,\n         \"height\": 1.74,\n         \"cc\": \"123456789\",\n         \"nif\": \"987654321\",\n         \"Boards\": [\n             {\n                 \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\",\n                 \"description\": \"kitchen\",\n                 \"mac_addr\": \"00:12:4b:00:06:0d:60:c8\",\n                 \"schedules\": [10, 20],\n                 \"Boardmodel\": {\n                     \"id\": \"17770821-6f5a-41b3-8ea3-d42c000326c6\",\n                     \"type\": \"environmental\",\n                     \"name\": \"Zolertia RE-Mote\"\n                 },\n                 \"Sensors\": [\n                     {\n                         \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n                         \"last_values\": [ 17, 16, 13, 16, 15 ],\n                         \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n                         \"Sensormodel\": {\n                             \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n                             \"transducer\": \"dht22\",\n                             \"measure\": \"humidity\",\n                             \"min_acceptable\": \"30.00000\",\n                             \"max_acceptable\": \"50.00000\",\n                             \"min_possible\": \"20.00000\",\n                             \"max_possible\": \"60.00000\"\n                         }\n                     }\n                 ]\n             }\n         ],\n         \"Profiles\":[\n             {\n                 \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\", \n                 \"measure\": \"body fat\", \n                 \"tag\": \"bodyfat\", \n                 \"min\": 19, \n                 \"max\": 25\n             },\n             {\n                 \"id\": \"32443b5e-28cd-ab43-b86b-a423442401b8\", \n                 \"measure\": \"weight\", \n                 \"tag\": \"weight\", \n                 \"min\": 58, \n                 \"max\": 64\n             }\n         ]\n         \"Vitabox\": {\n             \"id\": \"a6abfa76-68f0-4325-b3ab-6c540a800284\",\n             \"latitude\": \"51.5058372\",\n             \"longitude\": \"-0.1899126\",\n             \"address\": \"Kensington Gardens, London W8 4PX, Reino Unido\"\n         }\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/doctor/request/list",
    "title": "06) Get patient resquests",
    "group": "User",
    "name": "getRequestsAsDoctor",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "doctor"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"requests\": [\n     {\n         \"created_at\": \"2018-07-23T05:15:27.000Z\", \n         \"patient_id\": \"a6abfa76-68f0-4325-b3ab-6c540a800284\", \n         \"patient\":\"José Manuel\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/doctor/request/count",
    "title": "05) Count patient resquests",
    "group": "User",
    "name": "getRequestsCountAsDoctor",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "doctor"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"count\": 12\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user",
    "title": "02) List",
    "group": "User",
    "name": "listUsers",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"users\": [\n        {\n            \"id\": \"1c64c510-4e17-46f8-bc97-c968d6b2e09b\",\n            \"name\": \"Administrator Exemple\",\n            \"email\": \"admin@a.aa\",\n            \"photo\": null,\n            \"is_admin\": 1,\n            \"is_doctor\": 0\n        },\n        {\n            \"id\": \"9fc1d895-4a61-43d4-b6fa-96005b2f8e99\",\n            \"name\": \"José António\",\n            \"email\": \"jose@a.aa\",\n            \"photo\": null,\n            \"is_admin\": 0,\n            \"is_doctor\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/photo",
    "title": "01) Update photo",
    "group": "User",
    "name": "setPhotoFromUser",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "FormData",
            "optional": false,
            "field": "image",
            "description": "<p>FormData type file (max 70KB allowed)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/board",
    "title": "17) Add Board",
    "group": "Vitabox",
    "name": "addBoard",
    "description": "<p>add board to a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) description to identify the board</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>board password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mac_address",
            "description": "<p>board MAC address</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>board password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>board MAC address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"description\": \"kitchen\",\n     \"password\":\"WkN1NNQiRD\",\n     \"mac_addr\": \"00:12:4b:00:06:0d:60:fb\",\n     \"patient_id\": \"\",\n     \"type\": \"wearable\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "board",
            "description": "<p>return board inserted</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/patient",
    "title": "12) Add Patient",
    "group": "Vitabox",
    "name": "addPatient",
    "description": "<p>add patient to a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>patient name</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "birthdate",
            "description": "<p>patient birthdate (date only)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "gender",
            "description": "<p>patient gender (must be 'male', 'female' or 'undefined')</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cc",
            "description": "<p>patient citizen card number</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nif",
            "description": "<p>patient fiscal number</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"name\": \"José António\",\n     \"birthdate\": \"1987-02-28\",\n     \"gender\": \"male\",\n     \"cc\": \"123456789\",\n     \"nif\": \"987654321\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>new patient id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/user",
    "title": "09) Add User",
    "group": "Vitabox",
    "name": "addUser",
    "description": "<p>add user to a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user to add</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "sponsor",
            "description": "<p>(optional) flag to give the permission as sponsor of the vitabox</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"email\": \"user-example@some.thing\",\n     \"sponsor\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"name\": \"User Name\",\n \"id\": \"585402ef-68dd-44a4-a44b-04152e659d11\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox",
    "title": "01) Create",
    "group": "Vitabox",
    "name": "create",
    "description": "<p>create a new vitabox.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>created box id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>created box serial key</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id",
    "title": "08) Delete",
    "group": "Vitabox",
    "name": "delete",
    "description": "<p>list all users related with the vitabox if the requester is related too.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/board/disable",
    "title": "19) Disable Board",
    "group": "Vitabox",
    "name": "disableBoard",
    "description": "<p>disable board from a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"board_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly disabled</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/patient/disable",
    "title": "14) Disable Patient",
    "group": "Vitabox",
    "name": "disablePatient",
    "description": "<p>disable patient from a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"patient_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly disabled</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/board/enable",
    "title": "20) Enable Board",
    "group": "Vitabox",
    "name": "enableBoard",
    "description": "<p>disable board from a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"board_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly enabled</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/patient/enable",
    "title": "15) Enable Patient",
    "group": "Vitabox",
    "name": "enablePatient",
    "description": "<p>enable patient from a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>(only the first time if dont associate doctor) patient height</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "weight",
            "description": "<p>(only the first time if dont associate doctor) patient weight</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"patient_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\",\n     \"height\": 1.72,\n     \"weight\": 78.2m\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly enabled</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id/board",
    "title": "18) Get Boards",
    "group": "Vitabox",
    "name": "getBoards",
    "description": "<p>get boards of specific vitabox if the requester is related to it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "boards",
            "description": "<p>vitabox boards list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n  \"boards\": [\n     {\n         \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\",\n         \"description\": \"kitchen\",\n         \"mac_addr\": \"00:12:4b:00:06:0d:60:c8\",\n         \"updated_at\": \"2018-05-13T14:50:11.000Z\",\n         \"active\": true,\n         \"node_id\": \"60c8\",\n         \"Boardmodel\": {\n             \"id\": \"17770821-6f5a-41b3-8ea3-d42c000326c6\",\n             \"type\": \"environmental\",\n             \"name\": \"Zolertia RE-Mote\",\n             \"tag\": \"zolertiaremote\",\n         },\n         \"Sensors\": [\n             {\n                 \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n                 \"last_values\": [ 17, 16, 13, 16, 15 ],\n                 \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n                 \"Sensormodel\": {\n                     \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n                     \"transducer\": \"dht22\",\n                     \"measure\": \"humidity\",\n                     \"unit\": \"%\",\n                     \"min_acceptable\": \"30.00000\",\n                     \"max_acceptable\": \"50.00000\",\n                     \"min_possible\": \"20.00000\",\n                     \"max_possible\": \"60.00000\",\n                     \"to_read\": \"temperature\",\n                     \"tag\": \"humi\"\n                 }\n             }\n         ]\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id/patient",
    "title": "13) Get Patients",
    "group": "Vitabox",
    "name": "getPatients",
    "description": "<p>get patients of specific vitabox if the requester is related to it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "patients",
            "description": "<p>vitabox patients list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"patients\": [\n     {\n         \"id\": \"a77ea0fe-5e34-4189-9702-95cb69b4cd1d\",\n         \"birthdate\": \"1987-02-28\",\n         \"name\": \"José António\",\n         \"gender\": \"male\",\n         \"since\": \"2018-02-19T14:55:59.000Z\",\n         \"active\": true,\n         \"weight\": 79.6,\n         \"height\": 1.74,\n         \"cc\": \"123456789\",\n         \"nif\": \"987654321\",\n         \"photo\": \"h43gj2h34j2B34hg342jhhsu46SAkwKsR1.jpg\"\n         \"Boards\": [\n             {\n                 \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\",\n                 \"description\": \"kitchen\",\n                 \"mac_addr\": \"00:12:4b:00:06:0d:60:c8\",\n                 \"since\": \"2018-07-23T05:15:27.000Z\",\n                 \"schedules\": [10, 20],\n                 \"Boardmodel\": {\n                     \"id\": \"17770821-6f5a-41b3-8ea3-d42c000326c6\",\n                     \"type\": \"environmental\",\n                     \"name\": \"Zolertia RE-Mote\",\n                     \"tag\": \"zolertiaremote\"\n                 },\n                 \"Sensors\": [\n                     {\n                         \"id\": \"9cd77116-6edb-4072-9d66-204fca3d5a07\",\n                         \"last_values\": [ 17, 16, 13, 16, 15 ],\n                         \"last_commit\": \"2018-07-23T05:15:27.000Z\",\n                         \"Sensormodel\": {\n                             \"id\": \"1f8eab67-d39e-439e-b508-6ef6f2c6794a\",\n                             \"transducer\": \"dht22\",\n                             \"measure\": \"humidity\",\n                             \"unit\": \"%\",\n                             \"min_acceptable\": \"30.00000\",\n                             \"max_acceptable\": \"50.00000\",\n                             \"min_possible\": \"20.00000\",\n                             \"max_possible\": \"60.00000\",\n                             \"to_read\": \"temperature\",\n                             \"tag\": \"humi\"\n                         }\n                     }\n                 ]\n             }\n         ],\n         \"Profiles\":[\n             {\n                 \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\", \n                 \"measure\": \"body fat\", \n                 \"tag\": \"bodyfat\", \n                 \"min\": 19,\n                 \"max\": 25,\n                 \"last_values\": [22, 23, 25, 23]\n             },\n             {\n                 \"id\": \"32443b5e-28cd-ab43-b86b-a423442401b8\", \n                 \"measure\": \"weight\", \n                 \"tag\": \"weight\", \n                 \"min\": 58, \n                 \"max\": 64,\n                 \"last_value\": [63, 64]\n             }\n         ],\n         \"Doctors\":[\n             {\n                 \"id\": \"950c8b5e-6f43-4686-b21b-a435e96401b7\", \n                 \"name\": \"Julia Almeida\", \n                 \"email\": \"jalme@a.aa\"\n             }\n         ]\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id/settings",
    "title": "05) Get Settings",
    "group": "Vitabox",
    "name": "getSettings",
    "description": "<p>returns the vitabox settings</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "settings",
            "description": "<p>configuration's structure, defined by vitabox</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n     \"settings\":{\n         \"cnfg1\": \"true\",\n         \"cnfg2\": \"12345\",\n         \"cnfg3\": \"some other config\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id/user",
    "title": "10) Get Users",
    "group": "Vitabox",
    "name": "getUsers",
    "description": "<p>get users of specific vitabox if the requester is related to it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "users",
            "description": "<p>vitabox users list</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of each user</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of each user</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "since",
            "description": "<p>relationship date with the vitabox</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "sponsor",
            "description": "<p>flag indicating if the user is sponsor of the vitabox</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"users\": [\n     {\n         \"id\": \"585402ef-68dd-44a4-a44b-04152e659d11\",\n         \"email\": \"donaldtrump@usa.com\",\n         \"name\": \"Donald Trump\",\n         \"since\": \"2018-02-19T14:41:13.000Z\",\n         \"sponsor\": false\n     },\n     {\n         \"id\": \"78007a69-baa2-4b24-b936-234883811b6a\",\n         \"email\": \"queenelizabeth@majesty.uk\",\n         \"name\": \"Queen Elizabeth\",\n         \"since\": \"2018-02-19T14:40:14.000Z\",\n         \"sponsor\": true\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:own",
    "title": "04) Get info",
    "group": "Vitabox",
    "name": "list",
    "description": "<p>list all vitaboxes related to the user, or get info from the vitabox itself</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "any user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":own",
            "description": "<p>(optional just to admin or vitabox) user id indicate to list their own vitaboxes, or vitabox id to get info for itself</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "vitaboxes",
            "description": "<p>list of vitaboxes</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of each vitabox</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude of each vitabox, min: -90, max: 90 (based on google maps coordinates)</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude of each vitabox, min: -180, max: 180 (based on google maps coordinates)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>full address of each vitabox</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "sponsor",
            "description": "<p>flag indicating if the requester is sponsor of that vitabox (only if NOT admin)</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "settings",
            "description": "<p>configuration's structure, defined by vitabox (only if admin)</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "registered",
            "description": "<p>flag indicating if the vitabox was already registered (only if admin)</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "active",
            "description": "<p>flag indicating if the vitabox was already activated (only if admin)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "locality",
            "description": "<p>locality tag to get local pharmacies</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "district",
            "description": "<p>district tag to get local pharmacies</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "created_at",
            "description": "<p>date of production (only if admin)</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "updated_at",
            "description": "<p>date of last update (only if admin)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example to common user:",
          "content": "{\n \"vitaboxes\": [\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"latitude\": \"38.8976763\",\n         \"longitude\": \"-77.0387185\",\n         \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n         \"sponsor\": true,\n         \"active\": true\n         \"locality\": \"tomar\",\n         \"district\": \"santarem\"\n     },\n     {\n         \"id\": \"a6abfa76-68f0-4325-b3ab-6c540a800284\",\n         \"latitude\": \"51.5058372\",\n         \"longitude\": \"-0.1899126\",\n         \"address\": \"Kensington Gardens, London W8 4PX, Reino Unido\",\n         \"sponsor\": false,\n         \"active\": false,\n         \"locality\": \"tomar\",\n         \"district\": \"santarem\"\n     }\n ]\n}",
          "type": "json"
        },
        {
          "title": "Response example to admin:",
          "content": "{\n \"vitaboxes\": [\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"latitude\": \"38.8976763\",\n         \"longitude\": \"-77.0387185\",\n         \"settings\":{\n             \"cnfg1\": \"true\",\n             \"cnfg2\": \"12345\",\n             \"cnfg3\": \"some other config\"\n         },\n         \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n         \"registered\": false,\n         \"active\": false,\n         \"locality\": \"tomar\",\n         \"district\": \"santarem\"\n         \"created_at\": \"2018-02-22T11:57:53.000Z\",\n         \"updated_at\": \"2018-02-22T11:57:53.000Z\"\n     }\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"latitude\": \"51.5058372\",\n         \"longitude\": \"-0.1899126\",\n         \"settings\":{\n             \"cnfg1\": \"true\",\n             \"cnfg2\": \"12345\",\n             \"cnfg3\": \"some other config\"\n         },\n         \"address\": \"Kensington Gardens, London W8 4PX, Reino Unido\",\n         \"registered\": false,\n         \"active\": false,\n         \"locality\": \"tomar\",\n         \"district\": \"santarem\"\n         \"created_at\": \"2018-02-22T11:57:53.000Z\",\n         \"updated_at\": \"2018-02-22T11:57:53.000Z\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/inactive/vitabox",
    "title": "22) Get inactive",
    "group": "Vitabox",
    "name": "listInactive",
    "description": "<p>list all inactive vitaboxes</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "vitaboxes",
            "description": "<p>list of vitaboxes</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of each vitabox</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of each vitabox</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "created_at",
            "description": "<p>date of production</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"vitaboxes\": [\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"created_at\": \"2018-02-22T11:57:53.000Z\",\n         \"password\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id/board",
    "title": "21) Remove Board",
    "group": "Vitabox",
    "name": "removeBoard",
    "description": "<p>remove a board from a specific vitabox if the requester is sponsor of it, all the board records will became unavailable to the users of the vitabox.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"board_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id/patient",
    "title": "16) Remove Patient",
    "group": "Vitabox",
    "name": "removePatient",
    "description": "<p>remove a patient from a specific vitabox if the requester is sponsor of it, all the patient records will became unavailable to the users of the vitabox.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"patient_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id/user",
    "title": "11) Remove User",
    "group": "Vitabox",
    "name": "removeUser",
    "description": "<p>remove user from a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>user unique ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"user_id\": \"9f846ccb-e5a0-4bd4-94ac-621847dfa780\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/settings",
    "title": "06) Set Settings",
    "group": "Vitabox",
    "name": "setSettings",
    "description": "<p>update vitabox settings</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox, admin, sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "settings",
            "description": "<p>configuration's structure to be updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n     \"settings\":{\n         \"cnfg1\": \"true\",\n         \"cnfg2\": \"12345\",\n         \"cnfg3\": \"some other config\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/update",
    "title": "07) Update",
    "group": "Vitabox",
    "name": "update",
    "description": "<p>update a specific vitabox if the requester is sponsor of it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox sponsor"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>min: -90, max: 90 (based on google maps coordinates)</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>min: -180, max: 180 (based on google maps coordinates)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>full address with postal code</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "settings",
            "description": "<p>configuration's structure (only if admin)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example to common user:",
          "content": "{\n     \"latitude\": \"38.8976763\",\n     \"longitude\": \"-77.0387185\",\n     \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\"\n}",
          "type": "json"
        },
        {
          "title": "Request example to admin:",
          "content": "{\n     \"latitude\": \"38.8976763\",\n     \"longitude\": \"-77.0387185\",\n     \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n     \"settings\":{\n         \"cnfg1\": \"true\",\n         \"cnfg2\": \"12345\",\n         \"cnfg3\": \"some other config\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/connect",
    "title": "03) Request Token",
    "group": "Vitabox",
    "name": "vitaboxLogin",
    "description": "<p>request for a token to the vitabox</p>",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password generated on creation</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>jwt valid for 8 hours and must be placed at &quot;Authorization&quot; header</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude of each vitabox, min: -90, max: 90 (based on google maps coordinates)</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude of each vitabox, min: -180, max: 180 (based on google maps coordinates)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>full address of each vitabox</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "locality",
            "description": "<p>locality tag to get local pharmacies</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "district",
            "description": "<p>district tag to get local pharmacies</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\ntoken: \"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0YmIyNTFjLWYxY2EtNGVjZC04OTNlLTU2YWU0MDRlZjhlZiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNTI1MzQzNTg4LCJleHAiOjE1MjUzNzIzODgsInN1YiI6Ijo6ZmZmZjoxMC4wLjIuMiJ9.eZQ9dmDROpIh_6aEcoTTgH_DGauqNxqIsYSsW-tNoXQsLyBQb0VPLnFRzi7n_yKB_D43SGfj8PxBaDmt0WWgbjlKOJdP6WZYz5W_eVWDjpcNjzIq2nj8W1B3AstxZ5RmnP-NFd96Vot-O7mXXk96zGqTzIPYZcL3eX-MvgugCbGr2ikzyJ9y4oWxedzZTsY7u1C_Fy9ZuIG_LFUAZ7yBFXOWYSYdI8VEwxF3rgU1eagUZKO8ZMzVsRQPptSWA3i5-fJW3-k6tfstRcr-nUBOda7diBmuw6cT7zDgtuEyctouuH_RAP-lNuoIpn8pbiSunrNB2D8CGh7RP7CPvu3NSA\"\n vitabox:{\n     \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n     \"latitude\": \"38.8976763\",\n     \"longitude\": \"-77.0387185\",\n     \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n     \"sponsor\": true,\n     \"active\": false,\n     \"locality\": \"tomar\",\n     \"district\": \"santarem\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox"
  },
  {
    "type": "post",
    "url": "/vitabox/:id/register",
    "title": "02) Register",
    "group": "Vitabox",
    "name": "vitaboxRegister",
    "description": "<p>register vitabox, the user must be authenticated as &quot;admin&quot; and will define the &quot;sponsor&quot; account to the vitabox.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user, admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox id</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>min: -90, max: 90 (based on google maps coordinates)</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>min: -180, max: 180 (based on google maps coordinates)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>full address with postal code</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>sponsor's email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>(only to users) vitabox password to register</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example to admin:",
          "content": "{\n     \"latitude\": 38.8976763,\n     \"longitude\": -77.0387185,\n     \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n     \"email\": \"sponsor@example.com\",\n     \"password\": \"1DlA2.d$\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return &quot;true&quot; if was sucessfuly registered</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/reset",
    "title": "22) Reset",
    "group": "Vitabox",
    "name": "vitaboxReset",
    "description": "<p>reset vitabox to reuse it.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>vitabox id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return &quot;true&quot; if was sucessfuly reseted</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/vitabox.js",
    "groupTitle": "Vitabox",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/warning",
    "title": "05) Check warning",
    "group": "Warning",
    "name": "checkWarnings",
    "description": "<p>check all warnings, or a single warning by vitabox</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox, vitabox user, admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":warning_id",
            "description": "<p>(only to vitabox) warning unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly checked</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/warning.js",
    "groupTitle": "Warning",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/warning/:page/environment",
    "title": "04) Get warning from environment to User",
    "group": "Warning",
    "name": "getEnvironmentWarningsAsUser",
    "description": "<p>get warning from environment sensors to User by page</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"warnings\": [\n        {\n            \"datetime\": \"2018-07-16T13:36:23.149Z\",\n            \"message\": \"o valor de Temperature de Quarto está acima do recomendado\",\n            \"sensor_id\": \"0e35251f-dd9c-4928-9b8d-a94a44f22770\",\n            \"seen_vitabox\": \"2018-07-16T13:38:45.175Z\",\n            \"entity\": \"Av. Manuel Teixeira Nº48\",\n            \"tag\": \"humi\"\n        }\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/warning.js",
    "groupTitle": "Warning",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/warning/:page/patient",
    "title": "03) Get warning from patients to User",
    "group": "Warning",
    "name": "getPatientWarningsAsUser",
    "description": "<p>get warning from patients to User by page</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"warnings\": [\n        {\n            \"datetime\": \"2018-07-16T13:36:23.149Z\",\n            \"message\": \"o valor de Pressão Arterial do(a) António está acima do recomendado\",\n            \"sensor_id\": \"0e35251f-dd9c-4928-9b8d-a94a44f22770\",\n            \"patient_id\": \"dd9c4928-9b8d-0e35-251f-22770a94a44f\",\n            \"seen_vitabox\": \"2018-07-16T13:38:45.175Z\",\n            \"entity\": \"José Manuel\",\n            \"tag\": \"bodytemp\"\n        }\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/warning.js",
    "groupTitle": "Warning",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/warning/:page",
    "title": "01) Get warning to Doctor",
    "group": "Warning",
    "name": "getWarningsAsDoctor",
    "description": "<p>get warnings from page</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user (with doctor role)"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":page",
            "description": "<p>warnings page</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"warnings\": [\n        {\n            \"datetime\": \"2018-07-16T13:36:23.149Z\",\n            \"message\": \"o valor de humidade do(a) Quarto está acima do recomendado\",\n            \"sensor_id\": \"0e35251f-dd9c-4928-9b8d-a94a44f22770\",\n            \"patient_id\": \"dd9c4928-9b8d-0e35-251f-22770a94a44f\",\n            \"seen_vitabox\": \"2018-07-16T13:38:45.175Z\",\n            \"entity\": \"José Manuel\",\n            \"tag\": \"bodytemp\"\n        }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/warning.js",
    "groupTitle": "Warning",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/warning",
    "title": "02) Get warning to Vitabox",
    "group": "Warning",
    "name": "getWarningsAsVitabox",
    "description": "<p>get all unseen warnings from vitabox</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "vitabox"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"warnings\": [\n        {\n            \"datetime\": \"2018-07-16T13:36:23.149Z\",\n            \"message\": \"o valor de Pressão Arterial do(a) António está acima do recomendado\",\n            \"sensor_id\": \"0e35251f-dd9c-4928-9b8d-a94a44f22770\",\n            \"patient_id\": \"dd9c4928-9b8d-0e35-251f-22770a94a44f\",\n            \"seen_vitabox\": \"2018-07-16T13:38:45.175Z\",\n            \"entity\": \"José Manuel\",\n            \"tag\": \"bodytemp\"\n        }\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/warning.js",
    "groupTitle": "Warning",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Language",
            "defaultValue": "pt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "statusMessage",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  }
] });
