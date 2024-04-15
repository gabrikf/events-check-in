/*
  Warnings:

  - A unique constraint covering the columns `[email,event_id]` on the table `attendees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendees_email_event_id_key" ON "attendees"("email", "event_id");
