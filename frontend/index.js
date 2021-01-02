// 2021-01-02
// 1) https://airtable.com/developers/apps/guides/hello-world-tutorial
// 2) https://airtable.com/developers/apps/guides/to-do-list-tutorial
import {
	expandRecord // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#expanding-records
	,initializeBlock
	// 2021-01-02
	// 1) https://airtable.com/developers/apps/guides/to-do-list-tutorial#storing-the-selected-table-in-state
	// 2) «The TablePicker component has a sibling component called TablePickerSynced
	// which automatically reads and writes to globalConfig with the proper permission checks»:
	// https://airtable.com/developers/apps/guides/to-do-list-tutorial#permissions
	,TablePickerSynced
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
	// 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#storing-configuration
	const globalConfig = useGlobalConfig();
	// 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#using-table-id-instead-of-table-name
	const tableId = globalConfig.get('selectedTableId');
	const table = base.getTableByIdIfExists(tableId);
	const records = useRecords(table);
	const tasks = !records ? null : records.map(r => {return <Task key={r.id} r={r} />});
	return (
		<div>
			<div>{base.name} 2</div>
			<div>Number of tasks: {!records ? 0 : records.length}</div>
{/* 2020-01-02
«The TablePicker component has a sibling component called TablePickerSynced
which automatically reads and writes to globalConfig with the proper permission checks»:
https://airtable.com/developers/apps/guides/to-do-list-tutorial#permissions */}
			<TablePickerSynced globalConfigKey='selectedTableId' />
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
{/* 2020-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#expanding-records */}
		<TextButton aria-label='Expand record' icon='expand' onClick={() => {expandRecord(r);}} variant='dark'/>
	</div>
);}
initializeBlock(() => <Main />);