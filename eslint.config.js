import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    /**
     * Cấu hình chung, bao gồm các tệp/thư mục cần bỏ qua.
     * @property {string[]} ignores - Danh sách các thư mục hoặc tệp cần bỏ qua khi linting.
     */
    {ignores: ['dist']},

    /**
     * Cấu hình chi tiết ESLint.
     *
     * @property {string[]} extends - Các cấu hình cơ bản được mở rộng.
     * @property {string[]} files - Các tệp được áp dụng cấu hình này.
     * @property {object} languageOptions - Tùy chọn ngôn ngữ.
     * @property {number} languageOptions.ecmaVersion - Phiên bản ECMAScript được sử dụng.
     * @property {object} languageOptions.globals - Các biến toàn cục được sử dụng.
     * @property {object} plugins - Các plugin ESLint được tích hợp.
     * @property {object} rules - Các quy tắc ESLint được áp dụng.
     */
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            /**
             * Phiên bản ECMAScript được hỗ trợ.
             */
            ecmaVersion: 2020,
            /**
             * Biến toàn cục cho môi trường trình duyệt.
             */
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks, // Plugin kiểm tra các hook trong React.
            'react-refresh': reactRefresh, // Plugin hỗ trợ React Fast Refresh.
        },
        rules: {
            /**
             * Các quy tắc được cấu hình sẵn từ plugin React Hooks.
             */
            ...reactHooks.configs.recommended.rules,
            /**
             * Quy tắc kiểm tra chỉ xuất các component trong React Refresh.
             *
             * @warning Hiển thị cảnh báo nếu xuất các thành phần không phải là component.
             * @example
             * // Đúng:
             * export const MyComponent = () => { ... };
             *
             * // Sai:
             * export const nonComponent = 123;
             */
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
            /**
             * Quy tắc cảnh báo khi có biến không sử dụng.
             * @example
             * // Không cảnh báo:
             * function myFunc(_unusedArg) { ... }
             *
             * // Cảnh báo:
             * function myFunc(unusedArg) { ... }
             */
            "@typescript-eslint/no-unused-vars": ["warn", {"argsIgnorePattern": "^_"}]
        },
    },
)
