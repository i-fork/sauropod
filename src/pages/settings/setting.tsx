import React from 'react';
import settingsStore from '../../storage/settingsStore';
import { view } from '@risingstack/react-easy-state';

import './setting.css';

interface SettingProps {
  text: string,
  name: string,
}

const Setting = ({ text, name } : SettingProps) => {
  return (
    <div className="mb-6">
      <label className="flex items-center">
        <div className="switch">
          <input type="checkbox" onChange={(e) => {
          const value : boolean = e.target.checked;
          settingsStore[name] = value;
        }} checked={settingsStore[name]} />
          <span className="slider round"></span>
        </div>
        <span className="block text-gray-800 font-bold ml-4">
          { text }
        </span>
      </label>

    </div>
  );
}

export default view(Setting);