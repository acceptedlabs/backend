const aggregations = {}

const hotness = [
	// Aggregation step 1
	// Add a field called "score" that is the net sum of upvotes and downvotes.
	{
		'$addFields': {
			'score': {
				'$add': [{ '$size': '$upvotes' }, { '$size': '$downvotes' }],
			},
		},
	},
	// Aggregation step 2
	{
		'$addFields': {
			// Add a field called "order" which is the maximum of abs(score) or 1.
			'order': {
				// log10(max(abs(score), 1))
				'$log10': { '$max': [{ '$abs': '$score' }, { '$literal': 1 }] },
			},
			// Add a field called "sign" that is 1 if the score is positive or -1 if negative.
			'sign': {
				'$cond': {
					'if': { '$gt': ['$score', { '$literal': 0 }] },
					'then': { '$literal': 1 },
					'else': { '$literal': -1 },
				},
			},
			'secondsDiv45000': {
				'$divide': [
					{
						'$subtract': [
							{ '$floor': { '$divide': [{ '$toLong': '$datetime' }, { '$literal': 1000 }] } },
							{ '$literal': 1577836800 },
						],
					},
					{ '$literal': 45000 },
				],
			},
		},
	},
	// Aggregation step 3
	// Add a field called "hotness" which is the sum of secondsDiv45000 and sign * order.
	{
		'$addFields': {
			'hotness': {
				'$add': [{ '$multiply': ['$sign', '$order'] }, '$secondsDiv45000'],
			},
		},
	},
	// Aggregation step 4
	// Sort descending by hotness.
	{
		'$sort': {
			'hotness': -1,
		},
	},
]


aggregations.hotness = (limit, skip) => ([
	...hotness,
	{ '$skip': skip },
	{ '$limit': limit },
])

module.exports = aggregations