import os

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from pytrello2 import TrelloClient

# Constants for todo-trello
# FOLDERS = "Personal", "Work"
FOLDER = "Personal"
# PRIORITIES = ["To Do", "Doing", "Done"]
PRIORITY = "Doing"

# Environment variables
API_KEY = os.environ.get("TRELLO_API_KEY")
TOKEN = os.environ.get("TRELLO_TOKEN")


app = FastAPI()


def get_trello_client(api_key: str, token: str) -> TrelloClient:
    return TrelloClient(token, api_key)


client = get_trello_client(API_KEY, TOKEN)


@app.get("/")
async def root():
    # get or create board
    folders = client.board.get_all_boards()
    folder = next((f for f in folders if f.name == FOLDER), None)
    if not folder:
        folder = client.board.create_board(FOLDER)

    # get or create list
    priorities = client.board.get_lists_on_board(folder.id)
    priority = next((p for p in priorities if p.name == PRIORITY), None)
    if not priority:
        priority = client.list.create_list(PRIORITY, folder.id)

    # Redirect to tasks/<priority_id>
    return RedirectResponse(url=f"/tasks/{priority.id}")


@app.get("/tasks/{priority_id}")
async def get_all_tasks(priority_id: str):
    # Fetch all tasks on a list
    tasks = client.list.get_cards_on_list(priority_id)
    tasks = [task.to_json() for task in tasks]
    return {
        "message": f"Tasks retrieved successfull from {priority_id}.",
        "tasks": tasks
    }


@app.get("/task/{task_id}")
async def get_task(task_id: str):
    # Fetch an existing task
    task = client.card.get_card(task_id).to_json()
    return {
        "message": f"Task {task_id} retrieved successfully",
        "task": task
    }


@app.post("/task/{priority_id}")
async def create_task(priority_id: str, name: str, desc: str):
    # Create a new task
    task = client.card.create_card(priority_id, name=name, desc=desc)
    task_id = task.id
    return {
        "message": f"Task {task_id} created successfully.",
        "task": task
    }


@app.put("/task/{task_id}")
async def update_task(task_id: str, name: str, desc: str):
    # Update an existing task
    task = client.card.update_card(task_id, name, desc)
    return {
        "message": f"Task {task_id} updated successfully.",
        "task": task,
    }


@app.delete("/task/{task_id}")
async def delete_task(task_id: str):
    # Delete an existing task
    client.card.delete_card(task_id)
    return {
        "message": f"Task {task_id} deleted successfully."
    }
