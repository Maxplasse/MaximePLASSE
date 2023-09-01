class ResumesController < ApplicationController
  def download
    resume_path = Rails.root.join('public', 'resumes', 'resume.pdf')
    send_file resume_path, filename: 'resume.pdf', type: 'application/pdf'
  end
end
