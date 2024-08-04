# HackSC 2023
# Authors: Boshe Zhang, Yiqi Xue, Zhiyuan Wang, Ying Sun

from cache import AsyncLRU
from openai import AsyncOpenAI
import json

with open("./keys/openai.key") as f: 
    client = AsyncOpenAI(
        api_key=f.readline().strip(),
    )

@AsyncLRU(maxsize=128)
async def get_mind_map(text_data):
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0.2,
        messages=[
            {"role": "system", "content": "You are a helpful mindmap maker, you can summerize the text into a mindmap."},
            {"role": "user", "content": "Convert the following text into a mindmap, using markdown language, exclude ```markdown, keep all key points"},
            {"role": "user", "content": text_data}
        ]
    )

    markdown_text = response.choices[0].message.content

    return markdown_text

@AsyncLRU(maxsize=128)
async def get_explanation(text_data):
    response = await client.chat.completions.create(
        model="gpt-3.5-turbo-16k",
        temperature=0.2,
        messages=[
            {"role": "system", "content": "You are a helpful explainer, you can summerize the text and explain it using easy words."},
            {"role": "user", "content": "Explain the following text, keep all key points"},
            {"role": "user", "content": text_data}
        ]
    )
    text = response.choices[0].message.content

    return text
