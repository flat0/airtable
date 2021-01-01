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