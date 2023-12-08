import os

from fastapi import FastAPI, Body
from fastapi.responses import RedirectResponse

from pytrello2 import TrelloClient

# Constants for todo-trello
BOARD = "personal"
LISTS = ["urgent", "important", "sometime"]
LIST = "doing"

# Environment variables
API_KEY = os.environ.get("TRELLO_API_KEY")
TOKEN = os.environ.get("TRELLO_TOKEN")


app = FastAPI()


def get_trello_client(api_key: str, token: str) -> TrelloClient:
    return TrelloClient(api_key, token)

client = get_trello_client(API_KEY, TOKEN)


@app.get("/")
async def root():
    # Retrieve all boards
    boards = client.board.get_all_boards()

    # Check if the desired board exists
    board_id = None
    for board in boards:
        if board.name == BOARD:
            board_id = board.id
            break

    # # Create the board if it doesn't exist
    # if board_id is None:
    #     board_id = client.board.create_board(BOARD)

    # # Create 'normal' list if it doesn't exist on the board
    # lists = client.board.get_lists(board_id)
    # if not any(lst.name == LIST for lst in lists):
    #     client.board.create_list(board_id, LIST)

    # Redirect to '/tasks' endpoint
    return RedirectResponse(url='/tasks')


@app.get("/tasks")
async def get_all_tasks():
    # Fetch all tasks from the board
    tasks = client.card.get_all_cards(BOARD)
    return {
        "message": "Tasks retrieved successfully.",
        "tasks": tasks
    }


@app.get("/tasks/{task_id}")
async def get_task(task_id: int):
    # Fetch an existing task
    task = client.card.get_card(task_id)
    return {
        "message": f"Task {task_id} retrieved successfully.",
        "task": task
    }


@app.post("/tasks/{task_id}")
async def create_task(task_id: int, task: str = Body(...)):
    # Create a new task
    task = Card(name=task, desc=task, idList=LIST)
    task_id = client.card.create_card(task, BOARD, LIST)
    return {
        "message": f"Task {task_id} created successfully."
    }


@app.put("/tasks/{task_id}")
async def update_task(task_id: int, task: str = Body(...)):
    # Update an existing task
    task = Card(name=task, desc=task, idList=LIST)
    client.card.update_card(task_id, task)
    return {
        "message": f"Task {task_id} updated successfully."
    }


@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    # Delete an existing task
    client.card.delete_card(task_id)
    return {
        "message": f"Task {task_id} deleted successfully."
    }
