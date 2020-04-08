define({ "api": [  {    "type": "post",    "url": "/api/auth/login",    "title": "Login endpoint.",    "name": "Login",    "group": "Auth",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "content-type",            "description": "<p>Payload content type.</p>"          }        ]      },      "examples": [        {          "title": "Content-type header example",          "content": "{ \"Content-type\": \"application/json\" }",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password.</p>"          }        ]      },      "examples": [        {          "title": "Payload example",          "content": "{ \"username\": \"Kyrylo\", \"password\": \"test1234\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>JWT token.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"User authenticated successfully\"\n  \"token\": \"fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Auth"  },  {    "type": "post",    "url": "/api/auth/register",    "title": "Register new user.",    "name": "Registration",    "group": "Auth",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "content-type",            "description": "<p>Payload content type.</p>"          }        ]      },      "examples": [        {          "title": "Content-type header example",          "content": "{ \"Content-type\": \"application/json\" }",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>User type(driver or shipper), shoudnt be case sensitive.</p>"          }        ]      },      "examples": [        {          "title": "Payload example",          "content": "{ \"username\": \"Kyrylo\", \"password\": \"test1234\", \"role\": \"shipper\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"User registered successfully\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Auth"  },  {    "type": "patch",    "url": "/api/loads/:id/state",    "title": "Change load state(only driver has access, for only active load).",    "name": "changeLoadState",    "group": "Load",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Load status changed successfully\",\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Load"  },  {    "type": "post",    "url": "/api/loads",    "title": "Create load(only shipper has access).",    "name": "createLoad",    "group": "Load",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "content-type",            "description": "<p>Payload content type.</p>"          },          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "Content-type header example",          "content": "{ \"Content-type\": \"application/json\" }",          "type": "json"        },        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "dimensions",            "description": "<p>Load dimensions.</p>"          },          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "payload",            "description": "<p>Load weight.</p>"          }        ]      },      "examples": [        {          "title": "Payload example",          "content": "{ \"payload\": 100, \"dimensions\": {length: 100, width: 100, height: 100} }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Load created successfully\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Load"  },  {    "type": "get",    "url": "/api/loads",    "title": "Retreive active for this driver loads.",    "name": "getLoadsDriver",    "group": "Load",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          },          {            "group": "Success 200",            "type": "[Object]",            "optional": false,            "field": "loads",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Success\"\n  \"loads\": [\n     {\n         \"_id\": \"fbawfibaw\",\n         \"assigned_to\": \"noifawnfoian\",\n         \"created_by\": \"jfnaikfna\",\n         \"status\": \"ASSIGNED\",\n         \"state\": \"En route to Pick Up\",\n         \"logs\": [{\"message\": \"Load created\", time: 12312}],\n         \"payload\": 100,\n         \"dimensions\": {length: 100, width: 100, height: 100}\n         \"...\": \"...\"\n     }\n  ]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Load"  },  {    "type": "get",    "url": "/api/loads",    "title": "Retreive list of loads(for this shipper).",    "name": "getLoadsShipper",    "group": "Load",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          },          {            "group": "Success 200",            "type": "[Object]",            "optional": false,            "field": "loads",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Success\"\n  \"loads\": [\n     {\n         \"_id\": \"fbawfibaw\",\n         \"assigned_to\": \"\",\n         \"created_by\": \"jfnaikfna\",\n         \"status\": \"NEW\",\n         \"state\": \"\",\n         \"logs\": [{\"message\": \"Load created\", time: 12312}],\n         \"payload\": 100,\n         \"dimensions\": {length: 100, width: 100, height: 100}\n         \"...\": \"...\"\n     }\n  ]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Load"  },  {    "type": "patch",    "url": "/api/loads/:id/post",    "title": "Post load(only shipped has access).",    "name": "postLoad",    "group": "Load",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Load posted successfully\",\n  \"assigned_to\": \"fiwanfoianw\"\n}",          "type": "json"        },        {          "title": "No Drivers found response",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"No drivers found\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Load"  },  {    "type": "post",    "url": "/api/trucks",    "title": "Create truck(only driver has access).",    "name": "CreateTruck",    "group": "Truck",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "content-type",            "description": "<p>Payload content type.</p>"          },          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "Content-type header example",          "content": "{ \"Content-type\": \"application/json\" }",          "type": "json"        },        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Truck type(SPRINTER, SMALL STRAIGHT, LARGE STRAIGHT).</p>"          }        ]      },      "examples": [        {          "title": "Payload example",          "content": "{ \"type\": \"SPRINTER\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Truck created successfully\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Truck"  },  {    "type": "patch",    "url": "/api/trucks/:id/assign",    "title": "Assign driver to truck with specified id.",    "name": "assignTruck",    "group": "Truck",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Truck assigned successfully\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Truck"  },  {    "type": "get",    "url": "/api/trucks",    "title": "Retreive list of trucks(for this driver)",    "name": "getTrucks",    "group": "Truck",    "header": {      "fields": {        "headers": [          {            "group": "headers",            "type": "String",            "optional": false,            "field": "authorization",            "description": "<p>Authorization value.</p>"          }        ]      },      "examples": [        {          "title": "authorization header example",          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Operation status.</p>"          },          {            "group": "Success 200",            "type": "[Object]",            "optional": false,            "field": "trucks",            "description": "<p>Operation status.</p>"          }        ]      },      "examples": [        {          "title": "Success response example",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Truck created successfully\"\n  \"trucks\": [\n     {\n         \"_id\": \"fbawfibaw\",\n         \"assigned_to\": \"\",\n         \"status\": \"OS\",\n         \"created_by\": \"fbawfibaw\",\n         \"type\": \"SPRINTER\",\n         \"...\": \"...\"\n     }\n  ]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "docdir/lab_doc.js",    "groupTitle": "Truck"  }] });
