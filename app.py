from flask import Flask, render_template,redirect, request,url_for

app = Flask(__name__, static_folder='static')

@app.route('/')
def sendGamePage():
    return redirect(url_for('game'))

@app.route("/game.html", methods=['GET','POST'])
def game():
    return render_template('game.html')