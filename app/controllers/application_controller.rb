class ApplicationController < ActionController::Base
  around_action :set_locale

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
    yield
  end
end
