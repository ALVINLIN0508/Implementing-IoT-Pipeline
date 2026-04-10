# Cognitive Walkthrough
## Project context

## My project is an RDI platform that connects companies and students for research and development projects.
At the current stage, the project focuses on an AI-powered search feature, with two main user interfaces: a company page and a student page.

## Method choice

At this stage, a basic prototype of the system already exists, including user interface and interaction flow.
Cognitive walkthrough is suitable because it helps evaluate whether users can understand and complete tasks without guidance.
This is especially important for my project, as the AI search feature must be intuitive and easy to use.

## Task selected
Searching for matching results using AI search.
Company task: Find suitable students for a project
Student task: Find relevant projects based on skills
## Evaluation process
The interaction was evaluated step by step by simulating a new user.
Key questions used:
Will the user know what to do?
Will the user notice the correct input field or button?
Will the user understand the results shown?
Will the user feel confident about the outcome?
## Key findings
The input field is clear, but users may not know what type of input is expected (skills, full sentences, keywords).
The system does not provide guidance or examples, which may cause uncertainty.
The results are displayed in raw format (JSON), which is not user-friendly.
There is no clear feedback indicating how the AI generated the results.

## How this informs my design
This evaluation highlights several improvements:
Add placeholder examples (e.g., “Enter skills like Python, AI, data analysis”)
Improve result presentation (e.g., structured cards instead of raw text)
Provide feedback or explanation for AI results
Improve clarity to reduce user uncertainty
These changes will improve usability, learnability, and user confidence.