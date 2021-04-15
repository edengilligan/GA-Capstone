class WelcomeController < ApplicationController
    def index 
        render json: {name: 'Eden'}
    end
end