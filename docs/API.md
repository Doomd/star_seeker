# HSTC API Documentation (v0.0.17)

**Base URL**: `https://hstc-api.testing.keyholding.com`

## Authentication

All API requests require an API Key to be sent in the header.

| Header      | Value          | Description                                       |
| :---------- | :------------- | :------------------------------------------------ |
| `x-api-key` | `YOUR_API_KEY` | The API key provided for the technical challenge. |

---

## Endpoints

### 1. Status

Check the API and database status.

- **URL**: `/status`
- **Method**: `GET`
- **Description**: Returns the current version of the API and the status of the database connection.

**Response** (`200 OK`):

```json
{
	"version": "0.0.17",
	"db": {
		"status": "connected"
	}
}
```

### 2. List Gates

Retrieve a list of all available star gates.

- **URL**: `/gates`
- **Method**: `GET`
- **Description**: Returns an array of available gates with their basic information and connections.

**Response** (`200 OK`):

```json
[
	{
		"uuid": "9078a706-1584-45a3-a8f3-93e65a0bd5c9",
		"code": "SOL",
		"name": "Sol",
		"createdAt": 1698836493508,
		"updatedAt": null,
		"links": [
			{
				"code": "RAN",
				"hu": "100"
			},
			{
				"code": "PRX",
				"hu": "90"
			}
		]
	}
]
```

### 3. Gate Details

Retrieve detailed information for a specific gate.

- **URL**: `/gates/{gateCode}`
- **Method**: `GET`
- **Parameters**:
  - `gateCode` (path, string, required): The 3-letter code of the gate (e.g., `SOL`).

**Response** (`200 OK`):

```json
{
	"uuid": "9078a706-1584-45a3-a8f3-93e65a0bd5c9",
	"code": "SOL",
	"name": "Sol",
	"createdAt": 1698836493508,
	"updatedAt": null,
	"links": [
		{
			"code": "RAN",
			"hu": "100"
		},
		{
			"code": "PRX",
			"hu": "90"
		}
	]
}
```

**Response** (`404 Not Found`):

```json
{
	"error": "Gate not found"
}
```

### 4. Calculate Journey

Calculate the cheapest route between two gates.

- **URL**: `/gates/{gateCode}/to/{targetGateCode}`
- **Method**: `GET`
- **Parameters**:
  - `gateCode` (path, string, required): Origin gate code.
  - `targetGateCode` (path, string, required): Destination gate code.

**Response** (`200 OK`):

```json
{
  "from": {
      "uuid": "...",
      "code": "SOL",
      "name": "Sol",
      "links": [...]
  },
  "to": {
      "uuid": "...",
      "code": "PRX",
      "name": "Proxima",
      "links": [...]
  },
  "route": ["SOL", "PRX"],
  "totalCost": 90
}
```

### 5. Transport Cost

Get transport cost information for a specific distance.

- **URL**: `/transport/{distance}`
- **Method**: `GET`
- **Parameters**:
  - `distance` (path, number, required): The distance to travel (in AU).
- **Query Parameters**:
  - `passengers` (number, optional): Number of passengers (defaults to 1).
  - `parking` (number, optional): Number of parking days (defaults to 0).

**Response** (`200 OK`):

```json
{
	"currency": "GBP",
	"journeyCost": 30.0,
	"parkingFee": 0.0,
	"recommendedTransport": {
		"name": "Personal Vehicle",
		"ratePerAu": 0.3,
		"capacity": 4
	}
}
```

---

## Schemas

### Gate

| Field       | Type            | Description                     |
| :---------- | :-------------- | :------------------------------ |
| `uuid`      | string          | Unique identifier for the gate. |
| `code`      | string          | 3-letter identifier code.       |
| `name`      | string          | Display name of the gate.       |
| `createdAt` | number          | Timestamp of creation.          |
| `updatedAt` | number/null     | Timestamp of last update.       |
| `links`     | array[GateLink] | List of connected gates.        |

### GateLink

| Field  | Type   | Description                                      |
| :----- | :----- | :----------------------------------------------- |
| `code` | string | Code of the connected gate.                      |
| `hu`   | string | Distance in Hyper Units (displayed as AU in UI). |

### Journey

| Field       | Type          | Description                         |
| :---------- | :------------ | :---------------------------------- |
| `from`      | Gate          | Full origin gate object.            |
| `to`        | Gate          | Full destination gate object.       |
| `route`     | array[string] | Sequence of gate codes in the path. |
| `totalCost` | number        | Total cost of the journey.          |

### TransportCost

| Field                  | Type   | Description                                  |
| :--------------------- | :----- | :------------------------------------------- |
| `currency`             | string | Currency code (e.g., GBP).                   |
| `journeyCost`          | number | Cost of travel based on distance/passengers. |
| `parkingFee`           | number | Cost of parking for specified days.          |
| `recommendedTransport` | object | The transport method used for calculation.   |

### TransportOption

| Field       | Type   | Description                 |
| :---------- | :----- | :-------------------------- |
| `name`      | string | Name of transport.          |
| `ratePerAu` | number | Cost per Astronomical Unit. |
| `capacity`  | number | Passenger capacity.         |

### Links

- [README.md](README.md)
