export class ChunkedData<T> {
	private data: T[][] = [];

	//----- get all chunks of data
	get chunks(): T[][] {
			return this.data;
	}

	//----- calc amount of chunks
	get length(): number {
			return this.data.length;
	}

	//----- calc amount of all items in all chunks
	get totalLength(): number {
			return this.data.reduce((acc, curr) => acc + curr.length, 0);
	}

	//----- use to initialize set of data, or to reset state to new data
	set(chunk: T[]) {
			this.data = [chunk];
	}

	//----- use to add new chunks of data on load-more
	push(chunk: T[]) {
			this.data.push(chunk);
	}
}
