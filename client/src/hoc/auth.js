import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null) {
    // SpecificComponent: 대상 컴포넌트
    // option: null(모든 사용자), true(로그인 사용자만), false(비로그인 사용자만)
    // adminRoute: null(Admin 인증 비활성화), true(Admin 사용자만), false(non-Admin 사용자만)

    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth())
            .then(response => {

            });
        }, []);
    }

    return AuthenticationCheck;
}