const aggregations = {}

aggregations.hotness = [
	{
		'$addFields': {
			'score': {
				'$add': [
					{
						'$size': '$upvotes',
					}, {
						'$size': '$downvotes',
					},
				],
			},
		},
	}, {
		'$addFields': {
			'order': {
				'$log10': {
					'$max': [
						{
							'$abs': '$score',
						}, {
							'$literal': 1,
						},
					],
				},
			},
			'sign': {
				'$cond': {
					'if': {
						'$gt': [
							'$score', {
								'$literal': 0,
							},
						],
					},
					'then': {
						'$literal': 1,
					},
					'else': {
						'$literal': -1,
					},
				},
			},
			'secondsDiv45000': {
				'$divide': [
					{
						'$subtract': [
							{
								'$floor': {
									'$divide': [
										{
											'$toLong': '$datetime',
										}, {
											'$literal': 1000,
										},
									],
								},
							}, {
								'$literal': 1577836800,
							},
						],
					}, {
						'$literal': 45000,
					},
				],
			},
		},
	}, {
		'$addFields': {
			'hotness': {
				'$add': [
					{
						'$multiply': [
							'$sign', '$order',
						],
					}, '$secondsDiv45000',
				],
			},
		},
	}, {
		'$sort': {
			'hotness': -1,
		},
	},
]

aggregations.hotnessPaginated = (limit, skip) => ([
	{
		'$addFields': {
			'score': {
				'$add': [
					{
						'$size': '$upvotes',
					}, {
						'$size': '$downvotes',
					},
				],
			},
		},
	}, {
		'$addFields': {
			'order': {
				'$log10': {
					'$max': [
						{
							'$abs': '$score',
						}, {
							'$literal': 1,
						},
					],
				},
			},
			'sign': {
				'$cond': {
					'if': {
						'$gt': [
							'$score', {
								'$literal': 0,
							},
						],
					},
					'then': {
						'$literal': 1,
					},
					'else': {
						'$literal': -1,
					},
				},
			},
			'secondsDiv45000': {
				'$divide': [
					{
						'$subtract': [
							{
								'$floor': {
									'$divide': [
										{
											'$toLong': '$datetime',
										}, {
											'$literal': 1000,
										},
									],
								},
							}, {
								'$literal': 1577836800,
							},
						],
					}, {
						'$literal': 45000,
					},
				],
			},
		},
	}, {
		'$addFields': {
			'hotness': {
				'$add': [
					{
						'$multiply': [
							'$sign', '$order',
						],
					}, '$secondsDiv45000',
				],
			},
		},
	}, {
		'$sort': {
			'hotness': -1,
		},
	},
	{
		'$skip': skip,
	},
	{
		'$limit': limit,
	},
])

module.exports = aggregations