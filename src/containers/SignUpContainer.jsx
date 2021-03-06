/* eslint-disable prettier/prettier */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { signUpProcessState } from '../state/atom';
import ChooseOption from '../components/signup/ChooseOption';
import ChooseRequired from '../components/signup/ChooseRequired';
import FinishSignUp from '../components/signup/FinishSignUp';

const SignUpContainer = () => {
    const signUpProcess = useRecoilValue(signUpProcessState);

    switch (signUpProcess) {
        case 'required':
            return <ChooseRequired />;
        case 'finish':
            return <FinishSignUp />;
        default:
            return <ChooseOption />;
    }
};

export default SignUpContainer;
