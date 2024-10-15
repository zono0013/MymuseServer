
// LoginComponent.js（既存のコンポーネントを更新）

import { authApi } from '@/lib/api/endpoints';


const LoginComponent = () => {
    const handleLogin = () => {
        authApi.googleLogin();
    };

    return (
        <button
            onClick={handleLogin}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
            Googleでログイン
        </button>
    );
};

export default LoginComponent;