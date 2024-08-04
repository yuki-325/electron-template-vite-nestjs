import { render } from '@testing-library/vue';
import { test } from 'vitest';
import HelloWorld from '@render/components/HelloWorld.vue'; // パスを調整してください
import { ensureConfigFile } from '@/util/configuration-reader';
import { initializeLogger } from '@/config/log-config';

test('renders message', () => {
    // loggerの初期化
    // const logConfigFilePath: string = ensureConfigFile("log-config.json");
    // initializeLogger(logConfigFilePath);
    
    const { getByText } = render(HelloWorld, {
        props: {
            title: 'Hello Vitest'
        }
    });

    getByText('Hello Vitest');
});
