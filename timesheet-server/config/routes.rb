Rails.application.routes.draw do
  get '/welcome', to: "welcome#index"
  namespace :api do
    resources :timesheets
    resources :users
  end
end
