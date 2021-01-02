// 2021-01-02
// 1) https://airtable.com/developers/apps/guides/hello-world-tutorial
// 2) https://airtable.com/developers/apps/guides/to-do-list-tutorial
import {
	expandRecord // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#expanding-records
	,FieldPickerSynced // 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#tracking-completed-tasks
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
	/** @const {?Object} */ const table = base.getTableByIdIfExists(globalConfig.get('selectedTableId'));
	// 2021-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#tracking-completed-tasks
	/** @const {?String} */ const completedFieldId = globalConfig.get('completedFieldId');
	let completedField, records, tasks;
	if (!table) {
		[completedField, records, tasks] = [null, null, null];
	}
	else {
		completedField = !completedFieldId ? null : table.getFieldByIdIfExists(completedFieldId);
		records = useRecords(table);
		// 2021-01-03 https://airtable.com/developers/apps/guides/to-do-list-tutorial#making-it-interactive
		const toggle = (r) => {table.updateRecordAsync(r, {[completedFieldId]: !r.getCellValue(completedFieldId)});};
		tasks = records.map(r => <Task completedFieldId={completedFieldId} key={r.id} onToggle={toggle} r={r}/>);
	}
	return (
		<div>
			<div>{base.name} 2</div>
			<div>Number of tasks: {!records ? 0 : records.length}</div>
{/* 2020-01-02
«The TablePicker component has a sibling component called TablePickerSynced
which automatically reads and writes to globalConfig with the proper permission checks»:
https://airtable.com/developers/apps/guides/to-do-list-tutorial#permissions */}
			<TablePickerSynced globalConfigKey='selectedTableId' />
			<FieldPickerSynced table={table} globalConfigKey='completedFieldId' />
			<div>{tasks}</div>
		</div>
	);
}
// 2021-01-02
// 1) «Since we're rendering a list, we include a unique key for each element by using the record's ID»:
// https://airtable.com/developers/apps/guides/to-do-list-tutorial#showing-the-name-of-the-records
// 2) «Lists and Keys»: https://reactjs.org/docs/lists-and-keys.html
function Task({r, completedFieldId, onToggle}) {
	const label = r.name || 'Unnamed record';
	return (
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
			{/* 2020-01-03 https://airtable.com/developers/apps/guides/to-do-list-tutorial#making-it-interactive */}
			<TextButton onClick={() => {onToggle(r);}} size='xlarge' variant='dark'>
				{/* 2020-01-03 https://airtable.com/developers/apps/guides/to-do-list-tutorial#tracking-completed-tasks */}
				{!completedFieldId ? null : (r.getCellValue(completedFieldId) ? <s>{label}</s> : label)}
			</TextButton>
			{/* 2020-01-02 https://airtable.com/developers/apps/guides/to-do-list-tutorial#expanding-records */}
			<TextButton aria-label='Expand record' icon='expand' onClick={() => {expandRecord(r);}} variant='dark'/>
		</div>
	);
}
initializeBlock(() => <Main />);