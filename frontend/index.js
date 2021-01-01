// 2021-01-02
// 1) https://airtable.com/developers/apps/guides/hello-world-tutorial
// 2) https://airtable.com/developers/apps/guides/to-do-list-tutorial
import {initializeBlock, useBase, useRecords} from '@airtable/blocks/ui';
import React from 'react';
function Main() {
	// 2021-01-02 https://reactjs.org/docs/hooks-intro.html
	const base = useBase();
	const table = base.getTableByName('Tasks');
	const records = useRecords(table);
	// 2021-01-02
	// 1) «Since we're rendering a list, we include a unique key for each element by using the record's ID»:
	// https://airtable.com/developers/apps/guides/to-do-list-tutorial#showing-the-name-of-the-records
	// 2) «Lists and Keys»: https://reactjs.org/docs/lists-and-keys.html
	const tasks = records.map(r => {return (<div key={r.id}>{r.name || 'Unnamed record'}</div>);});
	return (
		<div>
			<div>{base.name} 2</div>
			<div>Number of tasks: {records.length}</div>
			<div>{tasks}</div>
		</div>
	);
}
initializeBlock(() => <Main />);