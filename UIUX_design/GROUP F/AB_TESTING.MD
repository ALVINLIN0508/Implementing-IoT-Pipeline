## Project context
My project is an RDI platform that connects companies and students for research and development projects.
At the current stage, the project focuses on an AI-powered search feature designed to improve matching between users.

## Method choice
A/B testing is suitable for this project because it allows comparison between different search approaches.
In particular, it can be used to evaluate whether AI-powered search provides better results than traditional keyword-based search.
This method supports data-driven decision-making and helps validate whether the AI feature improves user experience.

## Design assumption
he main assumption is that:
AI-powered search will provide more relevant and efficient results than keyword-based search.

## Design alternatives
Version A (baseline)
Traditional keyword-based search
Matches exact words
Limited understanding of context
Version B (modified)
AI-powered search
Understands meaning and context
Provides more flexible and relevant results

## Metrics
To evaluate performance, the following metrics are defined:
Task success rate (did users find relevant results?)
Time to complete the task
Number of search attempts
User satisfaction (simple rating or feedback)
These metrics reflect both efficiency and perceived usefulness.

## Test setup
Users are divided into two groups:
Group A uses keyword search
Group B uses AI search
Each group performs the same tasks:
Companies search for students
Students search for projects
A small sample (5–10 users) is sufficient for this prototype stage

## Predicted outcomes
AI search (Version B) is expected to:
Increase task success rate
Reduce search time
Improve user satisfaction
If results confirm this, AI search will be validated as the better solution
If not, further refinement of the AI model or interface is needed

## Limitations and considerations
Small sample size may reduce reliability
Results show what works better, but not why
Users may have different levels of familiarity with AI
Ethical consideration: ensure users are informed about testing

## How this informs my design
The results of A/B testing will guide design decisions by:
Validating whether AI search is effective
Identifying areas for improvement
Supporting future development priorities
This ensures that the system is based on evidence rather than assumptions.