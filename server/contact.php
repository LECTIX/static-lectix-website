<?php

declare(strict_types=1);

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 190;
const MAX_SUBJECT_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 6000;
const MIN_FILL_SECONDS = 2;
const MAX_FILL_SECONDS = 7200;

function redirectWithStatus(string $status): never
{
    header('Location: /contact/?status=' . rawurlencode($status), true, 303);
    exit;
}

function postValue(string $key): string
{
    $value = $_POST[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function cleanHeaderValue(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method Not Allowed');
}

$configPath = dirname(__DIR__, 2) . '/contact-config.php';
if (!is_file($configPath)) {
    error_log('LECTIX contact configuration missing.');
    redirectWithStatus('error');
}

$config = require $configPath;
if (!is_array($config)) {
    error_log('LECTIX contact configuration invalid.');
    redirectWithStatus('error');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !hash_equals((string) ($config['allowed_origin'] ?? ''), $origin)) {
    redirectWithStatus('error');
}

if (postValue('website') !== '') {
    redirectWithStatus('sent');
}

$startedAt = filter_var(postValue('form_started'), FILTER_VALIDATE_INT);
$elapsed = $startedAt === false ? 0 : time() - $startedAt;
if ($elapsed < MIN_FILL_SECONDS || $elapsed > MAX_FILL_SECONDS) {
    redirectWithStatus('error');
}

$name = cleanHeaderValue(postValue('name'));
$email = cleanHeaderValue(postValue('email'));
$subject = cleanHeaderValue(postValue('subject'));
$message = postValue('message');
$token = postValue('cf-turnstile-response');

if (
    $name === '' || mb_strlen($name) > MAX_NAME_LENGTH ||
    $email === '' || mb_strlen($email) > MAX_EMAIL_LENGTH || !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $subject === '' || mb_strlen($subject) > MAX_SUBJECT_LENGTH ||
    $message === '' || mb_strlen($message) > MAX_MESSAGE_LENGTH ||
    $token === '' || strlen($token) > 2048
) {
    redirectWithStatus('error');
}

$verificationPayload = http_build_query([
    'secret' => (string) ($config['turnstile_secret'] ?? ''),
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
]);

$curl = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
if ($curl === false) {
    redirectWithStatus('error');
}

curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $verificationPayload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
]);

$verificationResponse = curl_exec($curl);
$verificationStatus = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
curl_close($curl);

$verification = is_string($verificationResponse)
    ? json_decode($verificationResponse, true)
    : null;

if (
    $verificationStatus !== 200 ||
    !is_array($verification) ||
    ($verification['success'] ?? false) !== true ||
    !hash_equals((string) ($config['expected_hostname'] ?? ''), (string) ($verification['hostname'] ?? '')) ||
    !hash_equals('contact', (string) ($verification['action'] ?? ''))
) {
    redirectWithStatus('error');
}

$recipient = cleanHeaderValue((string) ($config['recipient'] ?? ''));
$fromAddress = cleanHeaderValue((string) ($config['from_address'] ?? ''));
$fromName = cleanHeaderValue((string) ($config['from_name'] ?? 'Site LECTIX'));

if (!filter_var($recipient, FILTER_VALIDATE_EMAIL) || !filter_var($fromAddress, FILTER_VALIDATE_EMAIL)) {
    error_log('LECTIX contact addresses invalid.');
    redirectWithStatus('error');
}

$mailSubject = mb_encode_mimeheader('[LECTIX] ' . $subject, 'UTF-8');
$mailBody = implode("\n", [
    'Message envoyé depuis le formulaire LECTIX',
    '',
    'Nom : ' . $name,
    'E-mail : ' . $email,
    'Sujet : ' . $subject,
    '',
    $message,
]);

$headers = [
    'From: ' . $fromName . ' <' . $fromAddress . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Content-Type-Options: nosniff',
];

$sent = mail($recipient, $mailSubject, $mailBody, implode("\r\n", $headers));
redirectWithStatus($sent ? 'sent' : 'error');
