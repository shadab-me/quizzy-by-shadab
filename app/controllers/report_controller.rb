# frozen_string_literal: true

class ReportController < ApplicationController
  def index
    if report_exists?
      send_file 'public/report.xlsx', type: 'application/xlsx', disposition: 'attachment'
    else
      render status: :unprocessable_entity, json: { errors: 'Report not found' }
    end
  end

  def create
    if report_exists?
      File.delete('public/report.xlsx')
      @report = Attempt.generate_report_data
      ReportDownloderJob.perform_later(@report)
      sleep 8
      render state: :ok, json: { notice: 'Your file is ready to downaload' }
    else
      render status: :unprocessable_entity, json: { errors: 'Report not found' }
    end
  end

  private

  def report_exists?
    File.exist?('public/report.xlsx')
  end
end
