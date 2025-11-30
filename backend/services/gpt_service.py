import json

def build_prompt(data):
    pretty = json.dumps(data, indent=4)

    return f"""
You are an expert resume coach.

You will be given a JSON object representing a student's current resume form data from a web app.

The JSON has this shape (keys may be missing or arrays may be empty):
- personalInfo: {{ name, location, email, phone }}
- introduction: {{ isAdded, text }}
- links: [string]
- educations: [{{ school, degree, major, gpa, from, to, coursework[], awards[] }}]
- experiences: [{{ title, company, location, supervisorName, supervisorTitle, supervisorDegree, isCurrent, from, to, description[] }}]
- publications: [{{ title, date, authors[], doi }}]
- projects: [{{ title, organization, location, isCurrent, from, to, description[] }}]
- skills: [{{ title, skillsList[] }}]

TASK (IMPORTANT):
- Do NOT invent new jobs, projects, degrees, awards, dates, or specific skills/tools that are not already in the input.
- Only improve wording, clarity, and impact of what is already there.
- For each ARRAY field (educations, experiences, publications, projects, skills):
  - Only create feedback items for entries that actually exist in the input.
  - Preserve the original order and use the correct index.
  - If the array is empty or missing, do NOT create any placeholder objects (like index 0 with empty title) in the response.
- If a section is empty or missing, you may briefly mention that in "overall_feedback" ONLY. Do NOT create structured section entries for missing data.

SPECIAL RULE FOR INTRODUCTION:
- Only include an "introduction" field in your response if the user actually provided introduction text
  (i.e., the input has introduction.text that is non-empty after trimming whitespace).
- If the user did NOT provide any introduction text, DO NOT include an "introduction" key in the response at all.
  If you want to suggest adding an introduction, do so only inside "overall_feedback", not as a separate "introduction" object.

Return your answer as a JSON object with at least this top-level field:

{{
  "overall_feedback": "short paragraph of overall feedback"
}}

Optionally, you may include additional top-level fields **only when the corresponding input section has content**:

- "introduction" — ONLY if input.introduction.text is non-empty:
  "introduction": {{
    "should_add": false,
    "comment": "what to improve about the existing introduction",
    "suggested_text": "rewritten intro text based on the user's current text"
  }}

- "experiences" — ONLY if input.experiences has at least one item:
  "experiences": [
    {{
      "index": 0,
      "original_title": "...",
      "comment": "short feedback for this experience",
      "suggested_bullets": [
        "bullet 1 rewritten in stronger resume style",
        "..."
      ]
    }}
  ]

- "projects" — ONLY if input.projects has at least one item:
  "projects": [
    {{
      "index": 0,
      "original_title": "...",
      "comment": "short feedback for this project",
      "suggested_bullets": [
        "rewritten bullet 1",
        "..."
      ]
    }}
  ]

- "skills" — ONLY if input.skills has at least one item:
  "skills": {{
    "comment": "general feedback on the existing skills section",
    "possible_groupings": [
      // Group and rename ONLY the skills the user actually provided.
    ]
  }}

You may optionally include other top-level sections (like "educations" or "publications") following the same rule:
ONLY provide feedback for entries that exist in the input, and omit the section if there are no items.

Rules:
- Keep each bullet point under 30 words.
- Use action verbs and, when possible, mention measurable impact (%, time saved, scale, etc.).
- Do NOT fabricate new roles, projects, institutions, dates, or specific skills/tools.
- If a section (like publications, experiences, or projects) has no items, do NOT return a structured section for it.
  Mention it only in "overall_feedback" if you think it's important.

Here is the user data JSON:

{pretty}
"""
