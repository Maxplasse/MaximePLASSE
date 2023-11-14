class ResumesController < ApplicationController
  def download
    resume_path = Rails.root.join('public', 'resumes', 'CV_MAXIME_PLASSE.pdf')
    send_file resume_path, filename: 'CV_MAXIME_PLASSE.pdf', type: 'application/pdf'
  end
end
