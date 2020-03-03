/*
 * Returns a random integer between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
	let r = Math.random();
	return Math.floor(Math.random() * (max - min) + min);
}

/*
 * This function shuffles an array into a random order.
 */
function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

/*
 * This function generates an array of increasing integers of length n,
 * with values from 1 to n.
 */
function generateIncreasingArray(n) {
	a = [...Array(n + 1).keys()].slice(1, n + 1);
	return a;
}

/*
 * This function generates an array of increasing integers of length n.
 */
function generateDecreasingArray(n) {
	a = generateIncreasingArray(n);
	a.reverse();
	return a;
}


/*
 * This function generates an array of random integers of length n.
 */
function generateRandomArray(n) {
	a = generateIncreasingArray(n);
	shuffle(a);
	return a;
}

/*
 * This function generates an array of *almost* sorted integers of length n.
 * There are about log(n) pairs that are swapped out of order.
 */
function generateAlmostSortedArray(n) {
	a = generateIncreasingArray(n);

	for (let i = 0; i < Math.log(a.length); i++) {
		index = getRandomInt(0, n - 1);
		swap(a, index, index + 1);
	}
	return a;
}

/*
 * This function returns the left-most index between left and
 * right.
 */
function getLeftPivot(array, left, right) {
	return left;
}

/*
 * This function returns the right-most index between left and
 * right.
 */
function getRightPivot(array, left, right) {
	return right;
}

/*
 * This function returns a random index between left and right.
 */
function getRandomPivot(array, left, right) {
	return getRandomInt(left, right);
}

/*
 * This function returns the integer midpoint between left and 
 * right.
 */
function getMidpointPivot(array, left, right) {
	return Math.floor((left +  right)/2); 
}

/* 
 * This function finds three values: the left-most element, the
 * right-most element, and the center element, and finds the median 
 * of them, and then returns the index of that median. 
 */
function getMedianOfThreePivot(array, left, right) {
	let leftPiv = getLeftPivot(array, left, right);
	let rightPiv = getRightPivot(array, left, right);
	let midPiv = getMidpointPivot(array, left, right);
  
	return Math.floor((leftPiv + rightPiv + midPiv)/3); 
}

/*
 * This function swaps elements at indices i and j in the provided array.
 */
function swap(array, i, j) {
	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

/*
 * This function will sort the given array within the left and right
 * indices provided using the quick sort method
 */
function quicksort(pivotFunction, array, left, right) {
	// Defines left and right as the passed in variables or an arbitrary
	// value if the parameters were undefined
	left = left || 0;
	right = right || array.length - 1;

	// Define pivot and partition the given array
	var pivot = partition(pivotFunction, array, left, right);

	// Display the step to the screen 
	displayProgress(array, left, right, pivot)

	// If the left partition has not crossed the pivot, recurse
	if (left < pivot - 2) {
		quicksort(pivotFunction, array, left, pivot - 2);
	}

	// If the right partition has not crossed the pivot, recurse
	if (right > pivot) {
		quicksort(pivotFunction, array, pivot, right);
	}

	// Return the sorted array 
	return array;
}

/*
 * Partition the given array within the given indicies
 */
function partition(pivotFunction, array, left, right) {
	// Define values
	let originalLeft = left;
	let pivot = pivotFunction(array, originalLeft, right);
	let pivotValue = array[pivot];

	// Move the location of the pivot
	swap(array, pivot, originalLeft);
	left++;

	// While the left and right indices have not crossed the pivot
	while (left <= right) {
		// Iterate throught the array as long as the element is less than the pivot value
		while (array[left] < pivotValue) {
			left++;
		}

		// Iterate throught the array from the back as long as the element is greater than the pivot value
		while (array[right] > pivotValue) {
			right--;
		}

		// If the left index has not crossed the pivot, swap the elements
		if (left <= right) {
			swap(array, left, right);
			left++;
			right--;
		}
	}

	// Swap the pivot to its final position
	swap(array, originalLeft, left - 1);

	// Return the left index, which is the left bound of the next partition
	return left;
}
