import time
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


@app.route("/api/time")
def get_current_time():
    return {"time": time.time()}


if __name__ == "__main__":
    app.run(debug=True)
