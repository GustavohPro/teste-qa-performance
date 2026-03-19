import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Counter, Gauge, Rate } from 'k6/metrics';

// Métricas customizadas
const responseTimeP90 = new Trend('response_time_p90_spike');
const successfulRequests = new Counter('successful_requests_spike');
const failedRequests = new Counter('failed_requests_spike');
const concurrentUsers = new Gauge('concurrent_users_spike');
const errorRate = new Rate('error_rate_spike');

// Configuração do teste de pico (Spike Test)
export const options = {
    stages: [
        { duration: '1m', target: 100 }, // Ramp-up leve: 100 VUs
        { duration: '30s', target: 500 }, // Spike abrupto: 500 VUs em 30 segundos (2x de 250)
        { duration: '1m', target: 500 }, // Sustain no pico por 1 minuto
        { duration: '30s', target: 100 }, // Ramp-down rápido
        { duration: '1m', target: 0 }, // Final
    ],
    thresholds: {
        'http_req_duration': ['p(90)<2000'], // 90º percentil < 2 segundos
        'http_req_failed': ['rate<0.1'], // Taxa de erro < 10%
    },
};

// Cenário de compra de passagem aérea - Spike Test
export default function () {
    concurrentUsers.add(__VU);

    group('Step 1: Access BlazeDemoPage - Spike', function () {
        const res1 = http.get('https://www.blazedemo.com/', {
            headers: {
                'User-Agent': 'k6/performance-test-spike',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
        });

        const success1 = check(res1, {
            'Home page status 200': (r) => r.status === 200,
            'Home page has title': (r) => r.body.includes('BlazeDemo'),
        });

        if (success1) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res1.timings.duration);
        sleep(0.5);
    });

    group('Step 2: Select route - Spike', function () {
        const payload = {
            fromPort: 'Boston',
            toPort: 'Berlin',
        };

        const res2 = http.post('https://www.blazedemo.com//reserve.php', payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'k6/performance-test-spike',
            },
        });

        const success2 = check(res2, {
            'Route selection status 200': (r) => r.status === 200 || r.status === 302,
        });

        if (success2) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res2.timings.duration);
        sleep(0.5);
    });

    group('Step 3: Select flight - Spike', function () {
        const res3 = http.get('https://www.blazedemo.com/reserve.php', {
            headers: {
                'User-Agent': 'k6/performance-test-spike',
            },
        });

        const success3 = check(res3, {
            'Flight selection page status 200': (r) => r.status === 200,
        });

        if (success3) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res3.timings.duration);
        sleep(0.5);
    });

    group('Step 4: Fill passenger data - Spike', function () {
        const bookingData = {
            inputName: `Spike_${__VU}_${__ITER}`,
            address: 'Test Street 456',
            city: 'Spike City',
            state: 'SP',
            zipcode: '54321',
            creditCard: '4111111111111111',
            creditCardMonth: '12',
            creditCardYear: '2026',
            creditCardCVV: '123',
            nameOnCard: `Spike Test ${__VU}`,
        };

        const res4 = http.post('https://www.blazedemo.com/purchase.php', bookingData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'k6/performance-test-spike',
            },
        });

        const success4 = check(res4, {
            'Booking page status 200': (r) => r.status === 200,
        });

        if (success4) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res4.timings.duration);
        sleep(0.5);
    });

    group('Step 5: Confirm purchase - Spike', function () {
        const confirmData = {
            inputName: `Spike_${__VU}_${__ITER}`,
            address: 'Test Street 456',
            city: 'Spike City',
            state: 'SP',
            zipcode: '54321',
            creditCard: '4111111111111111',
            creditCardMonth: '12',
            creditCardYear: '2026',
            creditCardCVV: '123',
            nameOnCard: `Spike Test ${__VU}`,
        };

        const res5 = http.post('https://www.blazedemo.com/purchase.php', confirmData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'k6/performance-test-spike',
            },
        });

        const success5 = check(res5, {
            'Purchase completed status 200': (r) => r.status === 200,
        });

        if (success5) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res5.timings.duration);
    });

    sleep(1);
}
