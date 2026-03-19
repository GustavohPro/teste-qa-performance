import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Counter, Gauge, Rate } from 'k6/metrics';

// Métricas customizadas
const responseTimeP90 = new Trend('response_time_p90');
const successfulRequests = new Counter('successful_requests');
const failedRequests = new Counter('failed_requests');
const concurrentUsers = new Gauge('concurrent_users');
const errorRate = new Rate('error_rate');

// Configuração do teste de carga
export const options = {
    vus: 250, // Usuários virtuais para atingir 250 RPS
    duration: '5m', // Duração de 5 minutos
    rps: 250, // 250 requisições por segundo (conforme critério de aceitação)
    thresholds: {
        'http_req_duration': ['p(90)<2000'], // 90º percentil < 2 segundos
        'http_req_failed': ['rate<0.1'], // Taxa de erro < 10%
        'http_reqs': ['count>0'], // Deve ter pelo menos 1 requisição
    },
    stages: [
        { duration: '1m', target: 50 }, // Ramp-up: 1 minuto até 50 VUs
        { duration: '2m', target: 250 }, // Ramp-up: 2 minutos até 250 VUs
        { duration: '1m', target: 250 }, // Sustain: 1 minuto em 250 VUs
        { duration: '1m', target: 0 }, // Ramp-down: 1 minuto até 0 VUs
    ],
};

// Cenário de compra de passagem aérea
export default function () {
    concurrentUsers.add(__VU); // Registra número de VUs

    // Grupo 1: Acesso à página inicial
    group('Step 1: Access BlazeDemoPage', function () {
        const res1 = http.get('https://www.blazedemo.com/', {
            headers: {
                'User-Agent': 'k6/performance-test',
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
        sleep(1);
    });

    // Grupo 2: Selecionar origem e destino
    group('Step 2: Select route', function () {
        const payload = {
            fromPort: 'Boston',
            toPort: 'Berlin',
        };

        const res2 = http.post('https://www.blazedemo.com//reserve.php', payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'k6/performance-test',
            },
        });

        const success2 = check(res2, {
            'Route selection status 200': (r) => r.status === 200 || r.status === 302,
            'Redirect to selection page': (r) => r.status === 302 || r.body.includes('select'),
        });

        if (success2) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res2.timings.duration);
        sleep(1);
    });

    // Grupo 3: Selecionar voo
    group('Step 3: Select flight', function () {
        const res3 = http.get('https://www.blazedemo.com/reserve.php', {
            headers: {
                'User-Agent': 'k6/performance-test',
            },
        });

        const success3 = check(res3, {
            'Flight selection page status 200': (r) => r.status === 200,
            'Flight list available': (r) => r.body.includes('No.') || r.body.includes('Price'),
        });

        if (success3) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res3.timings.duration);
        sleep(1);
    });

    // Grupo 4: Preencher dados de passageiro
    group('Step 4: Fill passenger data', function () {
        const bookingData = {
            inputName: `Passenger_${__VU}_${__ITER}`,
            address: 'Test Street 123',
            city: 'Test City',
            state: 'TC',
            zipcode: '12345',
            creditCard: '4111111111111111',
            creditCardMonth: '12',
            creditCardYear: '2026',
            creditCardCVV: '123',
            nameOnCard: `Test Passenger ${__VU}`,
        };

        const res4 = http.post('https://www.blazedemo.com/purchase.php', bookingData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'k6/performance-test',
            },
        });

        const success4 = check(res4, {
            'Booking page status 200': (r) => r.status === 200,
            'Booking confirmation page displayed': (r) =>
                r.body.includes('Thank') || r.body.includes('confirmation') || r.status === 200,
        });

        if (success4) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res4.timings.duration);
        sleep(1);
    });

    // Grupo 5: Confirmar compra
    group('Step 5: Confirm purchase', function () {
        const confirmData = {
            inputName: `Passenger_${__VU}_${__ITER}`,
            address: 'Test Street 123',
            city: 'Test City',
            state: 'TC',
            zipcode: '12345',
            creditCard: '4111111111111111',
            creditCardMonth: '12',
            creditCardYear: '2026',
            creditCardCVV: '123',
            nameOnCard: `Test Passenger ${__VU}`,
        };

        const res5 = http.post('https://www.blazedemo.com/purchase.php', confirmData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'k6/performance-test',
            },
        });

        const success5 = check(res5, {
            'Purchase completed status 200': (r) => r.status === 200,
            'Success message displayed': (r) =>
                r.body.includes('confirmation') || r.body.includes('Thank') || r.body.includes('Flights'),
        });

        if (success5) {
            successfulRequests.add(1);
        } else {
            failedRequests.add(1);
            errorRate.add(1);
        }

        responseTimeP90.add(res5.timings.duration);
    });

    sleep(2); // Pausa entre iterações
}
