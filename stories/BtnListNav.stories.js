import React from 'react';
import { action } from '@storybook/addon-actions';

import BtnList from '../components/BtnList';


export default {
    title: 'Collapsible menu',
    component: BtnList,
  };
  

export const Default = () => <BtnList numbers={[1,2,3,4,5]}/>;

