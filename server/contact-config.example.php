<?php

declare(strict_types=1);

return [
    'recipient' => 'contact@example.com',
    'from_address' => 'site@example.com',
    'from_name' => 'Site LECTIX',
    'allowed_origins' => [
        'https://lectix.fr',
        'https://www.lectix.fr',
    ],
    'expected_hostnames' => [
        'lectix.fr',
        'www.lectix.fr',
    ],
    'turnstile_secret' => '1x0000000000000000000000000000000AA',
];
