ALTER TABLE `products`
  ADD COLUMN `show_refund_notes` TINYINT(1) DEFAULT 1 AFTER `refund_note_id`;
COMMIT;