# frozen_string_literal: true

Rails.application.routes.draw do
  resources :quizzes
  resources :questions
  resources :users, only: %i[create]
  resource :sessions
  resources :public
  resources :attempts

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
