// 2021-01-02 https://airtable.com/developers/apps/guides/hello-world-tutorial
import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
function HelloWorldApp() {return <div>A test Airtable app</div>;}
initializeBlock(() => <HelloWorldApp />);