# frozen_string_literal: true

Rails.application.routes.draw do
  resources :questions
  resources :users, only: [:create]
  resources :sessions
  get '/logged', to: 'sessions#is_logged_in'
  get '/logout', to: 'sessions#destroy'
  resources :quizzes

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
