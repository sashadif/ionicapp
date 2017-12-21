class UsersController < ApplicationController
    
    def show
        @user = User.find(params[:id])
        render json: @user.shows.to_json
    end
    
end
