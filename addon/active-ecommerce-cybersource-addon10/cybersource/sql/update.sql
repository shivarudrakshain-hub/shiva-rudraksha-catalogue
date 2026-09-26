INSERT INTO `payment_methods` (`id`, `name`, `active`, `addon_identifier`, `created_at`, `updated_at`) 
VALUES (NULL, 'cybersource', '1', 'cybersource', current_timestamp(), current_timestamp());

INSERT INTO `business_settings` (`id`, `type`, `value`, `lang`, `created_at`, `updated_at`) 
VALUES (NULL, 'cybersource_sandbox', '1', NULL, current_timestamp(), current_timestamp());