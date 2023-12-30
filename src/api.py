from fastapi import APIRouter, Request

from process import get_explanation, get_mind_map

app = APIRouter()

@app.get("/api")
async def base():
    return "MindWise API"


@app.post('/api/mindmap')
async def api_mindmap(request: Request):
    data = await request.body()
    text_data = data.decode('utf-8')
    print(text_data)   
    processed_data = await get_mind_map(text_data)
    print(processed_data)
    return processed_data



@app.post('/api/explain')
async def api_explanation(request: Request):
    data = await request.body()
    text_data = data.decode('utf-8')    
    processed_data = await get_explanation(text_data)
    print(processed_data)
    return processed_data