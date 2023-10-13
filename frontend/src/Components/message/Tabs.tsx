import React, { useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Avatar,
} from '@material-tailwind/react';

const TabList = () => {
  const [activeTab, setActiveTab] = useState<String>('primary');
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className='rounded-none border-b border-blue-gray-50 bg-transparent p-0'
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
        }}>
        <Tab
          key={'primary'}
          value={'primary'}
          onClick={() => setActiveTab('primary')}
          className={activeTab === 'primary' ? 'text-gray-900' : ''}>
          Primary
        </Tab>
        <Tab
          key={'general'}
          value={'general'}
          onClick={() => setActiveTab('general')}
          className={activeTab === 'general' ? 'text-gray-900' : ''}>
          General
        </Tab>
        <Tab
          key={'request'}
          value={'request'}
          onClick={() => setActiveTab('request')}
          className={activeTab === 'request' ? 'text-gray-900' : ''}>
          Request
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel key={'primary'} value={'primary'}>
          <div className='flex gap-3'>
            <div>
              <Avatar
                src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
                className='h-10 w-10'
              />
            </div>
            <div>
              <p>gopidsfiad</p>
              <p>gopaisdfasod 2h.</p>
            </div>
          </div>
        </TabPanel>
        <TabPanel key={'general'} value={'general'}>
          bye bye
        </TabPanel>
        <TabPanel key={'request'} value={'request'}>
          till now there is no request
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default TabList;
