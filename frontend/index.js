// 2021-01-02
// 1) https://airtable.com/developers/apps/guides/hello-world-tutorial
// 2) https://airtable.com/developers/apps/guides/to-do-list-tutorial
import {expandRecord, initializeBlock, TextButton, useBase, useRecords} from '@airtable/blocks/ui';
import React from 'react';
function Main() {
	// 2021-01-02 https://reactjs.org/docs/hooks-intro.html
	const base = useBase();
	const table = base.getTableByName('Tasks');
	const records = useRecords(table);
	const tasks = records.map(r => {return <Task key={r.id} r={r} />});
	return (
		<div>
			<div>{base.name} 2</div>
			<div>Number of tasks: {records.length}</div>
			<div>{tasks}</div>
		</div>
	);
}
// 2021-01-02
// 1) «Since we're rendering a list, we include a unique key for each element by using the record's ID»:
// https://airtable.com/developers/apps/guides/to-do-list-tutorial#showing-the-name-of-the-records
// 2) «Lists and Keys»: https://reactjs.org/docs/lists-and-keys.html
function Task({r}) {return (<div>
	{r.name || 'Unnamed record'}
	<TextButton aria-label='Expand record' icon='expand' onClick={() => {expandRecord(r);}}/>
</div>);}
initializeBlock(() => <Main />);