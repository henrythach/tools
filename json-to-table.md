# JSON to Table

Paste a JSON array and get a minimal, scrollable table.

Nested objects are flattened into dot-notation column headers (e.g. `address.city` for `{"address": {"city": "NYC"}}`). Columns are derived from the union of all keys across all rows. Arrays are rendered as JSON strings.

Press Cmd/Ctrl+Enter to convert, or use the "Copy Table as HTML" button to copy the rendered table to your clipboard.
