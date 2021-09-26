/* eslint-disable prettier/prettier */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { genderOrInterestState } from '../../state/atom';
import ChooseGender from './ChooseGender';
import ChooseInterest from './ChooseInterest';

const ChooseOption = () => {
    const genderOrInterest = useRecoilValue(genderOrInterestState);

    switch (genderOrInterest) {
        case 'gender':
            return <ChooseGender />;
        default:
            return <ChooseInterest />;
    }
};

export default ChooseOption;
