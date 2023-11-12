import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

function Auth({SpecificComponent, option, adminRoute = null}) {
    // SpecificComponent: 대상 컴포넌트
    // option: null(모든 사용자), true(로그인 사용자만), false(비로그인 사용자만)
    // adminRoute: null(Admin 인증 비활성화), true(Admin만), false(non-Admin만)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(auth())
        .then(response => {
            if(!response.payload.isAuth) { //로그인하지 않은 상태
                if(option) { //로그인 사용자만 접근
                    navigate("/login");
                }
            } else { //로그인 상태
                if(!option) { //로그인하지 않은 사용자만 접근
                    navigate("/");
                }
                if(adminRoute && !response.payload.isAdmin) { //Admin만 접근 && Admin이 아님
                    navigate("/");
                }
            }
        });
    }, []);

    return <SpecificComponent />;
}

export default Auth;