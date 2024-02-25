# Import necessary modules
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
import os
import jwt
from datetime import datetime, timedelta

# Initialize Flask app
app = Flask(__name__)

# Configure SQLAlchemy for database management
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'secret_key'
db = SQLAlchemy(app)

# Define User model for user management
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def set_password(self, password):
        """Set password hash for the user."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the user's stored hash."""
        return check_password_hash(self.password_hash, password)

    def get_role_permissions(self):
        """Retrieve permissions associated with the user's role."""
        return self.role.permissions

# Define Role model for role management
class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    permissions = db.relationship('Permission', backref='role', lazy=True)

# Define Permission model for permission management
class Permission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)

# Implement additional functionality or code structure here
# For example, you can add helper functions, middleware, or custom decorators

# Define a custom decorator for authentication
def authenticate_user(func):
    def wrapper(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"], options={"verify_exp": False})
            user_id = data['user_id']
            # You can perform additional authentication checks here if needed
            return func(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

    # Renaming the function name for better debugging
    wrapper.__name__ = func.__name__
    return wrapper

# Define additional routes or endpoints for the application

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not all(key in data for key in ['username', 'password']):
        return jsonify({'error': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = jwt.encode({'user_id': user.id, 'exp': datetime.utcnow() + timedelta(hours=1)}, app.config['SECRET_KEY'])
        response = make_response(jsonify({'token': token.decode('UTF-8'), 'user_id': user.id}), 200)
        response.set_cookie('token', token, httponly=True)
        return response

    return jsonify({'error': 'Invalid username or password'}), 401

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not all(key in data for key in ['username', 'email', 'password']):
        return jsonify({'error': 'Missing parameters in request'}), 400

    username = data['username']
    email = data['email']
    password = data['password']

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Error creating user'}), 500

# Route for refreshing token
@app.route('/refresh', methods=['POST'])
@authenticate_user
def refresh():
    token = request.cookies.get('token')
    if not token:
        return jsonify({'error': 'Token is missing'}), 401

    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"], options={"verify_exp": False})
        user_id = data['user_id']
        new_token = jwt.encode({'user_id': user_id, 'exp': datetime.utcnow() + timedelta(hours=1)}, app.config['SECRET_KEY'])
        response = make_response(jsonify({'message': 'Token refreshed'}), 200)
        response.set_cookie('token', new_token, httponly=True)
        return response
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

# Route for logging out
@app.route('/logout', methods=['POST'])
@authenticate_user
def logout():
    response = make_response(jsonify({'message': 'Logged out successfully'}), 200)
    response.set_cookie('token', '', expires=0)
    return response

# Define additional routes or endpoints for the application

if __name__ == "__main__":
    app.run(debug=True)
