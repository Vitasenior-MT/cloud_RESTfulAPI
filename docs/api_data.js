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
            "field": "old_password",
            "description": "<p>old password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "new_password",
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
          "content": "{\n \"sensors\": [\n     {\n          \"transducer\": \"dht22\",\n          \"measure\":\"temperature\",\n          \"min_acceptable\": \"10\",\n          \"max_acceptable\": \"25\",\n          \"min_possible\": \"-20\",\n          \"max_possible\": \"50\"\n     }\n ]\n}",
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
    "url": "/boardmodel/:id/sensor",
    "title": "05) Add Sensors",
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
            "field": "sensors",
            "description": "<p>list of sensors IDs</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n \"sensors\": [\n     \"75a60f5f-ef3d-4556-9cdd-981894c8f1dc\",\n     \"c704c803-d1fc-4eed-831e-0aba3cd75a60\",\n     \"00397579-0a11-42ee-b522-b25e11630eda\"\n ]\n}",
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
          "content": "{\n \"sensors\": [\n     {\n         \"transducer\": \"dht22\",\n         \"measure\":\"temperature\",\n         \"min_acceptable\": \"10\",\n         \"max_acceptable\": \"25\",\n         \"min_possible\": \"-20\",\n         \"max_possible\": \"50\"\n     },\n     {\n         \"transducer\": \"mq-7\",\n         \"measure\":\"carbon_monoxide\",\n         \"min_acceptable\": \"2\",\n         \"max_acceptable\": \"10\",\n         \"min_possible\": \"10\",\n         \"max_possible\": \"500\"\n     },\n ]\n}",
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
    "title": "14) Add Board",
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
            "field": "model",
            "description": "<p>model id of the board</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n     \"location\": \"kitchen\",\n     \"model\":\"5d93585b-f511-4fa8-b69e-692c2474d5e8\"\n}",
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
    "title": "11) Add Patient",
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
    "title": "08) Add User",
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
            "field": "serial_key",
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
    "title": "07) Delete",
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
    "title": "15) Get Boards",
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
            "type": "json",
            "optional": false,
            "field": "BoardModel",
            "description": "<p>model of each board, contains an id, type and name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"boards\": [\n     {\n         \"id\": \"983227e9-e1dc-410e-829d-1636627397ba\",\n         \"location\": \"kitchen\",\n         \"created_at\": \"2018-02-22T15:25:50.000Z\",\n         \"BoardModel\": {\n             \"id\": \"1920ed05-0a24-4611-b822-5da7a58ba8bb\",\n             \"type\": \"environmental\",\n             \"name\": \"Zolertia RE-Mote\"\n         }\n     }\n ]\n}",
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
    "url": "/vitabox/:id/patients",
    "title": "12) Get Patients",
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
    "title": "09) Get Users",
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
    "title": "16) Remove Board",
    "group": "Vitabox",
    "name": "removeBoard",
    "description": "<p>remove board from a specific vitabox if the requester is sponsor of it.</p>",
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
    "title": "13) Remove Patient",
    "group": "Vitabox",
    "name": "removePatient",
    "description": "<p>remove patient from a specific vitabox if the requester is sponsor of it.</p>",
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
    "title": "10) Remove User",
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
    "title": "06) Update",
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
            "description": "<p>password defined by sponsor on registration</p>"
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
