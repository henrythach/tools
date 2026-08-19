# List Deduplicator

Paste a space- or newline-separated list and get back a deduplicated, alphabetically sorted result — handy for merging new OAuth scopes into an existing scope string, or cleaning up tags and keyword lists.

Splits on any whitespace (spaces, tabs, newlines), so mixed-delimiter pastes work fine. Toggle case-sensitivity to control whether e.g. `Mail.Read` and `mail.read` are treated as the same value, and switch the output between newline- and space-separated at any time without reprocessing.
