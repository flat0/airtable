// 2021-01-02
// 1) https://airtable.com/developers/apps/guides/hello-world-tutorial
// 2) https://airtable.com/developers/apps/guides/to-do-list-tutorial
import {
	expandRecord // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#expanding-records
	,initializeBlock
	,TablePicker // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#storing-the-selected-table-in-state
	,TextButton // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#expanding-records
	,useBase // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#part-1
	,useGlobalConfig // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#storing-configuration
	,useRecords // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#showing-the-number-of-records
} from '@airtable/blocks/ui';
// 2021-01-02 https://reactjs.org/docs/hooks-state.html
import React, {useState} from 'react';
function Main() {
	// 2021-01-02 https://reactjs.org/docs/hooks-intro.html
	const base = useBase();
	// 2021-01-02
	// 1) https://airtable.com/developers/apps/guides/to-do-list-tutorial#storing-the-selected-table-in-state
	// 2) https://airtable.com/developers/apps/guides/to-do-list-tutorial#using-table-id-instead-of-table-name
	const [tableId, setTableId] = useState(null);
	const table = base.getTableByIdIfExists(tableId);
	const records = useRecords(table);
	const tasks = !records ? null : records.map(r => {return <Task key={r.id} r={r} />});
	return (
		<div>
			<div>{base.name} 2</div>
			<div>Number of tasks: {!records ? 0 : records.length}</div>
			<TablePicker onChange={t => {setTableId(t.id);}} table={table}/>
			<div>{tasks}</div>
		</div>
	);
}
// 2021-01-02
// 1) «Since we're rendering a list, we include a unique key for each element by using the record's ID»:
// https://airtable.com/developers/apps/guides/to-do-list-tutorial#showing-the-name-of-the-records
// 2) «Lists and Keys»: https://reactjs.org/docs/lists-and-keys.html
function Task({r}) {return (
	<div
		style={{
			alignItems: 'center'
			,borderBottom: '1px solid #ddd'
			,display: 'flex'
			,fontSize: 18
			,justifyContent: 'space-between'
			,padding: 12
		}}
	>
		{r.name || 'Unnamed record'}
		<TextButton aria-label='Expand record' icon='expand' onClick={() => {expandRecord(r);}} variant='dark'/>
	</div>
);}
initializeBlock(() => <Main />);