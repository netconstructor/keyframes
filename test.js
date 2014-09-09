var test = require('tape').test

var Keyframes = require('./')

test('timeline controls', function(t) {
	var keys = [
		{ time: 2, value: 1 },
		{ time: 4, value: 2 },
		{ time: 0, value: 3 },
	]
	var sorted = [
		{ time: 0, value: 3 },
		{ time: 2, value: 1 },
		{ time: 4, value: 2 },
	]

	var c1 = Keyframes(keys)

	t.equal(c1.count, 3, 'count is correct')
	t.deepEqual(c1.frames, sorted, 'the keys are sorted')

	t.equal(c1.get(3.5, 0.4), null, 'keyframeAt with small radius returns null' )
	t.deepEqual(c1.get(3.5), sorted[2], 'keyframeAt finds nearest keyframe' )

	t.deepEqual(c1.next(-1), sorted[0], 'jumps to next keyframe')
	t.deepEqual(c1.next(0.5), sorted[1], 'jumps to next keyframe')
	t.deepEqual(c1.next(2), sorted[2], 'jumps to next keyframe')
	t.deepEqual(c1.next(4), null, 'jumps to next keyframe')
	t.deepEqual(c1.next(4.5), null, 'jumps to next keyframe')

	t.deepEqual(c1.previous(-1), null, 'jumps to previous keyframe')
	t.deepEqual(c1.previous(0.5), sorted[0], 'jumps to previous keyframe')
	t.deepEqual(c1.previous(2), sorted[0], 'jumps to previous keyframe')
	t.deepEqual(c1.previous(4), sorted[1], 'jumps to previous keyframe')
	t.deepEqual(c1.previous(4.5), sorted[2], 'jumps to previous keyframe')

	var idx = c1.getIndex(4)
	c1.splice(idx, 1)
	sorted.splice(idx, 1)
	t.deepEqual(c1.frames, sorted, 'splice works')

	var newItem = { time: 10, value: 1 }
	c1.splice(0, 0, newItem)
	sorted.splice(0, 0, newItem)
	t.notDeepEqual(c1.frames, sorted, 'splice insert re-sorts array')

	t.end()
})