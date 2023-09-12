class ResumesController < ApplicationController
  def download
    resume_path = Rails.root.join('public', 'resumes', 'Resume Maxime Plasse.pdf')
    send_file resume_path, filename: 'Resume Maxime Plasse.pdf', type: 'application/pdf'
  end
end
