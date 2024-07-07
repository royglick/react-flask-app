import time
from flask import Flask, jsonify, send_from_directory, abort

# from flask_cors import CORS, cross_origin

app = Flask(__name__)
# CORS(app, support_credentials=True, origins={r"*": {"origins": "*"}})


def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


@app.after_request
def after_request(response):
    return add_cors_headers(response)


@app.route("/api/time")
def get_current_time():
    response = jsonify({"time": time.time()})
    return response


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    try:
        # Define the directory containing your files
        directory = "./files"
        # Safely join the directory and filename
        # filepath = safe_join(directory, filename)
        # Send the file from the directory
        return send_from_directory(directory, filename, as_attachment=True)
    except FileNotFoundError:
        abort(404)


if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask

# app = Flask(__name__)


# def add_cors_headers(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
#     response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
#     return response


# @app.after_request
# def after_request(response):
#     return add_cors_headers(response)


# @app.route("/api/time")
# def home():
#     return "Hello, Flask!"


# if __name__ == "__main__":
#     app.run(debug=True, port=8000)
