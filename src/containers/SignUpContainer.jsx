/* eslint-disable prettier/prettier */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { requiredOrOptionState } from '../state/atom';
import ChooseOption from '../components/ChooseOption';
import ChooseRequired from '../components/ChooseRequired';

const SignUpContainer = () => {
    const requiredOrOption = useRecoilValue(requiredOrOptionState);

    switch (requiredOrOption) {
        case 'required':
            return <ChooseRequired />;
        default:
            return <ChooseOption />;
    }
};

export default SignUpContainer;
