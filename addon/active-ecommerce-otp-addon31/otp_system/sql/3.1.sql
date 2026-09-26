INSERT INTO `sms_templates` (`id`, `identifier`, `sms_body`, `template_id`, `status`, `created_at`, `updated_at`) 
VALUES 
(NULL, 'cod_and_wallet_payment_with_otp', 'Your otp verification code is [[code]]', NULL, '1', current_timestamp(), current_timestamp());

COMMIT;