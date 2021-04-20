Rails.application.routes.draw do
  get '/welcome', to: "welcome#index"
  namespace :api do
    post 'auth/login', to: 'auth#login'
    resources :timesheets
    resources :users 
  end
end
