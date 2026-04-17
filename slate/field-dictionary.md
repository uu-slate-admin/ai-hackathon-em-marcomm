# Slate Field Dictionary (v1)

This document defines the Slate fields for the campus exploration game handoff.

## Visible Student-Entered Fields

| Field | Type | Required | Allowed Values / Format | Example | Notes |
| --- | --- | --- | --- | --- | --- |
| `first` | string | yes | free text | `Jordan` | First name |
| `last` | string | yes | free text | `Lee` | Last name |
| `email` | string (email) | yes | valid email | `jordan@email.com` | Email address |
| `school` | string (or school lookup ID) | yes | school name or configured lookup value | `Skyline High School` | Student-entered school value |
| `campus` | enum | yes | `asia`, `main`, `online` | `main` | Campus preference |
| `contact_type` | enum | yes | `transfer`, `freshman` | `freshman` | Student type |
| `birthdate` | date | yes | `YYYY-MM-DD` | `2008-04-03` | Used for dedupe support |

## Hidden Game-Derived Fields

| Field | Type | Required | Allowed Values / Format | Example | Notes |
| --- | --- | --- | --- | --- | --- |
| `game_academic_interest` | string | yes | academic-interest ID slug | `engineering_technology` | Derived from completed game session |
| `game_version` | string | yes | semantic-like version string | `v1.0.0` | Game/content contract version |
| `game_session_id` | string | yes | UUID or equivalent unique ID | `550e8400-e29b-41d4-a716-446655440000` | Session traceability |
| `game_completed_at` | datetime | yes | ISO-8601 UTC timestamp | `2026-04-17T18:24:31Z` | Completion timestamp |

## Query Parameter to Hidden Field Mapping

| Query Parameter | Slate Hidden Field |
| --- | --- |
| `game_academic_interest` | `game_academic_interest` |
| `game_version` | `game_version` |
| `game_session_id` | `game_session_id` |
| `game_completed_at` | `game_completed_at` |

## Validation Rules (Recommended)

- Require visible fields at submit: `first`, `last`, `email`, `school`, `campus`, `contact_type`, `birthdate`.
- Require hidden game fields at submit: `game_academic_interest`, `game_version`, `game_session_id`, `game_completed_at`.
- Enforce enums exactly as listed for `campus` and `contact_type`.
- Keep PII out of query parameters; only pass approved non-sensitive game-derived metadata in URL params.
