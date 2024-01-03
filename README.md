## Inspirations
Notetaking results in about 13% higher academic performance than not taking notes, especially when combined with cued lecturing link. However, taking notes can be a time-consuming, disheartening, error-prone process, and may cause distractions. We want to make the note-taking experience smarter, smoother, and more efficient.

## What it does:
based on various sources (paper/fiction/slides/etc), NoteWise can:

- generate easy-to-understand explanations.
- generate well-structured mind maps with detailed notes.

## How you built it
- Utilized Python FastAPI to implement a backend HTTP server and called fine-tuned OpenAI API to generate output text.

- Implemented a dynamic webpage using React.js, realizing text input & output and mind map showcase.

- Use docker to build image and run on Kubernete containers.

## Challenges
- No prior experience with OpenAI API: difficulties adjusting prompts and parameters to generate ideal output text.


## Built With
FastAPI, TypeScript, OpenAI, React, Docker