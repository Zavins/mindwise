# HackSC 2023
# Authors: Boshe Zhang, Yiqi Xue, Zhiyuan Wang, Ying Sun

import os

import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from api import app as api_app

# build fastapi app


app = FastAPI()
app.include_router(api_app)
PUBLIC_DIRECTORY = "./build"

@app.get("/")
async def root():
    return FileResponse(f"{PUBLIC_DIRECTORY}/index.html")

@app.get("/{file}.{ext}")
async def file(file:str, ext: str):
    file_path = f"{PUBLIC_DIRECTORY}/{file}.{ext}"
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        return RedirectResponse("/")
    

@app.get("/{path}")
async def path():
    return FileResponse(f"{PUBLIC_DIRECTORY}/index.html")

@app.get("/{path}/{name}")
async def path_name():
    return FileResponse(f"{PUBLIC_DIRECTORY}/index.html")

app.mount("/", StaticFiles(directory=PUBLIC_DIRECTORY), name="public")


if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8080,
        log_level="info",
        access_log=True,
        use_colors=True,
        proxy_headers=True,
    )
