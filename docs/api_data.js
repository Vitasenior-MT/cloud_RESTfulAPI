define({ "api": [
  {
    "type": "post",
    "url": "/chpass",
    "title": "03) Change password",
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
    "filename": "app/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/forgot",
    "title": "04) Forgot Password",
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
    "filename": "app/controllers/v1.0.0/user.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/reset",
    "title": "05) Reset password",
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
    "filename": "app/controllers/v1.0.0/user.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "02) Login user",
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
          }
        ]
      }
    },
    "filename": "app/controllers/v1.0.0/user.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
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
          }
        ]
      }
    },
    "filename": "app/controllers/v1.0.0/user.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/boardmodel",
    "title": "01) Create Model",
    "group": "Board",
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
    "filename": "app/controllers/v1.0.0/board_model.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/board",
    "title": "08) Create Board",
    "group": "Board",
    "name": "create_a_new_Board",
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
    "filename": "app/controllers/v1.0.0/board.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/boardmodel/:id",
    "title": "04) Delete Model",
    "group": "Board",
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
    "filename": "app/controllers/v1.0.0/board_model.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
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
    "group": "Board",
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
    "filename": "app/controllers/v1.0.0/board_model.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/boardmodel",
    "title": "02) List Models",
    "group": "Board",
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
    "filename": "app/controllers/v1.0.0/board_model.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
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
    "group": "Board",
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
    "filename": "app/controllers/v1.0.0/board_model.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
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
    "group": "Board",
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
    "filename": "app/controllers/v1.0.0/board_model.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/boardmodel/:id",
    "title": "03) Update Model",
    "group": "Board",
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
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return &quot;true&quot; if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "app/controllers/v1.0.0/board_model.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
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
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value, may be null or omitted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board unique ID related to the value</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n \"records\":[\n     {\n         \"value\": 10,\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     },\n     {\n         \"value\": 13,\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
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
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>return &quot;&quot; if all records were valid and a error message if some records has invalid parameters</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"result\":true,\n \"error\": \"some records were discarded by invalid parameters: value, datetime, sensor_id and board_id are required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/record.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/record/board/:id",
    "title": "3) List by Board",
    "group": "Record",
    "name": "listRecordsByBoard",
    "description": "<p>list all records by board</p>",
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
            "description": "<p>board unique ID</p>"
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
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"records\": [\n     {\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"value\": 10,\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     },\n     {\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"value\": 13,\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/record.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/record/patient/:id",
    "title": "2) List by Patient",
    "group": "Record",
    "name": "listRecordsByPatient",
    "description": "<p>list all records by patient</p>",
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
            "description": "<p>patient unique ID</p>"
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
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"records\": [\n     {\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"value\": 10,\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     },\n     {\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"value\": 13,\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/record.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/record/sensor/:id",
    "title": "4) List by Sensor",
    "group": "Record",
    "name": "listRecordsBySensor",
    "description": "<p>list all records by sensor</p>",
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
            "description": "<p>sensor unique ID</p>"
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
            "type": "string",
            "optional": false,
            "field": "patient_id",
            "description": "<p>patient unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "board_id",
            "description": "<p>board unique ID related to the value</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "sensor_id",
            "description": "<p>sensor unique ID related to the value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"records\": [\n     {\n         \"datetime\": \"2018-03-02T15:40:23.000Z\",\n         \"value\": 10,\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     },\n     {\n         \"datetime\": \"2018-03-02T15:36:26.000Z\",\n         \"value\": 13,\n         \"patient_id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n         \"board_id\": \"f2340471-23e2-4891-bb89-14888abcc29e\",\n         \"sensor_id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/record.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/sensor",
    "title": "01) Create",
    "group": "Sensor",
    "name": "createSensor",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"transducer\": \"dht22\",\n     \"measure\":\"temperature\",\n     \"min_acceptable\": \"10\",\n     \"max_acceptable\": \"25\",\n     \"min_possible\": \"-20\",\n     \"max_possible\": \"50\"\n}",
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
    "filename": "app/controllers/v1.0.0/sensor.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/sensor/:id",
    "title": "04) Delete",
    "group": "Sensor",
    "name": "deleteSensor",
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
    "filename": "app/controllers/v1.0.0/sensor.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/sensor",
    "title": "02) List",
    "group": "Sensor",
    "name": "listSensors",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"sensors\": [\n     {\n         \"transducer\": \"dht22\",\n         \"measure\":\"temperature\",\n         \"min_acceptable\": \"10\",\n         \"max_acceptable\": \"25\",\n         \"min_possible\": \"-20\",\n         \"max_possible\": \"50\"\n     },\n     {\n         \"transducer\": \"mq-7\",\n         \"measure\":\"carbon_monoxide\",\n         \"min_acceptable\": \"2\",\n         \"max_acceptable\": \"10\",\n         \"min_possible\": \"10\",\n         \"max_possible\": \"500\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/sensor.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/sensor/:id",
    "title": "03) Update",
    "group": "Sensor",
    "name": "updateSensor",
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
            "type": "string",
            "optional": false,
            "field": "measure",
            "description": "<p>transducer measure</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"transducer\": \"dht22\",\n     \"measure\":\"temperature\",\n     \"min_acceptable\": \"10\",\n     \"max_acceptable\": \"25\",\n     \"min_possible\": \"-20\",\n     \"max_possible\": \"50\"\n}",
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
    "filename": "app/controllers/v1.0.0/sensor.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/board",
    "title": "18) Add Board",
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
            "field": "location",
            "description": "<p>place where the board is located, if wearable is null</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"location\": \"kitchen\",\n     \"password\":\"WkN1NNQiRD\",\n     \"mac_addr\": \"00:12:4b:00:06:0d:60:fb\"\n}",
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
            "description": "<p>return board id</p>"
          }
        ]
      }
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/patient",
    "title": "13) Add Patient",
    "group": "Vitabox",
    "name": "addPatient",
    "description": "<p>add patient to a specific vitabox if the requester is sponsor of it.</p>",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"name\": \"José António\",\n     \"birthdate\": \"1987-02-28\",\n     \"gender\": \"male\"\n}",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/vitabox/:id/user",
    "title": "10) Add User",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id",
    "title": "09) Delete",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/board/disable",
    "title": "20) Disable Board",
    "group": "Vitabox",
    "name": "disableBoard",
    "description": "<p>disable board from a specific vitabox if the requester is sponsor of it.</p>",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/patient/disable",
    "title": "15) Disable Patient",
    "group": "Vitabox",
    "name": "disablePatient",
    "description": "<p>disable patient from a specific vitabox if the requester is sponsor of it.</p>",
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
            "description": "<p>return true if was sucessfuly disabled</p>"
          }
        ]
      }
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/board/enable",
    "title": "21) Disable Board",
    "group": "Vitabox",
    "name": "enableBoard",
    "description": "<p>disable board from a specific vitabox if the requester is sponsor of it.</p>",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id/patient/enable",
    "title": "16) Enable Patient",
    "group": "Vitabox",
    "name": "enablePatient",
    "description": "<p>enable patient from a specific vitabox if the requester is sponsor of it.</p>",
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
            "description": "<p>return true if was sucessfuly enabled</p>"
          }
        ]
      }
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id",
    "title": "05) Find",
    "group": "Vitabox",
    "name": "find",
    "description": "<p>find a specific vitabox if the requester is related to it.</p>",
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
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>vitabox unique ID</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>vitabox latitude, min: -90, max: 90 (based on google maps coordinates)</p>"
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>vitabox longitude, min: -180, max: 180 (based on google maps coordinates)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>vitabox full address</p>"
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
          "content": "{\n \"vitabox\": {\n     \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n     \"latitude\": \"38.8976763\",\n     \"longitude\": \"-77.0387185\",\n     \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n     \"sponsor\": false\n }\n}",
          "type": "json"
        },
        {
          "title": "Response example to admin:",
          "content": "{\n \"vitabox\": {\n     \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n     \"latitude\": \"38.8976763\",\n     \"longitude\": \"-77.0387185\",\n     \"settings\":{\n         \"cnfg1\": \"true\",\n         \"cnfg2\": \"12345\",\n         \"cnfg3\": \"some other config\"\n     },\n     \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n     \"created_at\": \"2018-02-19T11:38:32.000Z\",\n     \"updated_at\": \"2018-02-23T16:12:47.000Z\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id/board",
    "title": "19) Get Boards",
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
            "field": "location",
            "description": "<p>place where the board is located (house division)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "mac_addr",
            "description": "<p>board MAC address</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status of the board, only to admin, the other users will only receive boards with &quot;is_active=true&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "since",
            "description": "<p>register day to the vitabox</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "BoardModel",
            "description": "<p>model of each board, contains an id, type and name, the vitabox itself wiil receive the transdutors list of each model</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example to admin:",
          "content": "{\n \"boards\": [\n     {\n         \"id\": \"983227e9-e1dc-410e-829d-1636627397ba\",\n         \"location\": \"kitchen\",\n         \"mac_addr\": \"00:19:B9:FB:E2:58\",\n         \"active\": false,\n         \"since\": \"2018-02-22T15:25:50.000Z\",\n         \"BoardModel\": {\n             \"id\": \"1920ed05-0a24-4611-b822-5da7a58ba8bb\",\n             \"type\": \"environmental\",\n             \"name\": \"Zolertia RE-Mote\"\n         }\n     }\n ]\n}",
          "type": "json"
        },
        {
          "title": "Response example to vitabox:",
          "content": "{\n \"boards\": [\n     {\n         \"id\": \"983227e9-e1dc-410e-829d-1636627397ba\",\n         \"location\": \"kitchen\",\n         \"mac_addr\": \"00:19:B9:FB:E2:58\",\n         \"since\": \"2018-02-22T15:25:50.000Z\",\n         \"node_id\": \"E258\"\n         \"BoardModel\": {\n             \"id\": \"1920ed05-0a24-4611-b822-5da7a58ba8bb\",\n             \"type\": \"environmental\",\n             \"name\": \"Zolertia RE-Mote\",\n             \"Sensors\": [\n                 {\n                     \"id\": \"2a2f5839-6b68-41a6-ada7-f9cd4c66cf38\",\n                     \"transducer\": \"dht22\",\n                     \"measure\": \"temperature\",\n                     \"tag\": \"temp\",\n                     \"min_acceptable\": \"10.00000\",\n                     \"max_acceptable\": \"25.00000\",\n                     \"min_possible\": \"-20.00000\",\n                     \"max_possible\": \"50.00000\"\n                 }\n             ]\n         }\n     }\n ]\n}",
          "type": "json"
        },
        {
          "title": "Response example to user:",
          "content": "{\n \"boards\": [\n     {\n         \"id\": \"983227e9-e1dc-410e-829d-1636627397ba\",\n         \"location\": \"kitchen\",\n         \"mac_addr\": \"00:19:B9:FB:E2:58\",\n         \"since\": \"2018-02-22T15:25:50.000Z\",\n         \"BoardModel\": {\n             \"id\": \"1920ed05-0a24-4611-b822-5da7a58ba8bb\",\n             \"type\": \"environmental\",\n             \"name\": \"Zolertia RE-Mote\"\n         }\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id/patient",
    "title": "14) Get Patients",
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
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of each patient</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "birthdate",
            "description": "<p>patient birthdate (date only)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>name of each patient</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "gender",
            "description": "<p>patient gender (must be 'male', 'female' or 'undefined')</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "since",
            "description": "<p>relationship date with the vitabox</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"patients\": [\n     {\n         \"id\": \"a77ea0fe-5e34-4189-9702-95cb69b4cd1d\",\n         \"birthdate\": \"1987-02-28\",\n         \"name\": \"José António\",\n         \"gender\": \"male\",\n         \"since\": \"2018-02-19T14:55:59.000Z\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/settings/vitabox",
    "title": "06) Get Settings",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox/:id/user",
    "title": "11) Get Users",
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
          "content": "{\n \"users\": [\n     {\n         \"id\": \"585402ef-68dd-44a4-a44b-04152e659d11\",\n         \"email\": \"donaldtrump@usa.com\",\n         \"since\": \"2018-02-19T14:41:13.000Z\",\n         \"sponsor\": false\n     },\n     {\n         \"id\": \"78007a69-baa2-4b24-b936-234883811b6a\",\n         \"email\": \"queenelizabeth@majesty.uk\",\n         \"since\": \"2018-02-19T14:40:14.000Z\",\n         \"sponsor\": true\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/vitabox",
    "title": "04) List",
    "group": "Vitabox",
    "name": "list",
    "description": "<p>list all vitaboxes related to the user.</p>",
    "version": "1.0.0",
    "permission": [
      {
        "name": "any user"
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
          "content": "{\n \"vitaboxes\": [\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"latitude\": \"38.8976763\",\n         \"longitude\": \"-77.0387185\",\n         \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n         \"sponsor\": true\n     },\n     {\n         \"id\": \"a6abfa76-68f0-4325-b3ab-6c540a800284\",\n         \"latitude\": \"51.5058372\",\n         \"longitude\": \"-0.1899126\",\n         \"address\": \"Kensington Gardens, London W8 4PX, Reino Unido\",\n         \"sponsor\": false\n     }\n ]\n}",
          "type": "json"
        },
        {
          "title": "Response example to admin:",
          "content": "{\n \"vitaboxes\": [\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"latitude\": \"38.8976763\",\n         \"longitude\": \"-77.0387185\",\n         \"settings\":{\n             \"cnfg1\": \"true\",\n             \"cnfg2\": \"12345\",\n             \"cnfg3\": \"some other config\"\n         },\n         \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n         \"registered\": false,\n         \"active\": false,\n         \"created_at\": \"2018-02-22T11:57:53.000Z\",\n         \"updated_at\": \"2018-02-22T11:57:53.000Z\"\n     }\n     {\n         \"id\": \"d1d66ccb-e5a0-4bd4-8580-6218f452e580\",\n         \"latitude\": \"51.5058372\",\n         \"longitude\": \"-0.1899126\",\n         \"settings\":{\n             \"cnfg1\": \"true\",\n             \"cnfg2\": \"12345\",\n             \"cnfg3\": \"some other config\"\n         },\n         \"address\": \"Kensington Gardens, London W8 4PX, Reino Unido\",\n         \"registered\": false,\n         \"active\": false,\n         \"created_at\": \"2018-02-22T11:57:53.000Z\",\n         \"updated_at\": \"2018-02-22T11:57:53.000Z\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id/board",
    "title": "22) Remove Board",
    "group": "Vitabox",
    "name": "removeBoard",
    "description": "<p>remove a board from a specific vitabox if the requester is sponsor of it, all the board records will became unavailable to the users of the vitabox.</p>",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id/patient",
    "title": "17) Remove Patient",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/vitabox/:id/user",
    "title": "12) Remove User",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/settings/vitabox",
    "title": "07) Set Settings",
    "group": "Vitabox",
    "name": "setSettings",
    "description": "<p>update vitabox settings</p>",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/vitabox/:id",
    "title": "08) Update",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
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
          }
        ]
      }
    },
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Request example to admin:",
          "content": "{\n     \"latitude\": \"38.8976763\",\n     \"longitude\": \"-77.0387185\",\n     \"address\": \"1600 Pennsylvania Ave NW, Washington, DC 20500, EUA\",\n     \"email\": \"sponsor@example.com\"\n}",
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
    "filename": "app/controllers/v1.0.0/vitabox.js",
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
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  }
] });
