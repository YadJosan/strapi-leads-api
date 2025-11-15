# Strapi Leads API

A REST API built with Strapi for managing leads with SQLite database.

## Features

- **GET /api/leads** - Retrieve all leads
- **GET /api/leads/:id** - Retrieve a single lead
- **POST /api/leads** - Create a new lead
- **PUT /api/leads/:id** - Update an existing lead
- **DELETE /api/leads/:id** - Delete a lead

## Lead Model

Each lead contains:
- `name` (string, required)
- `email` (email, required, unique)
- `phone` (string, optional)
- `company` (string, optional)
- `status` (enum: new, contacted, qualified, converted, lost - default: new)
- `notes` (text, optional)

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run develop
```

The server will start at http://localhost:1337

## First Time Setup

1. On first run, create an admin account at http://localhost:1337/admin
2. The API permissions are automatically configured for public access

## Database

Data is stored in SQLite at `.tmp/data.db`

## API Examples

### Get all leads
```bash
curl http://localhost:1337/api/leads
```

### Create a lead
```bash
curl -X POST http://localhost:1337/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "company": "Acme Corp",
      "status": "new",
      "notes": "Interested in product demo"
    }
  }'
```

### Update a lead
```bash
curl -X PUT http://localhost:1337/api/leads/1 \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "status": "contacted"
    }
  }'
```

### Get a single lead
```bash
curl http://localhost:1337/api/leads/1
```

### Delete a lead
```bash
curl -X DELETE http://localhost:1337/api/leads/1
```

## Project Structure

```
strapi-leads-api/
├── src/
│   ├── api/
│   │   └── lead/
│   │       ├── content-types/
│   │       │   └── lead/
│   │       │       ├── schema.json
│   │       │       └── index.js
│   │       ├── controllers/
│   │       │   └── lead.js
│   │       ├── routes/
│   │       │   └── lead.js
│   │       └── services/
│   │           └── lead.js
│   └── index.js
└── .tmp/
    └── data.db (SQLite database)
```

## Built With

- [Strapi](https://strapi.io/) - Headless CMS
- SQLite - Database
