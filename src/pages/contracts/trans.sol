[
	{
		"inputs": [],
		"name": "driver_get",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "home_addr",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mobile",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "car_model",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "exp_years",
						"type": "uint256"
					}
				],
				"internalType": "struct public_transport.driver_details[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_home_addr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_mobile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_car_model",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_exp_years",
				"type": "uint256"
			}
		],
		"name": "driver_Register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fare",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rider_get",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "home_addr",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mobile",
						"type": "uint256"
					}
				],
				"internalType": "struct public_transport.rider_details[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_home_addr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_mobile",
				"type": "uint256"
			}
		],
		"name": "rider_Register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "d_details",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "home_addr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "mobile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "car_model",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "exp_years",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "r_details",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "home_addr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "mobile",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]