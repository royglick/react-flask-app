import time
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True, origins={r"*": {"origins": "*"}})


# def add_cors_headers(response):
#     response.headers["Access-Control-Allow-Origin"] = "*"  # Adjust as needed
#     response.headers["Access-Control-Allow-Credentials"] = "true"
#     response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
#     response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
#     return response


# @app.after_request
# def after_request(response):
#     return add_cors_headers(response)


@app.route("/api/time")
def get_current_time():
    response = jsonify({"time": time.time()})
    return response


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(debug=True)
