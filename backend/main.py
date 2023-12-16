import os

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from pytrello2 import TrelloClient

# Constants for todo-trello
# BOARD = "personal"
# LISTS = ["urgent", "important", "sometime"]
# LIST = "doing"

# Environment variables
API_KEY = os.environ.get("TRELLO_API_KEY")
TOKEN = os.environ.get("TRELLO_TOKEN")

print(TOKEN)


app = FastAPI()


def get_trello_client(api_key: str, token: str) -> TrelloClient:
    return TrelloClient(token, api_key)


client = get_trello_client(API_KEY, TOKEN)


@app.get("/")
async def root():
    # Retrieve all boards
    # boards = client.board.get_all_boards()

    # Check if the desired board exists
    '''
    board_id = None
    for board in boards:
        if board.name == BOARD:
            board_id = board.id
            break
    '''
    # # Create the board if it doesn't exist
    # if board_id is None:
    #     board_id = client.board.create_board(BOARD)

    # # Create 'normal' list if it doesn't exist on the board
    # lists = client.board.get_lists(board_id)
    # if not any(lst.name == LIST for lst in lists):
    #     client.board.create_list(board_id, LIST)

    # Redirect to '/tasks' endpoint
    return RedirectResponse(url="/tasks")


@app.get("/tasks")
async def get_all_tasks():
    # Fetch all tasks from the board
    tasks = client.list.get_cards_on_list("657d0986c4e8466b450d9d50")
    return {"message": "Tasks retrieved successfully.", "tasks": tasks}


@app.get("/tasks/{task_id}")
async def get_task(task_id: str):
    # Fetch an existing task
    task = client.card.get_card(task_id)
    return {"message": f"Task {task_id} retrieved successfully", "tasks": task}


@app.post("/tasks/{list_id}")
async def create_task(list_id: str, name: str, desc: str):
    # Create a new task
    task_id = client.card.create_card(idList=list_id, name=name, desc=desc)
    return {"message": f"Task {task_id} created successfully."}


@app.put("/tasks/{card_id}")
async def update_task(card_id: str, list_id: str, desc: str):
    # Update an existing task
    client.card.update_card(card_id, list_id, desc)
    return {"message": f"Task {card_id} updated successfully."}


@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    # Delete an existing task
    client.card.delete_card(task_id)
    return {"message": f"Task {task_id} deleted successfully."}
