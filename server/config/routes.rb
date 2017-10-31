Rails.application.routes.draw do
  root to: 'message#index'
  get 'message', to: 'message#index'
end
