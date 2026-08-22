-- ============================================================================
-- Stage 7B — Database Foundation
-- Migration 6: Indexes
-- ============================================================================
-- Indexes for foreign keys and the most common ownership/access queries.
-- Primary keys already have implicit indexes; these cover the FKs and the
-- frequent "WHERE <owner> = auth.uid()" lookups.
-- ============================================================================

-- projects: find a user's projects
create index projects_owner_id_idx on public.projects (owner_id);

-- tickets: find a client's tickets / an assignee's tickets
create index tickets_client_id_idx on public.tickets (client_id);
create index tickets_assignee_id_idx on public.tickets (assignee_id);

-- ticket_messages: load a ticket's thread / a user's messages
create index ticket_messages_ticket_id_idx on public.ticket_messages (ticket_id);
create index ticket_messages_author_id_idx on public.ticket_messages (author_id);

-- notifications: load a user's notifications
create index notifications_user_id_idx on public.notifications (user_id);

-- files: load a user's file metadata
create index files_owner_id_idx on public.files (owner_id);

-- inquiries: staff/admin list by status (common admin query)
create index inquiries_status_idx on public.inquiries (status);