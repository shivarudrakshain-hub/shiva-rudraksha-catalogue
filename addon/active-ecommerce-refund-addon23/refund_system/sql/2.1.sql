ALTER TABLE `refund_requests`
ADD COLUMN `preferred_payment_channel` VARCHAR(100) NULL AFTER `reject_reason`,
ADD COLUMN `payment_information_id` INT(11) NULL AFTER `preferred_payment_channel`,
ADD COLUMN `transaction_id` VARCHAR(255) NULL AFTER `payment_information_id`,
ADD COLUMN `photo` INT(11) NULL AFTER `transaction_id`,
ADD COLUMN `admin_reject_reason` VARCHAR(100) NULL AFTER `photo`;

COMMIT;