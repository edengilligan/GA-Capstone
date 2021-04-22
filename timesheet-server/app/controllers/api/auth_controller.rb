class Api::AuthController < ApplicationController
    def login 

    user = User.find_by(name: params[:name]) 
    if user&.authenticate(params[:password])

    render json: {user: user.name} 
# if you wanted to expose the whole object you would put {user: user} 
    else 
        render json: {message: 'user or password incorrect or not found'}, status: 400 
    end 
end
end
